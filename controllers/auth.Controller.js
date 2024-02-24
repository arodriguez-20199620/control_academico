const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');


const register = async (req, res) => {

    const { correo, password, nombre, role } = req.body;

    if (!['TEACHER_ROLE', 'STUDENT_ROLE'].includes(role)) {
        return res.status(400).json({ error: 'Rol no válido.' });
    }

    const usuario = new Usuario({ correo, password, nombre, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        usuario
    });

};

const login = async (req, res) => {
    const { correo, password } = req.body;s

    try {
        // verificar que el correo exista
        const usuario = await Usuario.findOne({ correo });

        console.log(usuario)
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no está registrado'
            })
        }

        // verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }
        // verificar que la contraseña sea la correcta
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Login ok',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    register,
    login
};
