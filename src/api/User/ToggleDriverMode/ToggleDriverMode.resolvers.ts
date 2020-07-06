import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { ToggleDriverModeResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDriverMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDriverModeResponse> => {
        const user: User = req.user;

        /**
         * @description
         * this no need try, catch because we dont user await
         */

        // toggle
        user.isDriving = !user.isDriving;
        user.save();

        return {
          ok: true,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
