import { Resolvers } from "../../../types/resolvers";
import {
  CompletPhoneNumberVerificationResponse,
  CompletPhoneNumberVerificationMutationArgs,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletPhoneNumberVerification: async (
      _,
      args: CompletPhoneNumberVerificationMutationArgs
    ): Promise<CompletPhoneNumberVerificationResponse> => {
      const { phoneNumber, key } = args;

      try {
        // find verification with phone number
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });

        // if verification not exists
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not valid",
            token: null,
          };
        } else {
          verification.verified = true;
          verification.save();
        }

        // if verification exists, return nothing so continue at below try{}
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      //if verification exists
      try {
        const user = await User.findOne({ phoneNumber });

        if (user) {
          // when user exists
          user.verifiedPhoneNumber = true;
          user.save();

          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          // phonenumber verified and user not exists
          return {
            ok: true,
            error: null,
            token: null,
          };
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
