import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  CompletPhoneNumberVerificationMutationArgs,
  CompleteEmailVerificationResoponse,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompletPhoneNumberVerificationMutationArgs, // args has key
        { req }
      ): Promise<CompleteEmailVerificationResoponse> => {
        const user: User = req.user;
        const { key } = args;

        if (user.email) {
          // if user has email
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email,
            });

            if (verification) {
              // user verified
              user.verifiedEmail = true;
              user.save();

              return {
                ok: true,
                error: null,
              };
            } else {
              // user not verified
              return {
                ok: false,
                error: "Cant verify email",
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          // user has not email
          return {
            ok: false,
            error: "No email to verify",
          };
        }
      }
    ),
  },
};

export default resolvers;
