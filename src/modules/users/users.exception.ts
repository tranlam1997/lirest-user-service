import { BadRequestException } from '@src/errors/exceptions/bad-request.exception';
import { NotFoundException } from '@src/errors/exceptions/not-found.exception';

export class UserNotFoundException extends NotFoundException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class UserAlreadyExistsException extends BadRequestException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}
