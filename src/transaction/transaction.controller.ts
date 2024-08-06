import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Transaction } from './transaction.schema';
import { TransactionTypeDto } from './dto/transaction-type.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: CreateTransactionDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.create(req.user._id, createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get transactions for the logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
    type: [Transaction],
  })
  async findByUser(@Request() req): Promise<Transaction[]> {
    return this.transactionService.findByUser(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('balance')
  @ApiOperation({ summary: 'Get the current balance' })
  @ApiResponse({
    status: 200,
    description: 'Current balance retrieved successfully',
    type: Number,
  })
  async getBalance(@Request() req): Promise<{ balance: number }> {
    const balance = await this.transactionService.getBalance(req.user._id);
    return { balance };
  }

  @Get('types')
  @ApiOperation({ summary: 'Get transaction types' })
  @ApiResponse({
    status: 200,
    description: 'Transaction types retrieved successfully',
    type: [TransactionTypeDto],
  })
  getTransactionTypes(): { value: string; display: string }[] {
    return this.transactionService.getTransactionTypes();
  }
}
