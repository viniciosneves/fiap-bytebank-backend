import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TransactionType } from '../../transaction/transaction.schema';

@InputType()
export class CreateTransactionDto {
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @Field()
  @IsNotEmpty()
  @IsEnum(TransactionType, {
    message: `Type must be one of the following values: ${Object.values(TransactionType).join(', ')}`,
  })
  type: TransactionType;
}
