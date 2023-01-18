import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MetaData } from '@interfaces/metaData.interface';

// export type UserCreationAttributes = Optional<MetaData, 'id' | 'roleName'>;

export class MetaDataModel extends Model<MetaData> implements MetaData {
  public key: string;
}

export default function (sequelize: Sequelize): typeof MetaDataModel {
  MetaDataModel.init(
    {
      key: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: false,
      tableName: 'meta_data',
      sequelize,
    },
  );

  return MetaDataModel;
}
