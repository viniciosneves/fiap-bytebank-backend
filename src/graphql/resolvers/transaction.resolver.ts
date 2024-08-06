import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from '../../transaction/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionModel } from '../models/transaction.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { User } from '../../user/user.schema';

@Resolver(() => TransactionModel)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TransactionModel)
  async addTransaction(
    @CurrentUser() user: User,
    @Args('input') input: CreateTransactionDto,
  ): Promise<TransactionModel> {
    const transaction = await this.transactionService.create(
      user._id.toString(),
      input,
    );
    return {
      _id: transaction._id.toString(),
      value: transaction.value,
      type: transaction.type,
      createdAt: transaction.createdAt,
      userId: transaction.user._id.toString(),
    };
  }
}
