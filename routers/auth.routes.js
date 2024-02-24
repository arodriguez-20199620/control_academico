const { Router } = require("express");

const { check } = require("express-validator");

// Validaciones 
const { validarCampos } = require("../middlewares/validarCampos");
const { existenteEmail } = require("../helpers/db-validators");

// Controller 
const { login, register } = require("../controllers/auth.controller");

const router = Router();

router.post(
    '/register',
    [
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("role"),
        validarCampos
    ], register);


router.post(
    '/login',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login);

module.exports = router;