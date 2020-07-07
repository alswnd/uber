import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

// ACCEPTED
// FINISHED
// CANCELED
// REQUESTING
// ONROUTE

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;

        if (user.isDriving) {
          try {
            let ride: Ride | undefined;

            // if requested status is ACCEPTED
            if (args.status === "ACCEPTED") {
              // find ride with status REQUESTING
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  status: "REQUESTING",
                },
                { relations: ["passenger"] }
              );

              // if ride found
              if (ride) {
                // assign driver to ride
                ride.driver = user;

                // user accepted Ride, so.. taken
                user.isTaken = true;
                user.save();

                // create chat room when driver accept a Ride
                const chat = await Chat.create({
                  driver: user,
                  passenger: ride.passenger,
                }).save();

                ride.chat = chat;
                ride.save();
              }

              // if requested status is other else,
            } else {
              ride = await Ride.findOne({
                id: args.rideId,
                driver: user, // only can be changed by current driver
              });
            }

            if (ride) {
              // and change ride's status
              ride.status = args.status;
              ride.save();

              // publish to channel when ride update
              pubSub.publish("rideUpdate", { RideStatusSubscription: ride });

              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "No Ride found",
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving",
          };
        }
      }
    ),
  },
};

export default resolvers;
