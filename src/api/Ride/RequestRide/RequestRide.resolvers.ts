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
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;

        // user is not riding now
        if (!user.isRiding) {
          try {
            // create new ride, dont forget put user
            const ride = await Ride.create({ ...args, passenger: user }).save();

            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });

            user.isRiding = true;
            user.save();

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
        } else {
          return {
            ok: false,
            error: "You are already riding",
            ride: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
