import db from '../sequelize/models';
import bcrypt from 'bcrypt';
import ApiError from '../errors/ApiError';
import User from 'src/sequelize/models/user';
import { AuthResponse } from 'src/payload/response/AuthResponse';
import UserDto from 'src/dto/UserDto';
import TokenService from './tokenService';

class AuthService {
  async signup(email: string, password: string, firstName: string, lastName: string, image: string | undefined) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email, password: hashPassword, firstName, lastName, image
      }
    });
    if (!created) {
      throw ApiError.BadRequest('User with this email already exists.');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user: User | null = await db.User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.NotFound(`User ${email} not found.`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password');
    }
    const data = await this.getToken(user);
    return data;
  }

  async getToken(user: User): Promise<AuthResponse> {
    const userDto = new UserDto(user);
    const accessToken = TokenService.generateToken({ ...userDto });
    return {
      accessToken,
      user: userDto,
    };
  }
}

export default new AuthService();
