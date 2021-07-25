import Sequelize from 'sequelize';
import {sequelize} from "../db/dbConnect.js";

const Members = sequelize.define('members', {
    memberid: {
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
    tableName: 'members',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "memberid" },
        ]
      }
    ]
  });
export default Members
