import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import authService from '../services/authService';
import ValidationService from '../services/ValidationService';

/* eslint consistent-return: 0 */
export default class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      ValidationService.handleValidationResult(errors);
      const { email, password } = req.body;
      const data = await authService.signup(email, password);
      return res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      ValidationService.handleValidationResult(errors);
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}
