import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/userService';
import ValidationService from '../services/ValidationService';
import userService from '../services/userService';

export default class UsersController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAllUsers();
      return res.json(users);
    } catch (e) {
      return next(e);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      ValidationService.handleValidationResult(errors);
      const { email, firstName, lastName, image } = req.body;
      const data = await userService.createUser(
        email,
        firstName,
        lastName,
        image
      );
      return res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.findUserById(id);
      return res.json(user);
    } catch (e) {
      return next(e);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, firstName, lastName, image } = req.body;
      const id = Number(req.params.id);
      await UserService.updateUser(email, firstName, lastName, image, id);
      return res.status(200).end();
    } catch (e) {
      return next(e);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await UserService.deleteUser(id);
      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  }

  async generatePdf(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      ValidationService.handleValidationResult(errors);
      const { email } = req.body;
      const result = await userService.generatePdf(email);
      return res.json({ result });
    } catch (e) {
      return next(e);
    }
  }
}
