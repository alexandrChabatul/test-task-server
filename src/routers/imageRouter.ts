import * as express from 'express';
import { ImageController } from '../controllers/imageController';
import authMiddleware from '../middleware/auth-middleware';

const usersRouter = express.Router();
const controller = new ImageController();

usersRouter.post('/', authMiddleware, controller.saveImage);

export default usersRouter;
