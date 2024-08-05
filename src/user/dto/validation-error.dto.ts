import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDto {
  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: [
      'name should not be empty',
      'name must be a string',
      'email should not be empty',
      'email must be an email',
      'password should not be empty',
      'password must be a string',
    ],
  })
  message: string[];
}
