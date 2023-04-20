import User from '../sequelize/models/user';
import UserDto from '../dto/UserDto';
import ApiError from '../errors/ApiError';
import PdfService from './pdfService';

export type AuthApiResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
};

class UserService {
  async findAllUsers() {
    return User.findAll();
  }

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    image: string | undefined = ''
  ) {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        firstName,
        lastName,
        image,
      },
    });
    if (!created) {
      throw ApiError.BadRequest('User with this email already exists.');
    }
    return user;
  }

  async findUserById(id: number) {
    const potentialUser = await User.findOne({ where: { id } });
    if (!potentialUser) {
      throw ApiError.NotFound(`Cannot find user with id - ${id}`);
    }
    return potentialUser;
  }

  async updateUser(
    email: string,
    firstName: string,
    lastName: string,
    image: string | undefined = '',
    id: number
  ) {
    await User.update(
      {
        email,
        firstName,
        lastName,
        image,
      },
      { where: { id } }
    );
  }

  async deleteUser(id: number) {
    await User.destroy({ where: { id } });
  }

  async generatePdf(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      const pdfBytes = await PdfService.generatePdf(user);
      const buffer = Buffer.from(pdfBytes);
      await User.update(
        {
          pdf: buffer,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new UserService();
