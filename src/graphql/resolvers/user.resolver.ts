import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserModel } from '../models/user.model';
import { LoginResponseModel } from '../models/login-response.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserDto } from '../dto/user.dto';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserModel)
  async register(@Args('input') input: CreateUserDto): Promise<UserModel> {
    const user = await this.userService.create(input);
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  @Mutation(() => LoginResponseModel)
  async login(@Args('input') input: LoginUserDto): Promise<LoginResponseModel> {
    return this.authService.login(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async me(@CurrentUser() user: UserDto): Promise<UserModel> {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
