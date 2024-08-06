import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  userId: string;

  @Field(() => Float)
  value: number;

  @Field()
  type: string;

  @Field()
  createdAt: Date;
}
