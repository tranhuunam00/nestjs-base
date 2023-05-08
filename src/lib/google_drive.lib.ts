import { FOLDER_FILE_GOOGLR_DRIVE } from 'src/core/constants/app.config'
import * as fs from 'fs'

const { google } = require('googleapis')

const driveClientId = process.env.GOOGLE_MAILER_CLIENT_ID || ''
const driveClientSecret = process.env.GOOGLE_MAILER_CLIENT_SECRET || ''
const driveRedirectUri = process.env.GOOGLE_REDIRECT_URI || ''
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ''

const createDriveClient = (
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  refreshToken: string
) => {
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

  client.setCredentials({ refresh_token: refreshToken })

  return google.drive({
    version: 'v3',
    auth: client,
  })
}
const driveClient = createDriveClient(
  driveClientId,
  driveClientSecret,
  driveRedirectUri,
  driveRefreshToken
)

const createFolder = folderName => {
  return driveClient.files.create({
    resource: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    },
    fields: 'id, name',
  })
}

const searchFolder = folderName => {
  return new Promise((resolve, reject) => {
    driveClient.files.list(
      {
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
        fields: 'files(id, name)',
      },
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res.data.files ? res.data.files[0] : null)
      }
    )
  })
}

const searchFile = fileName => {
  return new Promise((resolve, reject) => {
    driveClient.files.list(
      {
        q: `mimeType != 'application/vnd.google-apps.folder' and name='${fileName}'`,
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
      },
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res.data.files ? res.data.files[0] : null)
      }
    )
  })
}

const saveFile = async (fileName, filePath, fileMimeType, folderId) => {
  await driveClient.files
    .create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath),
      },
    })
    .then(data => {
      return 'done'
    })
    .catch(err => {
      return 'error'
    })
}

export const uploadGgDrive = async file => {
  //ten folder trn driver

  const fileName = Date.now().toString() + '_' + file.originalname
  const buf = Buffer.from(file.path)
  const folderName = FOLDER_FILE_GOOGLR_DRIVE

  let folder = (await searchFolder(folderName).catch(error => {
    console.error(error)
  })) as any

  if (!folder) {
    folder = await new Promise((resolve, reject) => {
      createFolder(folderName)
        .then(response => {
          resolve(response)
        })
        .catch(err => reject(err))
    })
  }

  const done = await new Promise(function (resolve, reject) {
    saveFile(fileName, buf, 'image/jpg', folder.id)
      .then(r => {
        resolve(r)
      })
      .catch(err => {
        reject(err)
      })
  })
  let result = (await searchFile(fileName).catch(error => {
    console.error(error)
  })) as any

  return `http://drive.google.com/uc?export=view&id=${result.id}`
}

export const uploadMultiGgDrive = async files => {
  const promises = []
  if (!Array.isArray(files) || files.length == 0) {
    console.log(Array.isArray(files))
    return []
  }
  files.forEach(file => {
    promises.push(uploadGgDrive(file))
  })
  const folderName = FOLDER_FILE_GOOGLR_DRIVE

  let folder = await searchFolder(folderName).catch(error => {})

  if (!folder) {
    folder = await new Promise((resolve, reject) => {
      createFolder(folderName)
        .then(response => {
          resolve(response)
        })
        .catch(err => reject(err))
    })
  }

  const done = await Promise.all(promises)

  return done
}
