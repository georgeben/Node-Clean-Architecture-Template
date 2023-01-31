import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import helmet from "helmet";
import errorHandler from "interfaces/http/middleware/errorHandler";
import morgan from "morgan";
import error404 from "../middleware/notFoundHandler";
import v1Routes from "./v1";

/**
 * Configures express middlewares
 */
export default ({ config, containerMiddleware }) => {
  const router = Router();
  router.use(helmet());
  const NODE_ENV = config.get("app.env");
  router.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

  const bodyLimit = config.get("app.bodyLimit");
  router.use(
    bodyParser.json({
      limit: bodyLimit,
    }),
  );
  router.use(bodyParser.urlencoded({ extended: false, limit: bodyLimit }));

  // Setup CORS
  const allowedOrigins = config.get("app.allowedOrigins");
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === "*") {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(",");
          if (origins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`), false);
          }
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );

  // https://www.npmjs.com/package/awilix-express
  router.use(containerMiddleware);

  router.get("/", (req, res) => res.json({
    message: "Sample API template using Clean Architecture",
  }));

  router.use("/v1", v1Routes);

  router.use(error404);

  router.use(errorHandler);

  return router;
};
