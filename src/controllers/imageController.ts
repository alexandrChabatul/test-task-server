import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import { MulterRequest } from '../payload/request/multerRequest';
import imageService from '../services/imageService';

export class ImageController {
  saveImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req as MulterRequest;
      if (!file) {
        return ApiError.BadRequest('Image is required.');
      }
      imageService.saveImage(file);
    } catch (e) {
      next(e);
    }
  }
}
