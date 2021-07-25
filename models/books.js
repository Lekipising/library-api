import Sequelize from "sequelize";
import {sequelize} from "../db/dbConnect.js";

const Books = sequelize.define('books', {
    bookid: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

  }, {
    sequelize,
    tableName: 'books',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bookid" },
        ]
      },
    ]
  });
export default Books
