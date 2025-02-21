import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const customHttpException = (error: any, status?: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        throw new HttpException(
          'A record with this value already exists.',
          HttpStatus.BAD_REQUEST
        );
      case 'P2025': // Record not found
        throw new HttpException(
          'The requested record does not exist.',
          HttpStatus.NOT_FOUND
        );
      default:
        throw new HttpException('A database error occurred.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Handle generic errors
  throw new HttpException(error.message || 'An unexpected error occurred.',
    status ? HttpStatus[status] : HttpStatus.INTERNAL_SERVER_ERROR
  );
};
