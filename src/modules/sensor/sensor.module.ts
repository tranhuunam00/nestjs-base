import { Module } from '@nestjs/common'
import { SensorController } from './sensor.controller'
import { SensorService } from './sensor.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Sensor, SensorSchema } from 'src/models/sensor.model'
import { SensorRepositories } from './sensor.repositories'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
  ],
  controllers: [SensorController],
  providers: [SensorService, SensorRepositories],
})
export class SensorModule {}
