import Mailgun from "mailgun-js";

const MailgunClient = new Mailgun({
  apiKey: process.env.MAINGUN_API_KEY || "",
  domain: process.env.MAINGUN_DOMAIN || "",
});
