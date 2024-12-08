import { Request, Response, Router } from "express";

import LedController from "./controllers/led.controller";

export default class AppRouter {
  public router: Router;

  private LedController: LedController;

  constructor() {
    this.router = Router();
    this.LedController = new LedController();

    this.initialize();
  }

  private initialize(): void {
    this.router.get("/health", (_req: Request, res: Response) =>
      res.send("Service OK!")
    );

    this.router.get("/led", this.LedController.status);
    this.router.post("/led/toggle", this.LedController.toggle);
  }
}
