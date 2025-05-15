import { Router } from 'express';
import { check } from 'express-validator';
import { getComments, creatComment } from './comments.controller.js';
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get('/getComments/', getComments);

router.post(
    "/postComments/",
    [
        check("author", "El autor es obligatorio").not().isEmpty(),
        check("content", "El contenido es obligatorio").not().isEmpty(),
        check("publication", "La publicacion es obligatoria").not().isEmpty(),
        validarCampos
    ],
    creatComment
)

export default router;