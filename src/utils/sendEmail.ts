import Mailgun from "mailgun-js";
import { send } from "process";

const MailgunClient = new Mailgun({
  apiKey: process.env.MAINGUN_API_KEY || "",
  domain: process.env.MAINGUN_DOMAIN || "",
});

/**
 * send email with @MailgunClient
 *
 * @param {string} subject email title.
 * @param {string} html email contents.
 */
const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "minjung.kim@tierjay.com",
    to: "minjung.kim@tierjay.com",
    subject,
    html,
  };

  return MailgunClient.messages().send(emailData);
};

/**
 * send verification email
 * @exports
 *
 * @param {string} fullName user's full name
 * @param {string} key verification key
 */
export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="https://https://github.com/alswnd/${key}">here</a>`;

  return sendEmail(emailSubject, emailBody);
};
