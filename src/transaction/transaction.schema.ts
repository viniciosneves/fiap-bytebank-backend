import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TransactionType {
  WITHDRAWAL = 'saque',
  DEPOSIT = 'deposito',
  TRANSFER = 'transferencia',
}

export const TransactionTypeDisplay = {
  [TransactionType.WITHDRAWAL]: 'Saque',
  [TransactionType.DEPOSIT]: 'Depósito',
  [TransactionType.TRANSFER]: 'Transferência',
};

@Schema()
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, enum: TransactionType })
  type: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
