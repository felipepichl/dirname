import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
) {}
