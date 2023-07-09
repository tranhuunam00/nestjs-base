import { BadRequestException, Injectable } from '@nestjs/common'
import * as fs from 'fs'
const path = require('path')
const { PDFNet } = require('@pdftron/pdfnet-node')

export class PdfLid<T> {
  private folderPath = '../path'

  constructor(folderPath: string) {
    this.folderPath = folderPath
  }

  private PDFNetEndpoint = async (
    main: (pageNumber: number) => Promise<void>,
    callback: () => Promise<T | Buffer>
  ): Promise<T | Buffer> => {
    await new Promise((rev, rej) => {
      PDFNet.runWithCleanup(
        main,
        'demo:1688704175131:7c64ee1203000000002ab5d1d5b7d8f319ed9ac1fc33dbdf285e8a305f'
      )
        .then(() => {
          // PDFNet.shutdown()
          rev(1)
        })
        .catch((error: Error) => {
          rej(error)
        })
    })

    return await callback()
  }
  textExtract = async (filename: string, page: number): Promise<Buffer | T> => {
    const outputPath = filename + '.txt'
    const main = async (pageNumber: number) => {
      await PDFNet.initialize()
      try {
        const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(filename)
        await pdfdoc.initSecurityHandler()
        const page = await pdfdoc.getPage(pageNumber)
        if (!page) {
          throw 'Page number is invalid.'
        }

        const txt = await PDFNet.TextExtractor.create()
        const rect = new PDFNet.Rect(0, 0, 612, 794)
        txt.begin(page, rect)

        const text = await txt.getAsText()
        fs.writeFile(outputPath, text, err => {
          if (err) return console.log(err)
        })
        fs.unlink(filename, err => {})
      } catch (err) {
        console.log('main error', err)
        throw err
      }
    }
    return await this.PDFNetEndpoint(
      () => main(page),
      async (): Promise<T | Buffer> => {
        // fs.unlink(outputPath, err => {})
        const data: T | Buffer = await new Promise((rev, rej) => {
          fs.readFile(outputPath, (err, data) => {
            if (err) {
              rej(err)
            } else {
              rev(data)
            }
          })
          fs.unlink(outputPath, err => {})
        })
        return data
      }
    )
  }
}
