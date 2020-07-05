import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignUpResponse,
  EmailSignUpMutationArgs,
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";

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
          const newUser = await User.create({ ...args }).save();

          const token = createJWT(newUser.id);

          return {
            ok: true,
            error: null,
            token,
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
