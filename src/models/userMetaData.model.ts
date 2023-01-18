import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserMetaData } from '@interfaces/userMetaData.interface';

export type UserCreationAttributes = Optional<UserMetaData, 'userId' | 'metaDataId'>;

export class UserMetaDataModel extends Model<UserMetaData> implements UserMetaData {
  public userId: number;
  public metaDataId: number;
  public value: string;
}

export default function (sequelize: Sequelize): typeof UserMetaDataModel {
  UserMetaDataModel.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      metaDataId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },

    {
      timestamps: false,
      tableName: 'user_meta_data',
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'meta_data_id'],
        },
      ],
    },
  );

  return UserMetaDataModel;
}
