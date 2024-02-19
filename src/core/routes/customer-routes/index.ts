import * as express from "express";

const customerRouter = express.Router();
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

customerRouter
  .route("/")
  .get(placeholderRouteHanlder("getAllCustomer"))
  .post(placeholderRouteHanlder("createNewCustomer"));

customerRouter
  .route("/memberships")
  .get(placeholderRouteHanlder("getAllCustomerMembership"));

customerRouter
  .route("/:customerId")
  .get(placeholderRouteHanlder("getOneCustomer"))
  .patch(placeholderRouteHanlder("updateOneCustomer"))
  .delete(placeholderRouteHanlder("deleteOneCustomer"));

export default customerRouter;
