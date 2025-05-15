'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authCategories from '../src/Category/category.routes.js';
import Category from '../src/Category/category.model.js';
import authPost from '../src/Publications/publications.routes.js'
import authComments from '../src/comments/comments.routes.js';


const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
    app.use("/Blog/v1/categories",authCategories);
    app.use("/Blog/v1/publications",authPost);
    app.use("/Blog/v1/comments",authComments);
}

const Categorias = async () => {
    const defaultCategories = ["Tecnologia", "Taller", "Practica_Supervisada"];
  
    try {
      for (const name of defaultCategories) {
        const existing = await Category.findOne({ name });
        if (!existing) {
          await Category.create({ name });
          console.log(`Categoría creada por defecto: ${name}`);
        } else {
          console.log(`Categoría ya existente: ${name}`);
        }
      }
    } catch (error) {
      console.error("Error al inicializar categorías por defecto:", error);
    }
  };


const conectarDB = async () => {
    try {
        await dbConnection();
        await Categorias(); 
        console.log("Conexion Exitosa Con La Base De Datos");
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}


export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3010;

    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}