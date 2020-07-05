import { Resolvers } from "../../../types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "src/types/graph";
import Verification from "src/entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _, // parent
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;

      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });

        if (existingVerification) {
            existingVerification.remove();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
