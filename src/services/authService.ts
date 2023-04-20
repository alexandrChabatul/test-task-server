import bcrypt from 'bcrypt';
import ApiError from '../errors/ApiError';
import { AuthResponse } from '../payload/response/AuthResponse';
import TokenService from './tokenService';
import Admin from '../sequelize/models/admin';
import AdminDto from '../dto/AdminDto';

class AuthService {
  async signup(email: string, password: string) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashPassword,
      },
    });
    if (!created) {
      throw ApiError.BadRequest('User with this email already exists.');
    }
    return new AdminDto(admin);
  }

  async login(email: string, password: string) {
    const admin: Admin | null = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw ApiError.NotFound(`Admin ${email} not found.`);
    }
    const isPassEquals = await bcrypt.compare(password, admin.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password');
    }
    const data = await this.getToken(admin);
    return data;
  }

  async getToken(admin: Admin): Promise<AuthResponse> {
    const adminDto = new AdminDto(admin);
    const accessToken = TokenService.generateToken({ ...adminDto });
    return {
      accessToken,
      admin: adminDto,
    };
  }
}

export default new AuthService();
