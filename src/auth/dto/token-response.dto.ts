import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4ud0Bjb250aW5lbnRhbC51ayIsInN1YiI6IjY2YjEzMWVhODYzMjQ4NWRiNDllZjkyNCIsImlhdCI6MTcyMjg5MDI2OSwiZXhwIjoxNzIyODkzODY5fQ.cAzVMK9MUeHw6YKKv9y8EsFRQUCN3C--8cMIKwQOADw',
    description: 'JWT access token',
  })
  accessToken: string;
}
