import { Injectable, Inject } from '@nestjs/common'

import { USER_MODEL, USER_REPOSITORY } from '../../core/constants'

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Sensor } from 'src/models/sensor.model'

@Injectable()
export class SensorRepositories {
  constructor(@InjectModel(Sensor.name) private sensorModel: Model<Sensor>) {}

  async findOneByCondition(query: Partial<Sensor>): Promise<Sensor> {
    return await this.sensorModel.findOne({ ...query })
  }

  async findOneById(id: string) {
    return await this.sensorModel.findById(id)
  }

  async create(data: Partial<Sensor>): Promise<Sensor> {
    const created = new this.sensorModel(data)
    const result = await created.save({})
    return result
  }
  async deleteOne(where: Partial<Sensor>) {
    await this.sensorModel.deleteOne({ where })
  }

  async delete(where: Partial<Sensor>) {
    await this.sensorModel.deleteMany({ ...where })
  }

  async updateOne(where: Partial<Sensor>, data: Partial<Sensor>) {
    return await this.sensorModel.updateOne({ ...where }, { ...data })
  }

  async bulkCreate(sensorDatas: Partial<Sensor>[]) {
    return await this.sensorModel.insertMany(sensorDatas)
  }
}
