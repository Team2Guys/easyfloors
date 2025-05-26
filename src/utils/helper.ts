import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAppointmentInput } from '../appointments/dto/create-appointment.input';
import nodemailer from 'nodemailer';
import { contactUsEmailInput, orderEmailInput } from '../sales-products/dto/create-sales-product.input';


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
            throw new HttpException('A database error occurred.', HttpStatus.INTERNAL_SERVER_ERROR);
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
      AppointsType,
   } = appointmentData;

   const htmlTemplate = ` <!DOCTYPE html>
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
              ${AppointsType ? AppointsType.toUpperCase() : "Not specified"}
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
         subject: `Appointment Request Confirmation - ${AppointsType || "General"}`,
         html: htmlTemplate,
      });
   } catch (error) {
      console.error("Error sending appointment email:", error);
      throw new Error("Failed to send appointment confirmation email");
   }
};

export const contactusEmail = async (data: contactUsEmailInput) => {
   const { firstName, LastName, email, phoneNumber, message } = data;

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


export const sendEmailHandler = async (orderDetails: orderEmailInput, CustomerEmail?: string,) => {
   const { products, firstName, lastName, orderId, email, phone, address, emirate, totalPrice, shipmentFee } = orderDetails;

   const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
   }).toUpperCase();
   const mailOptions = {
      from: `Order Confirmation @EF ${process.env.EMAIL_USER}`,
      to: CustomerEmail ? CustomerEmail : `${process.env.EMAIL_USER},${process.env.ORDER_MAIL1}`,
      subject: `Order has been confirmed @ EF against Order # ${orderId}`,

      html: `<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Order Confirmation</title>
 <style>
    body {
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 0;
       background-color: #f4f4f4;
    }

    .container {
       max-width: 500px;
       margin: 20px auto;
       background-color: #fff;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       border-top: 5px solid #BF6933;
       border-bottom: 5px solid #BF6933;
    }

    .main-container {
       padding: 20px;
       background-color:rgb(255, 255, 255) !important;
    }

    .header {
       text-align: center;
       padding: 20px 0;
    }

    .header img {
       max-width: 250px;
    }

    .status {
       display: flex;
       justify-content: center;
       align-items: center;
       margin: 20px 0;
    }

    .status div {
       padding: 10px 20px;
       border-radius: 20px;
       margin: 0 5px;
       display: flex;
       align-items: center;
       justify-content: center;
       width: 120px;
       font-weight: bold;
    }

    .confirmed {
       background-color: #BF6933;
       color: #fff;
    }

    .shipping,
    .received {
       background-color: #ddd;
       color: #333;
    }

    .order-button {
       display: block;
       width: 200px;
       text-align: center;
       background-color: #BF6933;
       color: white !important;
       padding: 10px;
       margin: 20px auto;
       text-decoration: none;
       border-radius: 1px;
    }

    .table-font{
       font-size: 13px;
       color: black;
    }
      
    .order-para{
      color: black;
    }
    
    .purchase-details {
       background-color: #FFF9F5;
       padding: 15px;
       margin-top: 20px;
    }

    .purchase-table {
       width: 100%;
       border-collapse: collapse;
       text-align: center;
    }

    .purchase-table th,
    .purchase-table td {
       padding: 10px;
       text-align: left;
       border-bottom: 1px solid #ddd;
    }

    .footer {
       background-color: #BF6933;
       color: white;
       text-align: center;
       padding: 15px 0;
       margin-top: 20px;
    }

    .social-icons {
       text-align: center;
       margin-top: 10px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 18px;
       color: #333;
    }

    .features {
       background-color: #ff6600;
       color: white;
       padding: 20px;
       display: flex;
       justify-content: space-around;
    }

    .feature {
       text-align: center;
    }

    .feature img {
       width: 40px;
       height: 40px;
    }

    .social-icons {
       padding: 15px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 20px;
       color: black;
    }

    .features {
       background-color: #ff6600;
       color: white;
       width: 100%;
       align-items: center;
       padding: 30px;
    }

    .feature {
       text-align: center;
    }

    .feature img {
       width: 30px;
       height: auto;
    }

    .categories {
       margin-top: 5px;
       padding: 15px 0px;
       border-top: 2px solid #ccc;
       border-bottom: 2px solid #ccc;
       text-align: center;
    }

    .categories a {
       font-size: 11px;
       font-weight: 100;
       margin-top: 5px;
       text-decoration: none;
       color: rgb(255, 255, 255);
       padding: 10px 15px;
       background-color: #BF6933;
       display: inline-block;
    }

    .social-icons {
       padding: 15px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 20px;
       color: black;
    }

    .progress-container {
       align-items: center;
       justify-content: center;
       margin-top: 50px;
       margin-bottom: 50px;
       width: 100%;
    }

    .step {
       display: flex;
       flex-direction: column;
       align-items: center;
       position: relative;
    }

    .step:not(:last-child)::after {
       content: "";
       position: absolute;
       width: 80px;
       height: 2px;
       background-color: black;
       top: 25px;
       left: 100%;
       transform: translateX(-40%);
    }

    .icon {
       width: 50px;
       height: 50px;
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: white;
       border: 2px solid black;
       font-size: 24px;
    }

    .completed .icon {
       background-color: #ff6600;
       color: white;
       border: none;
    }

    .step p {
       margin-top: 8px;
       font-size: 14px;
       font-weight: bold;
    }

@media (max-width: 450px) {
       .main-container{
          padding: 20px 5px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
       .table-font.user-info{
          padding: 0px !important;
       }
       .user-info-wrapper{
          padding-right: 5px !important;
       }
       .total-wrapper{
          padding-right: 5px !important;
          padding-left: 5px !important;
       }
    }
    @media (max-width: 400px) {
       .table-font{
          font-size: 11px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
    }
    @media (max-width: 350px) {
       .main-container{
          padding: 20px 5px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
       .table-font{
          font-size: 10px;
       }
       .product-title-wrapper{
          width: 170px !important;
       }
       .product-title-wrapper .table-font {
          margin-left: 0px !important;
       }
       .purchase-details h3 {
          font-size: 16px !important;
       }
       .order-para {
          font-size: 14px !important;
       }
        .product-title-wrapper .product-img {
          width: 60px !important;
          height: 60px !important;
       }
      .categories a {
       padding: 10px;
      }
    }
 </style>
</head>

<body>
 <div class="container">
    <div class="main-container">
       <div class="header" style="text-align:center;">
          <img
             src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742982252/easyfloor_logo_2_goghap.jpg"
             alt="Brand Logo">
       </div>
       <h3 style="text-align:center; margin:0; padding:0; color: black;">ORDER#${orderId}</h3>
       <p style="text-align:center;margin:0;padding:0; color: black;">${formattedDate}</p>
       <h1 style="text-align:center; color: black;">Order Confirmed</h1>

       <div class="progress-container" style="text-align:center;">
          <img src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742982267/easyfloor_order_bhi6l1.jpg"
             alt="Progress Status" style="width: 100%;">
       </div>
       <p style="text-align:center;" class="order-para">Dear <b>Customer,</b></p>
       <p style="text-align:center;" class="order-para">Thank you very much for the order <br> you placed with <a
             href="https://easyfloors.ae/">https://easyfloors.ae/</a></p>
       <a href="#" class="order-button"> ${orderDetails.isfreesample ? "View Your Order" : "View Your Free Sample Order"}</a>
       <p style="text-align:center;" class="order-para">Your ${orderDetails.isfreesample ? "Free Sample order" : "order" } has now been sent to the warehouse to prepare for packing and
          dispatch.</p>
       <p style="text-align:center;" class="order-para">Our team will be in touch soon to arrange the delivery with you.</p>
       <p style="text-align:center;" class="order-para">All The Best,</p>
       <p style="text-align:center;" class="order-para">The Team at<strong> @"Easyfloors"</strong></p>
       <div class="purchase-details">
          <h3>Purchase Details</h3>
          <table class="purchase-table">
             <thead>
                <tr>
                   <th style="padding: 10px 2px; width: 60%" class="table-font">Product</th>
                   <th style="padding: 10px 2px;  width: 25%; text-align: center;" class="table-font">Product Price</th>
                   <th style="padding: 10px 2px;  width: 15%; text-align: center;" class="table-font">Price</th>
                </tr>
             </thead>


             <tbody>
                ${products?.map((product, index) => `
                <tr key="${index}">
                   <td style="padding: 10px 2px;" class="product-title-wrapper">
                      <div style="display:flex; gap:5px; align-items:center; justify-content:center;">
                         <img
                            src="${product.image}"
                            alt="${product.name}" style="height:70px; width:70px;" class="product-img">
                         <div>
                            <p class="table-font" style="margin-left: 5px; margin-bottom: 0px; margin-top: 0px; color: black; font-weight: 600;">${product.name}</p>
                            <p class="table-font" style="margin-left: 5px; margin-bottom: 0px; margin-top: 8px; color: black;"><b>No .of Boxes:</b> ${product.requiredBoxes}(${product.squareMeter} SQM)</p>
                         </div>
                      </div>
                   </td>
                   <td class="table-font" style="text-align:center; padding: 10px 2px;">${product.price || "Free"}</td>
                   <td class="table-font" style="text-align:center; padding: 10px 2px;">${product.totalPrice || "Free"}</td>
                </tr>
                `).join('')}
             </tbody>


          </table>

          <body style="font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0;">
             <table style="width: 100%; border-collapse: collapse; text-align: left; margin: auto;">
                <tr>
                   <td style="width: 50%; vertical-align: top; padding: 10px  10px 10px 0px ; border-right: 2px solid #ccc;" class="user-info-wrapper">
                      <table>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Name:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${(firstName || "") + "" + lastName}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Email:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${email}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Phone:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${phone}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Address:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${address}, ${emirate}</td>
                         </tr>

                          <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Shipping Type:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${orderDetails?.shippingMethod?.name}</td>
                         </tr>



                      </table>
                   </td>

                   <td style="width: 30%;  padding: 10px 5px;" class="total-wrapper">
                      <table style="border-collapse: collapse;">
                         <tr>
                            <td colspan="5" style="padding: 8px;" class="table-font">Subtotal</td>
                            <td style="padding: 8px;" class="table-font">${totalPrice || "Free"}</td>
                         </tr>
                         <tr style="border-bottom: 2px solid #ccc;">
                            <td colspan="5" style="padding: 8px;" class="table-font">Shipment</td>
                            <td style="padding: 8px;" class="table-font">${shipmentFee === 0 ? "Free" : shipmentFee}</td>
                         </tr>
                         <tr>
                            <td colspan="5" style="padding: 8px; font-weight: bold; " class="table-font">Total Incl. VAT</td>
                            <td style="padding: 8px; font-weight: bold;" class="table-font">${(totalPrice && Number(shipmentFee) + totalPrice) || "Free"}</td>
                         </tr>
                      </table>
                   </td>
                </tr>
             </table>
             </td>
             </tr>
             </table>
       </div>

       <div style="text-align: center; margin-top: 20px; background-color: #BF6933; padding: 14px;">
          <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/features_lbnmr6.png" alt="features"
             style="display: block; margin: auto; max-width: 100%; height: auto;">
       </div>
</body>
<div class="categories">
 <a target="_blank" href=https://easyfloors.ae/spc-flooring>SPC Flooring</a>
 <a target="_blank" href=https://easyfloors.ae/lvt-flooring>LVT Flooring    </a>
 <a target="_blank" href=https://easyfloors.ae/richmond-flooring> Richmond Flooring </a>
 <a target="_blank" href=https://easyfloors.ae/polar-flooring>Polar Flooring </a>

</div>
<div class="social-icons">
 <a href="https://www.facebook.com/easyfloorsuae" target="_blank"> <img
       src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185482/facebook-icon_tdqcrw.png"></a>
 <a href="https://www.pinterest.com/easyfloorsuae/" target="_blank"> <img
       src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/pinterest-icon_dsvge7.png"
       alt="pinterest"></a>
</div>
</div>
</body>

</html>`
   };


   try {
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.error('Error sending email:', error);
            throw new Error(error.message || JSON.stringify(error))

         } else {
            console.log('Email sent:', info.response);
            return info.response
         }
      });
   } catch (error) {
      throw new Error(error.message)
   }


};





