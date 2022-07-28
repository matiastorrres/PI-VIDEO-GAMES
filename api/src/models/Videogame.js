const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate:{
        isUUID: 4,
      }
    },
    released:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      validate:{
        isDate: true,
      }

    },
    rating:{
      type: DataTypes.FLOAT,
      validate:{
        min:0,
        max:10,
        isNumeric: true
      }   
    },
    platforms:{
      type: DataTypes.JSON, 
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT, 
      allowNull: false
    },
    background_image:{
      type: DataTypes.STRING,
      validate:{
        isUrl: true,
      }
    },
  },{
    freezeTableName: true,
    timestamps: false
  });
};
