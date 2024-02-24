const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    asignatura: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },

});


CursoSchema.methods.toJSON = function () {
    const { __v, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Curso', CursoSchema);