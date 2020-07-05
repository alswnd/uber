import { Resolvers } from "../../../types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "src/types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _, // parent
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;

      try {
        /**
         * @const existingVerification
         * @value Verification object | undefined
         */
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });

        if (existingVerification) {
          /**
           * @method remove() : in BaseEntity
           */
          existingVerification.remove();
        }

        const newVerification = await Verification.create({
          /**
           * below @object is required to create new Verification object.
           * @refer Verification.ts
           */
          payload: phoneNumber,
          target: "PHONE",
        }).save();

        // test
        console.log(newVerification);

        /**
         * send verification code
         */
        await sendVerificationSMS(newVerification.payload, newVerification.key);

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
    },
  },
};

export default resolvers;
