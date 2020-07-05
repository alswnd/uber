import { Resolvers } from "../../../types/resolvers";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from "src/types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
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
          return {
            ok: true,
            error: null,
            token: "" /** @todo */,
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
        await User.create({
          ...args,
          profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();

        return {
          ok: true,
          error: null,
          token: "" /** @todo */,
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
