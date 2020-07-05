import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

/**
 * sendSMS()
 * @param to receiver
 * @param body body
 * @description send any messages
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
 * sendVerificationSMS()
 * @param to
 * @param key
 * send verification key with @function sendSMS()
 */
export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`);
