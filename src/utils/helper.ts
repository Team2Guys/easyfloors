import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';


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
  throw new HttpException(error || 'An unexpected error occurred.', status ? HttpStatus[status] : HttpStatus.INTERNAL_SERVER_ERROR
  );
};


export const sendResetEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.blindsandcurtains.ae',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});


  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    html: "You have recieved appointments",
  });
};
