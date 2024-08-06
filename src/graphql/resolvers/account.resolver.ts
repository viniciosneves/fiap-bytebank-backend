import { Resolver, Query } from '@nestjs/graphql';
import { TransactionService } from '../../transaction/transaction.service';
import { AccountModel } from '../models/account.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { User } from '../../user/user.schema';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => AccountModel)
  async account(@CurrentUser() user: User): Promise<AccountModel> {
    const transactions = await this.transactionService.findByUser(
      user._id.toString(),
    );

    const balance = transactions.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    const transactionsModel = transactions.map((transaction) => ({
      userId: transaction.user._id.toString(),
      _id: transaction._id.toString(),
      value: transaction.value,
      type: transaction.type,
      createdAt: transaction.createdAt,
    }));

    return {
      transactions: transactionsModel,
      balance,
    };
  }
}
