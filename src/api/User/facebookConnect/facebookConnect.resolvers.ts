import { Resolvers } from "../../../types/resolvers";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Query: {
    user: (parent, args, context) => {
      console.log(context.req.user);

      return "";
    },
  },
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        /**
         * @const existingUser
         * @description check if the facebook id already exists
         * @method findOne() : method in BaseEntity
         * @returns User | undefined
         */
        const existingUser = await User.findOne({ fbId });

        // if the user already exists
        if (existingUser) {
          const token = createJWT(existingUser.id);

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

      /**
       * @description if the user is new one, create new user.
       * the reason why it is outside of above try {}, it is because so complex.
       */
      try {
        /**
         * @param ...args : get all arguments. it contains firstName, lastName, fbID...
         *
         * @method create() : method in BaseEntity
         * @returns User | undefined
         *
         * @method save() : method in BaseEntity
         */
        const newUser = await User.create({
          ...args,
          profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();

        const token = createJWT(newUser.id);

        return {
          ok: true,
          error: null,
          token,
        };
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
