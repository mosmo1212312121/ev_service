import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserType } from '@interfaces/userType.interface';

export type UserCreationAttributes = Optional<UserType, 'id' | 'roleName'>;

export class UserTypeModel extends Model<UserType, UserCreationAttributes> implements UserType {
  public id: number;
  public roleName: string;
}

export default function (sequelize: Sequelize): typeof UserTypeModel {
  UserTypeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roleName: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: false,
      tableName: 'user_type',
      sequelize,
    },
  );

  return UserTypeModel;
}
