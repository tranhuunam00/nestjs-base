import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ModelsBase } from './interface/base.model.interface'

export type CatDocument = HydratedDocument<User>

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Status_User {
  lock = 'lock',
  active = 'active',
  inActive = 'inActive',
}

export enum Sex {
  male = 'male',
  feMale = 'feMale',
}

@Schema()
export class UserProp extends ModelsBase {
  @Prop({ type: String, required: true })
  username: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({
    type: String,
    required: true,
    enum: Status_User,
    default: Status_User.inActive,
  })
  status: string

  @Prop({
    type: String,
    required: true,
    enum: Sex,
    default: Sex.male,
  })
  sex: string

  @Prop({ type: String, enum: Role, default: Role.USER, required: true })
  role: Role

  @Prop({ type: Date, required: true })
  dOB: Date

  @Prop({ type: String, required: false })
  avatarUrl: string
}

export class User extends UserProp {
  @Prop()
  _id: ObjectId
}

export const UserSchema = SchemaFactory.createForClass(UserProp).set(
  'timestamps',
  true
)
