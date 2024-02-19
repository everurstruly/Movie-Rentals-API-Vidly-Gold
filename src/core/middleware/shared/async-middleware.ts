import { Request, Response, NextFunction } from 'express';

export default function (
  middlewareFn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middlewareFn(req, res, next);
    } catch (error: any) {
      return next(error);
    }
  };
}
