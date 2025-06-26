import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Bookstore",
      link: "https://mailgen.js/",
    },
  });

  var emailHtml = mailGenerator.generate(options);
  var emailText = mailGenerator.generatePlaintext(options);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.example@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
      body: {
        name: username,
        intro: "Welcome to our app! We're very excited to have you on board.",
        action: {
          instructions:
            "To verify your email please click on the following button:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Verify your email",
            link: verificationUrl,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  };
  const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
      body: {
        name: username,
        intro: "We got a request to  change your password",
        action: {
          instructions: "To change your password click the button",
          button: {
            color: "#22BC66",
            text: "Reset password",
            link: passwordResetUrl,
          },
        },
        outro:
          "Need help, or have questions? just reply to this email,we'd love to help",
      },
    };
  };

  const orderConfirmationMailgenContent = (username, items, totalCost) => {
    return {
      body: {
        name: username,
        intro: "Your order has been processed successfully",
        table: {
          data: items?.map((item) => {
            return {
              item: item.book?.name,
              price: "NPR " + item.book?.price + "/-",
              quantity: item.quantity,
            };
          }),

          columns: {
            // Optionally, customize the column widths
            customWidth: {
              item: "20%",
              price: "15%",
              quantity: "15%",
            },
            // Optionally, change column text alignment
            customAlignment: {
              price: "right",
              quantity: "right",
            },
          },
        },
        outro: [
          `Total order cost: INR ${totalCost}/-`,
          "You can check the status of your order and more in your order history",
        ],
      },
    };
  };
};
export {
  sendMail,
  emailVerificationMailgenContent,
  forgotPasswordMailGenContent,
  orderConfirmationMailgenContent,
};
