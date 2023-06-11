import * as fs from 'fs'
export const FsReadStream = async (fileUrl: string): Promise<fs.ReadStream> => {
  return fs.createReadStream(fileUrl)
}

export const FsReadBuffer = async (fileUrl: string): Promise<Buffer> => {
  let buffer: Buffer
  await new Promise(res =>
    fs.readFile(fileUrl, (err, data) => {
      buffer = data
      res(1)
    })
  )

  return buffer
}
