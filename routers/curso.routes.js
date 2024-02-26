const { Router, request } = require('express');
const { check } = require('express-validator');

//Validaciones
const { validarCampos } = require('../middlewares/validarCampos');
const { existeCursoById, existeAsignatura } = require('../helpers/validarCursos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

// Controlador
const { cursoGet, cursoPost, cursoPut, cursoDelete, cursoSearch } = require('../controllers/curso.controller');

const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoSearch);

router.post(
    "/",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("asignatura", "El nombre de la asignatura es obligatorio").not().isEmpty(),
        check("asignatura").custom(existeAsignatura),
        validarCampos,
    ], cursoPost);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoPut);

router.delete(
    "/:id",
    [validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoDelete);


module.exports = router;