import { BadRequestException } from '@nestjs/common';

export class DuplicateUserException extends BadRequestException {
  constructor() {
    super({
      message: ['Duplicated user'],
      error: 'Bad Request',
      statusCode: 400,
    });
  }
}
