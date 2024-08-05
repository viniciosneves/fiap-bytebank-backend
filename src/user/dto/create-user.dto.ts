import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Wick' })
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.wick@continental.com' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'lovemydog' })
  password: string;
}
