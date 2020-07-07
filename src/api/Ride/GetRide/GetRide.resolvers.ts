import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetRideResponse, GetRideQueryArgs } from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;

        try {
          const ride = await Ride.findOne(
            {
              id: args.rideId,
            }

            /**
             * without relations, passenger and driver object would be undefined
             * but, this is heavy task for database
             * because it has to find User and attach
             * so we add Column to Ride entity
             */
            // { relations: ["passenger", "driver"] }
          );
          if (ride) {
            // current user is whatever passenger or driver
            // if (ride.passenger.id === user.id || ride.driver.id === user.id) {
            if (ride.passengerId === user.id || ride.driverId === user.id) {
                return { ok: true, error: null, ride };
            } else {
              return { ok: false, error: "Not authorized", ride: null };
            }
          } else {
            return { ok: false, error: "Ride not found", ride: null };
          }
        } catch (error) {
          return { ok: false, error: error.message, ride: null };
        }
      }
    ),
  },
};

export default resolvers;
