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
      type: DataTypes.STRING, 
      allowNull: false
    },
    background_image:{
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGYs5ROA0wiJXB-JgeRYWih8WV4owxsjhyq0CudE6wyiYDy-d_Zx3PFkaKBHa2me8PNuM&usqp=CAU",
      validate:{
        isUrl: true,
      }
    },
  },{
    freezeTableName: true,
    timestamps: false
  });
};
