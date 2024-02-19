import asyncRouteHandler from 'src/core/middleware/shared/async-middleware';

export const getHealthCheck = asyncRouteHandler(async (req, res, next) => {
  res.kit.formatter.send.OK();
});
