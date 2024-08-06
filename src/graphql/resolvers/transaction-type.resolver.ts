import { Resolver, Query } from '@nestjs/graphql';
import { TransactionTypeDto } from '../dto/transaction-type.dto';
import {
  TransactionType,
  TransactionTypeDisplay,
} from 'src/transaction/transaction.schema';

@Resolver(() => TransactionTypeDto)
export class TransactionTypeResolver {
  @Query(() => [TransactionTypeDto])
  getTransactionTypes(): TransactionTypeDto[] {
    return Object.values(TransactionType).map((type) => ({
      value: type,
      display: TransactionTypeDisplay[type],
    }));
  }
}
