import { Request, Response, NextFunction } from 'express';

export const corsErrorsHandler = () => {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    next(error);
  };
};
