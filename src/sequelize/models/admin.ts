import { Model, Optional, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/config';

type AdminAttributes = {
  id: number;
  email: string;
  password: string;
};

type AdminCreationAttributes = Optional<AdminAttributes, 'id'>;

class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  id: number;

  email: string;

  password: string;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  static associate(models) {
    // define association here
  }
}
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Admin',
  }
);

export default Admin;
