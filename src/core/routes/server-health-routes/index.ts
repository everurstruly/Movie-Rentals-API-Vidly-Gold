import express from 'express';
import { getHealthCheck } from 'src/core/controllers/server-health-controller';

export const serverHealthRouter = express.Router();
serverHealthRouter.use(getHealthCheck);
