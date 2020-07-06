const resolvers = {
  Subscription: {
    /**
     * DriversSubscription will pass us User
     */
    DriversSubscription: {
      /**
       * subscribe new changes
       *
       * @returns {instance} pubSub
       */
      subscribe: (_, __, { pubSub }) => {
        /** 
         * "driverUpdate" is channel name
         * if there is a publish to this channel, ...
         */ 
        return pubSub.asyncIterator("driverUpdate");
      },
    },
  },
};

export default resolvers;
