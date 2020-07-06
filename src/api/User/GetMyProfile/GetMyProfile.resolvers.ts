import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    /**
     * we are not calling resolver starts with async.
     * but calling privateResolver.
     * so if privateResolver not throw an error(if user exists),
     * then privateResolver returns resolver starts with async.
     */
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;

      return {
        ok: true,
        error: null,
        user,
      };
    }),
  },
};
export default resolvers;
