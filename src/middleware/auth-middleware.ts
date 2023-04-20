import { NextFunction, Request, Response } from 'express';
import { RequestWithAdmin } from '../payload/request/requestWithUser';
import UserDto from '../dto/UserDto';
import ApiError from '../errors/ApiError';
import TokenService from '../services/tokenService';

/* eslint-disable  consistent-return */
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.replace('Bearer ', '');
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const data = TokenService.validateAccessToken<UserDto>(accessToken);
    if (!data) {
      return next(ApiError.UnauthorizedError());
    }
    (req as RequestWithAdmin).admin = data;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
/* eslint-enable  consistent-return */
