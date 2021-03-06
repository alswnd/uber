import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;

      try {
        const user = await User.findOne({ email });

        // if user not exists.
        if (!user) {
          return {
            ok: false,
            error: "No User with that email",
            token: null,
          };
        }

        /**
         * Password Compare
         * @method comparePassword()
         * @params password : in args
         * @returns boolean
         */
        const checkPassword = await user.comparePassword(password);

        // user input password verified
        if (checkPassword) {
          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "Wrong Password",
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
