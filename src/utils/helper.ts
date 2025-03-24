import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAppointmentInput } from '../appointments/dto/create-appointment.input';
import nodemailer from 'nodemailer';
import { contactUsEmailInput } from '../sales-products/dto/create-sales-product.input';


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



export const sendAppointmentEmail = async (appointmentData: CreateAppointmentInput) => {
  const {
    firstname,
    email,
    phoneNumber,
    whatsappNumber,
    area,
    selectRooms,
    preferredDate,
    preferredTime,
    findUs,
    comment,
    contactMethod,
    appointsType,
  } = appointmentData;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #bc6838;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: white;
          }
          .field {
            margin: 15px 0;
          }
          .label {
            font-weight: bold;
            
          }
          .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            padding: 10px;
            border-top: 1px solid #eee;
          }
          .highlight {
            background-color: #f0f8ff;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Appointment Confirmation</h2>
          </div>
          <div class="content">
            <p>Dear ${firstname},</p>
            <p>Thank you for scheduling an appointment with us! Here are the details:</p>

            <div class="field">
              <span class="label">Appointment Type:</span> 
              ${appointsType ? appointsType.toUpperCase() : "Not specified"}
            </div>

            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>

            <div class="field">
              <span class="label">Phone Number:</span> ${phoneNumber}
            </div>

            ${whatsappNumber ? `
              <div class="field">
                <span class="label">WhatsApp Number:</span> ${whatsappNumber}
              </div>
            ` : ""}

            ${area ? `
              <div class="field">
                <span class="label">Area:</span> ${area}
              </div>
            ` : ""}

            ${selectRooms ? `
              <div class="field">
                <span class="label">Selected Rooms:</span> ${selectRooms}
              </div>
            ` : ""}

            <div class="field highlight">
              <span class="label">Preferred Date:</span> 
              ${preferredDate ? new Date(preferredDate).toLocaleDateString() : "Not specified"}
            </div>

            <div class="field highlight">
              <span class="label">Preferred Time:</span> 
              ${preferredTime || "Not specified"}
            </div>

            ${findUs ? `
              <div class="field">
                <span class="label">How You Found Us:</span> ${findUs}
              </div>
            ` : ""}

            ${comment ? `
              <div class="field">
                <span class="label">Comments:</span>
                <p>${comment}</p>
              </div>
            ` : ""}

            ${contactMethod ? `
              <div class="field">
                <span class="label">Preferred Contact Method:</span> 
                ${contactMethod.whatsapp ? "WhatsApp" : ""}
                ${contactMethod.telephone ? "TelePhone" : ""}
                ${contactMethod.email ? "Email" : ""}
              </div>
            ` : ""}

            <p>We will contact you soon to confirm your appointment. If you need to make any changes, please reply to this email or call us at +971 50 597 4385.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Easyfloors. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email unless instructed.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Appointment Request Confirmation - ${appointsType || "General"}`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending appointment email:", error);
    throw new Error("Failed to send appointment confirmation email");
  }
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


