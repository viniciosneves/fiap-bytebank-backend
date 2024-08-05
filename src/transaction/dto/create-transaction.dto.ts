import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum, IsPositive } from 'class-validator';
import { TransactionType } from '../transaction.schema';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.0 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({ example: 'deposito', enum: TransactionType })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
