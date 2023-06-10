import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { SensorService } from './sensor.service'
import { CreateSensor, DeleteSensor } from './dto/sensor.dto'

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
}
