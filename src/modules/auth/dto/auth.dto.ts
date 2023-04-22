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

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(Sex)
  readonly sex: string

  @IsNumber()
  @Transform(({ value }) => new Date(value))
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  readonly dOB: Date
}

export class LogoutDto {}
