import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';
import { contactUsEmailInput } from 'sales-products/dto/create-sales-product.input';


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

const transporter = nodemailer.createTransport({
  host: 'mail.blindsandcurtains.ae',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendResetEmail = async (email: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    html: "You have recieved appointments",
  });
};


export const contactusEmail = async (data: contactUsEmailInput) => {
  const { firstName, LastName,email, phoneNumber, message } = data;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .header {
            background-color: #bc6838;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .field {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            color: #333;
          }
          .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Us Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">First Name:</span> ${firstName}
            </div>
            <div class="field">
              <span class="label">Last Name:</span> ${LastName}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
              <span class="label">Phone Number:</span> ${phoneNumber}
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <p>${message}</p>
            </div>
          </div>
          <div class="footer">
            This message was sent from your website's contact form
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_US_EMAIL,
    subject: `New Contact Form Submission from ${firstName} ${LastName}`,
    html: htmlTemplate,
  });
};


