import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
import { UserTypeModel } from '@models/userType.model';
export type UserCreationAttributes = Optional<User, 'id' | 'phoneNumber' | 'name' | 'userType'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public phoneNumber: string;
  public name: string;
  public userType: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      userType: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
          model: UserTypeModel,
          key: 'id',
        },
      },
      createdAt: {
        type: 'TIMESTAMP WITH TIME ZONE',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP WITH TIME ZONE',
        defaultValue: sequelize.fn('NOW'),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
