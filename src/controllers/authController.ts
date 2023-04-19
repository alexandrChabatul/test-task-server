import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import ValidationService from '../services/ValidationService';
import authService from 'src/services/authService';

/* eslint consistent-return: 0 */
export default class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      ValidationService.handleValidationResult(errors);
      const { email, password, firstName, lastName, image } = req.body;
      const data = await authService.signup(email, password, firstName, lastName, image);
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
