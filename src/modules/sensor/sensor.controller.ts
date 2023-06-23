import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common'
import { SensorService } from './sensor.service'
import { CreateSensor, DeleteSensor, ExportDataCSV } from './dto/sensor.dto'
import { FsReadBuffer, FsReadStream } from 'src/helper/fs.helper'
import * as fs from 'fs'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Response } from 'express'

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) {}
  @Post('')
  createSensor(@Body() data: CreateSensor) {
    return this.sensorService.createSensor(data)
  }

  @Delete('')
  deleteSensor(@Body() data: DeleteSensor) {
    return this.sensorService.deleteSensor(data)
  }

  @Get('accelorometer-csv')
  async exportAccelerometerCSV(
    @Query() query: ExportDataCSV,
    @Res({ passthrough: true }) res: Response
  ) {
    const filePath = await this.sensorService.exportFileSensorData(query)
    const fileStream = await FsReadBuffer(filePath)

    // Set the headers
    res.setHeader('Content-Disposition', 'attachment')
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    // Send the response
    res.end(fileStream)
  }
}
