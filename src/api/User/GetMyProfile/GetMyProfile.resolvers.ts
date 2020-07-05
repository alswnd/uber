import { Resolvers } from "src/types/resolvers";

const resolvers: Resolvers = {
  Query: {
      // {req} in context
    GetMyProfile: async (_, __, { req }) => {
      const { user } = req;

      return {
        ok: true,
        error: null,
        user,
      };
    },
  },
};
export default resolvers;
