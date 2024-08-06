import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TransactionTypeDto {
  @Field()
  value: string;

  @Field()
  display: string;
}
