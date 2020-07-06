import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import { RequestEmailVerificationResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;

        if (user.email && !user.verifiedEmail) {
          // if user has email and user's email not verified
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email,
            });

            if (oldVerification) {
              oldVerification.remove();
            }

            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL",
            }).save();

            await sendVerificationEmail(user.fullName, newVerification.key);

            return {
              ok: true,
              error: null,
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          // if user has not email
          return {
            ok: false,
            error: "Your user has no email.",
          };
        }
      }
    ),
  },
};

export default resolvers;
