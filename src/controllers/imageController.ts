import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import { MulterRequest } from '../payload/request/multerRequest';
import imageService from '../services/imageService';

export class ImageController {
  async saveImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req as MulterRequest;
      if (!file) {
        throw ApiError.BadRequest('Image is required.');
      }
      const imageUrl = await imageService.saveImage(file);
      return res.json({ imageUrl });
    } catch (e) {
      next(e);
    }
  }
}
