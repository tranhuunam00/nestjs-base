import { Injectable } from '@nestjs/common'
import { SensorRepositories } from './sensor.repositories'
import { CreateSensor, DeleteSensor } from './dto/sensor.dto'

@Injectable()
export class SensorService {
  constructor(private sensorRepo: SensorRepositories) {}
  createSensor = async ({ customer, value, nameSensor }: CreateSensor) => {
    const listData = value.split('/')
    const data = listData.map(item => {
      const [acc, time] = item.split('@')
      return {
        name: nameSensor,
        value: acc,
        time: new Date(time),
        customer,
      }
    })
    return await this.sensorRepo.bulkCreate(data)
  }

  deleteSensor = async ({ customer }: DeleteSensor) => {
    return await this.sensorRepo.delete({customer})
  }
}
