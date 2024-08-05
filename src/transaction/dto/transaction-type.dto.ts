import { ApiProperty } from '@nestjs/swagger';

export class TransactionTypeDto {
  @ApiProperty({ example: 'saque' })
  value: string;

  @ApiProperty({ example: 'Saque' })
  display: string;
}
