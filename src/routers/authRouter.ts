import * as express from 'express';
import { check } from 'express-validator';
import AuthController from 'src/controllers/AuthController';

const authRouter = express.Router();
const controller = new AuthController();

authRouter.post(
  '/signup',
  [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email must match the pattern'),
    check('password')
      .notEmpty()
      .withMessage('Password should not be empty')
      .bail()
      .isString()
      .withMessage('Password should be string')
      .bail()
      .isLength({ min: 6 })
      .withMessage('Password length must be at least 6 characters'),
    check('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name should not be empty'),
    check('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name should not be empty'),
    check('image').isString(),
  ],
  controller.signup
);
authRouter.post(
  '/login',
  [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email must match the pattern'),
    check('password')
      .notEmpty()
      .withMessage('Password should not be empty')
      .bail()
      .isString()
      .withMessage('Password should be string')
  ],
  controller.login
);

export default authRouter;
