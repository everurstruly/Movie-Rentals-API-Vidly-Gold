import asyncMiddleware from '../shared/async-middleware';
import { NotFoundErrorBuilder } from '../../errors/http-errors';

export const resourceNotFound = () => {
  return asyncMiddleware(async (req, res) => {
    NotFoundErrorBuilder().use();
  });
};
