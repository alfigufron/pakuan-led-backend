import { ErrorHandler, HttpResponse } from "@config/http";
import { NextFunction, Request, Response } from "express";

export default class LedController {
  private ledStatus = false;

  status = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return HttpResponse.success(res, "Toggle LED Successfully!", {
        status: this.ledStatus,
      });
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };

  toggle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.query;

      if (!["0", "1"].includes(status as string))
        throw new ErrorHandler("Invalid value status");

      this.ledStatus = status === "0" ? false : true;

      return HttpResponse.success(res, "Toggle LED Successfully!", null);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };
}
