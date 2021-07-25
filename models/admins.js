import Sequelize from 'sequelize';
import {sequelize} from "../db/dbConnect.js";

const Admins = sequelize.define('admins', {
  adminid: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'admins',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "adminid" },
      ]
    }
  ]
});
export default Admins
