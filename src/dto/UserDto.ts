import User from '../sequelize/models/user';

export default class UserDto {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  image: string | undefined;

  /* eslint no-underscore-dangle: 0 */
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.image = user.image;
  }
}
