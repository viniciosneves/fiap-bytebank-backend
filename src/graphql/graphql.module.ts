import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { AuthModule } from '../auth/auth.module';
import { TransactionTypeResolver } from './resolvers/transaction-type.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AccountResolver } from './resolvers/account.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';

@Module({
  imports: [UserModule, TransactionModule, AuthModule],
  providers: [
    TransactionTypeResolver,
    UserResolver,
    AccountResolver,
    TransactionResolver,
  ],
})
export class GraphqlModule {}
