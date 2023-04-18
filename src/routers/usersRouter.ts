import * as express from 'express';
import UsersController from 'src/controllers/usersController';
import authMiddleware from '../middleware/auth-middleware';

const usersRouter = express.Router();
const controller = new UsersController();

usersRouter.get('/', authMiddleware, controller.getUsers );
usersRouter.post('/', authMiddleware, controller.createUser);
usersRouter.get('/:id', authMiddleware, controller.getUserById);
usersRouter.put('/:id', authMiddleware, controller.updateUser);
usersRouter.delete('/:id', authMiddleware, controller.deleteUSer);
usersRouter.post('/:id/image', authMiddleware, controller.addImage);
usersRouter.post('/:id/pdf', authMiddleware, controller.generatePdf);

export default usersRouter;
