import { placeholderMiddleware } from 'src/common/plugins/express/api-prototyping';

export const requestRateLimiter = () => {
  return placeholderMiddleware('Limit request rate');
};
