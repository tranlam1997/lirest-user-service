import { ResultResponse } from "@src/shared/response-format";
import { Request, Response } from "express";

export default (_req: Request, res: Response) => {
  return ResultResponse.error(res, {
    statusCode: 404,
    response: {
      message: "Not found resource or api",
    },
  });
};