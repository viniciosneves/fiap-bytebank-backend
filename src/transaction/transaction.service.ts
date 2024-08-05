import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionType,
  TransactionTypeDisplay,
} from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../user/user.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    let { value } = createTransactionDto;
    const { type } = createTransactionDto;

    if (
      type === TransactionType.WITHDRAWAL ||
      type === TransactionType.TRANSFER
    ) {
      value = -value;
    }

    const transaction = new this.transactionModel({
      user: userId,
      value,
      type,
    });

    return transaction.save();
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ user: userId }).exec();
  }

  async getBalance(userId: string): Promise<number> {
    const transactions = await this.transactionModel
      .find({ user: userId })
      .exec();
    return transactions.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );
  }

  getTransactionTypes(): { value: string; display: string }[] {
    return Object.values(TransactionType).map((type) => ({
      value: type,
      display: TransactionTypeDisplay[type],
    }));
  }
}
