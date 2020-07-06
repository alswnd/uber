import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { EditPlaceResponse, EditPlaceMutationArgs } from "../../../types/graph";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;

        try {
          /**
           * dont give @relations option, because we have declared in Place entity
           * @relations option query database for all of user datas.
           */

          const place = await Place.findOne({ id: args.placeId });

          if (place) {
            // place.userId was input by typeorm
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args);

              await Place.update({ id: args.placeId }, { ...notNull });

              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Not authorized",
              };
            }
          } else {
            return {
              ok: false,
              error: `Place ${args.placeId} not found.`,
            };
          }
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
