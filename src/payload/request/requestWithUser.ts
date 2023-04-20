import { Request } from 'express';
import AdminDto from '../../dto/AdminDto';

export interface RequestWithAdmin extends Request {
  admin: AdminDto;
}
