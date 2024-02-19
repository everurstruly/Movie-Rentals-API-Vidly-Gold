import * as express from "express";

const contentRatingRouter = express.Router();
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

contentRatingRouter
  .route("/")
  .get(placeholderRouteHanlder("getAllContentRating"))
  .post(placeholderRouteHanlder("createNewContentRating"));

contentRatingRouter
  .route("/:contentRatingId")
  .get(placeholderRouteHanlder("getOneContentRating"))
  .patch(placeholderRouteHanlder("updateOneContentRating"))
  .delete(placeholderRouteHanlder("deleteOneContentRating"));

export default contentRatingRouter;
