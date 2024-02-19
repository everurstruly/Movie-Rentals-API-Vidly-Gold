import { Request, Response, NextFunction } from 'express';

export const placeholderRouteHanlder = (routePurpose: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      expected: routePurpose,
      reason: 'implementation under construction',
    });
  };
};

export const placeholderMiddleware = (middlewarePurpose: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(
      JSON.stringify(
        {
          url: req.url,
          message: middlewarePurpose,
        },
        null,
        1
      )
    );

    return next();
  };
};
