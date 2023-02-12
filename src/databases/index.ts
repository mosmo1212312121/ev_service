import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import UserTypeModel from '@models/userType.model';
import MetaDataModel from '@models/metaData.model';
import UserMetaDataModel from '@/models/userMetaData.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: 5432,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});
// const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   port: 5432,
//   dialect: 'postgres',
//   // ...baseOption,
// });

logger.info('Connecting to database...');
sequelize.authenticate();

// try {
const DB = {
  UserMetaData: UserMetaDataModel(sequelize),
  UserType: UserTypeModel(sequelize),
  MetaData: MetaDataModel(sequelize),
  Users: UserModel(sequelize),
  // MetaData: MetadataModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
try {
  DB.UserType.hasMany(DB.Users, { foreignKey: 'user_type', as: 'user' });
  DB.Users.belongsTo(DB.UserType, { foreignKey: 'user_type', as: 'user_type_data' });

  DB.MetaData.hasMany(DB.UserMetaData, { foreignKey: 'meta_data_id', as: 'meta_data' });
  DB.UserMetaData.belongsTo(DB.MetaData, { foreignKey: 'meta_data_id', as: 'user_meta_data' });

  DB.Users.hasMany(DB.UserMetaData, { foreignKey: 'user_id', as: 'user_meta_data' });
  DB.UserMetaData.belongsTo(DB.Users, { foreignKey: 'user_id', as: 'user' });
} catch (e) {
  logger.info(e);
}
export default DB;
