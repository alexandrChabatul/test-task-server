import * as express from 'express';
import { check } from 'express-validator';
import UsersController from '../controllers/usersController';
import authMiddleware from '../middleware/auth-middleware';

const usersRouter = express.Router();
const controller = new UsersController();

usersRouter.get('/', authMiddleware, controller.getUsers.bind(controller));
usersRouter.post(
  '/',
  [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email must match the pattern'),
    check('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name should not be empty'),
    check('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name should not be empty'),
    check('image')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Image should be URL'),
    authMiddleware,
  ],
  controller.createUser.bind(controller)
);
usersRouter.get(
  '/:id',
  authMiddleware,
  controller.getUserById.bind(controller)
);
usersRouter.put(
  '/:id',
  [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email must match the pattern'),
    check('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name should not be empty'),
    check('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name should not be empty'),
    check('image')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Image should be URL'),
    authMiddleware,
  ],
  controller.updateUser.bind(controller)
);
usersRouter.delete(
  '/:id',
  authMiddleware,
  controller.deleteUser.bind(controller)
);
usersRouter.post(
  '/pdf',
  [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email must match the pattern'),
    authMiddleware,
  ],
  controller.generatePdf.bind(controller)
);

export default usersRouter;
