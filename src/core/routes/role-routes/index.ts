import * as express from "express";

const roleRouter = express.Router();
const placeholderRouteHanlder = (routePurpose: string): any => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res.json({ message: routePurpose });
    return next();
  };
};

roleRouter
  .route("/")
  .get(placeholderRouteHanlder("getAllRole"))
  .post(placeholderRouteHanlder("createNewRole"));

roleRouter
  .route("/:roleId")
  .get(placeholderRouteHanlder("getOneRole"))
  .patch(placeholderRouteHanlder("updateOneRole"))
  .delete(placeholderRouteHanlder("deleteOneRole"));

export default roleRouter;
