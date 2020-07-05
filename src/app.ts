import { GraphQLServer } from "graphql-yoga";
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
  private jwt = async (req, res, next): Promise<void> => {
    /**
     * @name X-JWT name is custom.
     */
    const token = req.get("X-JWT");

    if (token) {
      const user = await decodeJWT(token);
      console.log(user);
    }

    // go to next middleware
    next();
  };
}

export default new App().app;
