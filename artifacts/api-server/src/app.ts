import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

type PinoHttpFactory = (opts: {
  logger: typeof logger;
  serializers?: {
    req?: (req: IncomingMessage & { id?: unknown }) => object;
    res?: (res: ServerResponse) => object;
  };
}) => express.RequestHandler;

app.use(
  (pinoHttp as unknown as PinoHttpFactory)({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
