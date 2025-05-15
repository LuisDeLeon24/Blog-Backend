import { Router } from "express";
import {createPublication, getPublications, updatePublication, deletePublication,searchPublication,getPublicationsByCat } from "./publications.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.post("/postPublication/", 
    [
        check("title", "El título es obligatorio").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("category", "Categoría no válida").isIn(["Practica_Supervisada", "Taller", "Tecnologia"]),
        validarCampos,
    ],
    createPublication
);
router.get("/getPublications/", getPublications);

router.put("/updatePublication/:id", 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],
    updatePublication
);
router.delete("/deletePublication/:id", 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],    
    deletePublication
);
router.get("/searchPublication/:id", 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],    
    searchPublication
);
router.get("/getPublicationsByCat/:category", 
    [
        check("category", "Categoría no válida").isIn(["Practica_Supervisada", "Taller", "Tecnologia"]),
        validarCampos,
    ],    
    getPublicationsByCat
);

export default router;
