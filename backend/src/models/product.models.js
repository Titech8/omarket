import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


    const Product = sequelize.define("Product", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        prix:{
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        categorie:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        images:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });


export default Product;