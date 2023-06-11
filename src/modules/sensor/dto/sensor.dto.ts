import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  Equals,
  IsString,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator'
import { Sex } from 'src/models/user.model'

export class CreateSensor {
  @IsNotEmpty()
  @IsString()
  readonly value: string

  @IsNotEmpty()
  @IsString()
  readonly customer: string

  @IsNotEmpty()
  @IsString()
  readonly nameSensor: string
}

export class DeleteSensor {
  @IsNotEmpty()
  @IsString()
  readonly customer: string
}

export class  ExportDataCSV {
  @IsNotEmpty()
  @IsString()
  readonly customer: string
}