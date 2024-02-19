import * as express from "express";

const rentalRouter = express.Router();
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

rentalRouter
  .route("/")
  .get(placeholderRouteHanlder("getAllRental"))
  .post(placeholderRouteHanlder("createNewRental"));

rentalRouter
  .route("/:rentalId")
  .get(placeholderRouteHanlder("getOneRental"))
  .patch(placeholderRouteHanlder("updateOneRental"))
  .delete(placeholderRouteHanlder("deleteOneRental"));

export default rentalRouter;
