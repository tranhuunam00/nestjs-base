import {
  Body,
  Controller,
  Delete,
  Get,
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
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,

    @Query() query: ExportDataCSV
  ) {
    const filePath = await this.sensorService.exportFileSensorData(query)
    console.log(filePath)
    const fileStream = await FsReadBuffer(filePath)
    reply.header('Content-Disposition', `attachment; filename="${filePath}"`)
    reply.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    reply.send(fileStream)
  }
}
