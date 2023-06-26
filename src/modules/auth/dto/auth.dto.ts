import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  Equals,
  IsString,
  IsEnum,
  IsDate,
  IsNumber,
  Allow,
  IsOptional,
} from 'class-validator'
import { Sex } from 'src/models/user.model'

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsOptional()
  @IsEnum(Sex)
  readonly sex?: string

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => +value)
  @Transform(({ value }) => new Date(value))
  readonly dOB?: Date
}

export class LogoutDto {}
