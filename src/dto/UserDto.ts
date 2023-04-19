import User from 'src/sequelize/models/user';

export default class UserDto {
  id;

  email;

  firstName;

  lastName;

  /* eslint no-underscore-dangle: 0 */
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
