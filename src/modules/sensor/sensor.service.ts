import { Injectable } from '@nestjs/common'
import { SensorRepositories } from './sensor.repositories'
import { CreateSensor, DeleteSensor, ExportDataCSV } from './dto/sensor.dto'
import { createObjectCsvWriter } from 'csv-writer'
import * as fs from 'fs'
const HEADER_ACCELEROMETER_EXPORT = [
  'customer',
  'activity',
  'createdAt',
  'x',
  'y',
  'z',
]
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
    return await this.sensorRepo.delete({ customer })
  }

  exportFileSensorData = async ({ customer }: ExportDataCSV) => {
    const sensors = await this.sensorRepo.findAllByCustomer(customer)
    const data = []
    sensors.forEach(item => {
      const [x, y, z] = item.value.split('%')
      data.push({
        customer,
        activity: '0',
        createdAt: item.time.toString(),
        x,
        y,
        z,
      })
    })

    fs.unlink('path/export.csv', err => {})
    const csvWriter = createObjectCsvWriter({
      path: 'path/export.csv', // Specify the path where you want to save the CSV file
      header: [
        { id: 'customer', title: 'customer' },
        { id: 'activity', title: 'activity' },
        { id: 'createdAt', title: 'createdAt' },
        { id: 'x', title: 'x' },
        { id: 'y', title: 'y' },
        { id: 'z', title: 'z' },
      ],
    })

    await csvWriter.writeRecords(data)

    return 'path/export.csv'
  }
}
