import * as express from "express";

const movieRouter = express.Router();
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

movieRouter
  .route("/")
  .get(placeholderRouteHanlder("getAllMovie"))
  .post(placeholderRouteHanlder("createNewMovie"));

movieRouter.route("/genres").get(placeholderRouteHanlder("getAllMovieGenre"));

movieRouter
  .route("/:movieId")
  .get(placeholderRouteHanlder("getOneMovie"))
  .patch(placeholderRouteHanlder("updateOneMovie"))
  .delete(placeholderRouteHanlder("deleteOneMovie"));

export default movieRouter;
