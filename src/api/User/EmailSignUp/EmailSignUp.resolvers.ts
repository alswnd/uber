import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignUpResponse,
  EmailSignUpMutationArgs,
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      try {
        const { email } = args;

        // find user with email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: "You should login instead.",
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          });

          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();

            // if new user email exists, send email.
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL",
              });

              await sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUser.id);

            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You have not verified your phone",
              token: null,
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
