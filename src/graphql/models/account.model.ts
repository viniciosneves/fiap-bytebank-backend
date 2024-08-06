import { ObjectType, Field, Float } from '@nestjs/graphql';
import { TransactionModel } from './transaction.model';

@ObjectType()
export class AccountModel {
  @Field(() => [TransactionModel])
  transactions: TransactionModel[];

  @Field(() => Float)
  balance: number;
}
