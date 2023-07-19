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
import { ApiProperty } from '@nestjs/swagger'
import { Sex } from 'src/models/user.model'
import { BaseUserDto } from 'src/modules/users/dto/user.dto'

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string
}

export class SignInDto extends BaseUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string
}

export class LogoutDto {}
