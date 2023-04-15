import { Prop } from '@nestjs/mongoose'
export class ModelsBase {
  @Prop({ type: Date })
  createdAt: Date

  @Prop({ type: Date })
  updatedAt: Date
}
