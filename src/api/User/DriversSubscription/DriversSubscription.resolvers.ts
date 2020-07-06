import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    /**
     * DriversSubscription will pass us User
     */
    DriversSubscription: {
      /**
       * subscribe new changes
       *
       * @param {function} asyncIteratorFn channel
       * @param {function} filterFn if filterFn return true, send result to user who is listening.
       * @returns {instance} pubSub
       */
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        // context that we put in app.ts
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng,
            },
          } = payload;

          // get lastLat with userLastLat.
          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;

// /**
//  * "driverUpdate" is channel name
//  * if there is a publish to this channel, ...
//  */
// return pubSub.asyncIterator("driverUpdate");
