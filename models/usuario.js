const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        required: true,
    },
    cursos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Curso',
        },
    ],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Usuario', UsuarioSchema);