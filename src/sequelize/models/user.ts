import { Model, Optional, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/config';

type UserAttributes = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  pdf: Buffer;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  image: string;

  pdf: Buffer;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  static associate(models) {
    // define association here
  }
}
User.init(
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdf: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'User',
  }
);

export default User;
