import Twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const twilioClient = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_TOKEN
);

/**
 * send any messages
 * @param {string} to receiver
 * @param {string} body body
 */
export const sendSMS = (to: string, body: string) => {
  /**
   * @method create()
   * @returns Promise
   */
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE,
  });
};

/**
 * send verification key with @function sendSMS()
 * @param {string} to
 * @param {string} key
 */
export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`);
