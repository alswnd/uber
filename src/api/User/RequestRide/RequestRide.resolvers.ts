import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideMutationArgs,
  RequestRideResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;

        try {
          // create new ride, dont forget put user
          const ride = await Ride.create({ ...args, passenger: user }).save();

          return {
            ok: true,
            ride,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            ride: null,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
