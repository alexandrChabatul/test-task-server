import jwt from 'jsonwebtoken';
import AdminDto from '../dto/AdminDto';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class TokenService {
  generateToken(payload: AdminDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: '24h',
    });
    return accessToken;
  }

  validateAccessToken<T>(token: string): T | null {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as T;
      return data;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
