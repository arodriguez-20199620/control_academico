const { Router } = require('express');
const { check } = require('express-validator');

// validaciones
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos')
const { existeUsuarioById } = require('../helpers/db-validators')
const { validarNoAsing, validarCursoDuplicado, existeCurso } = require('../helpers/validarCursos')
const { tieneRole } = require('../middlewares/validar-roles');


//controller
const { getEstudiantesCursos, asignarCursos, getUsuarioByid, eliminarPerfil, editarPerfil } = require('../controllers/estudiante.controller');


const router = Router();

router.get('/', validarJWT, getEstudiantesCursos);
router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ], getUsuarioByid);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('STUDENT_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        check("cursos").custom(validarNoAsing),
        check("cursos").custom(existeCurso),
        check("cursos").custom(validarCursoDuplicado),
        validarCampos,
    ], asignarCursos);


router.put(
    "/editar/:id",
    [
        validarJWT,
        tieneRole('STUDENT_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], editarPerfil);


router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('STUDENT_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], eliminarPerfil);


module.exports = router;
