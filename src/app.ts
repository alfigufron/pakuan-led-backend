import express, { Application } from "express";
import { Logger } from "winston";
import helmet from "helmet";

import LoggerManager from "@utilities/logger";
import AppRouter from "@app/routes";

import "reflect-metadata";
import { HTTPMiddleware } from "@global/middleware/http.middleware";

class Server {
  private app: Application;
  private port: number;
  private appLogger: Logger = LoggerManager.getInstance().get("app");
  private appRouter: AppRouter;
  private httpMiddleware: HTTPMiddleware;

  constructor() {
    this.app = express();
    this.port = 5050;
    this.appRouter = new AppRouter();
    this.httpMiddleware = new HTTPMiddleware();

    try {
      this.initMiddleware();
      this.initRoutes();
    } catch (error) {
      process.exit(1);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.clear();
      this.appLogger.info(
        `Server Running at http://localhost:${this.port}/ or http://127.0.0.1:${this.port}/`
      );
    });
  }

  private initMiddleware() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
    this.app.use(this.httpMiddleware.requestHandler);
    this.app.use("/api", this.appRouter.router);
    this.app.use(this.httpMiddleware.errorHandler);
  }
}

const server = new Server();
server.start();
