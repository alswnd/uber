import { GraphQLServer } from "graphql-yoga";
import { NextFunction, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decode.JWT";

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema,

      /**
       * @name context
       * we can pass context(including object, function, ...)
       * when create server
       * it can be used in all resolvers.ts by parameter context.
       */
      context: (req) => {
        return {
          req: req.request,
        };
      },
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  /**
   *
   * @param req header
   * @param res express gives
   * @param next express gives
   */
  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    /**
     * @name X-JWT name is custom.
     */
    const token = req.get("X-JWT");

    if (token) {
      // this user object will pass through all middleware to final graphql server.
      // because express is in graphql server.
      const user = await decodeJWT(token);

      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }

    // go to next middleware
    next();
  };
}

export default new App().app;
