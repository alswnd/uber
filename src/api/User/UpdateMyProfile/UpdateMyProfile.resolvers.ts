import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull = {};

        // exclude null value.
        Object.keys(args).forEach((key) => {
          if (args[key] !== null) {
            notNull[key] = args[key];
          }
        });

        try {

          // for password updating hashed
          if (args.password !== null) {
            user.password = args.password;
            user.save();
          }

          /**
           * it doesnt have user instance.
           * it just find user with id and update object @notNull
           * so @BeforeInsert and @BeforeUpdate not called,
           * causing password not hashed.
           */
          await User.update({ id: user.id }, { ...notNull });

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
      }
    ),
  },
};

export default resolvers;
