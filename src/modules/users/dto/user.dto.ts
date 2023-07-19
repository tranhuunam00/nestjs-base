import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'
import { Sex } from 'src/models/user.model'
import { SignInDto } from 'src/modules/auth/dto/auth.dto'

export class BaseUserDto {
  @ApiProperty({
    enum: Sex,
    enumName: 'Sex',
    description: 'Hãy nhập male or feMale',
  })
  @IsString()
  @IsOptional()
  @IsEnum(Sex)
  sex?: string

  @ApiProperty({ default: 1689760765 })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => +value)
  @Transform(({ value }) => new Date(value))
  dOB?: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatarUrl?: string
}
