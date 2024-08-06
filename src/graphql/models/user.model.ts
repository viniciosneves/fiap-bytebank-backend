import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
