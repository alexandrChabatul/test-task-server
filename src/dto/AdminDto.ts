import Admin from '../sequelize/models/admin';

export default class AdminDto {
  id: number;

  email: string;

  /* eslint no-underscore-dangle: 0 */
  constructor(admin: Admin) {
    this.id = admin.id;
    this.email = admin.email;
  }
}
