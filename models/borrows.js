import Sequelize from 'sequelize';
import {sequelize} from "../db/dbConnect.js";

const Borrows = sequelize.define('borrows', {
    borrowid: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    memberid: {
      type: Sequelize.STRING(255),
      allowNull: false,
      references: {
        model: 'members',
        key: 'memberid'
      }
    },
    titleid: {
      type: Sequelize.STRING(255),
      allowNull: false,
      references: {
        model: 'books',
        key: 'bookid'
      }
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    returndate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: false
    },
    returned: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'borrows',
    timestamps: true,
    createdAt: 'borrowdate',
    updatedAt: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "memberid" },
        ]
      },
      {
        name: "fk_borrows_1",
        using: "BTREE",
        fields: [
          { name: "memberid" },
        ]
      },
      {
        name: "fk_borrows_2",
        using: "BTREE",
        fields: [
          { name: "titleid" },
        ]
      },
    ]
  });
export default Borrows
