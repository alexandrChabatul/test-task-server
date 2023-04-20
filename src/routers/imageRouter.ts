import * as express from 'express';
import { ImageController } from '../controllers/imageController';
import authMiddleware from '../middleware/auth-middleware';
import multer from 'multer';

const imageRouter = express.Router();
const controller = new ImageController();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

imageRouter.post('/', [authMiddleware, upload], controller.saveImage);

export default imageRouter;
