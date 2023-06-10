import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ModelsBase } from './interface/base.model.interface'

export type SensorDocument = HydratedDocument<Sensor>

@Schema()
export class SensorProp extends ModelsBase {
  @Prop({ type: String, required: true })
  customer: string

  @Prop({ type: Date, required: true })
  time: Date

  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Prop({
    type: String,
    required: true,
  })
  value: string
}

export class Sensor extends SensorProp {
  @Prop({ type: String })
  _id: ObjectId
}

export const SensorSchema = SchemaFactory.createForClass(SensorProp).set(
  'timestamps',
  true
)
