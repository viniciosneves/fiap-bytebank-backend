import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    userId: string | Types.ObjectId,
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

    userId = this.parseUserId(userId);

    const transaction = new this.transactionModel({
      user: userId,
      value,
      type,
    });

    return transaction.save();
  }

  async findByUser(userId: string | Types.ObjectId): Promise<Transaction[]> {
    userId = this.parseUserId(userId);
    return this.transactionModel.find({ user: userId }).exec();
  }

  private parseUserId(userId: string | Types.ObjectId) {
    if (typeof userId === 'string') {
      if (Types.ObjectId.isValid(userId)) {
        userId = new Types.ObjectId(userId);
      } else {
        throw new BadRequestException('Invalid user ID format');
      }
    }
    return userId;
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
