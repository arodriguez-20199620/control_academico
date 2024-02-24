const Curso = require('../models/curso');


const existeCursoById = async (id = '') => {
    const existecurso = await Curso.findOne({ id });
    if (existecurso) {
        throw new Error(`El curso con el ${id} no existe`);
    }
}

const existeAsignatura = async (asignatura = '') => {
    const cursoExistente = await Curso.findOne({ asignatura });





    if (cursoExistente) {

        if (cursoExistente.estado) {
            throw new Error(`El curso con la asignatura '${asignatura}' ya está registrado en la base de datos`);
        } else {
            throw new Error(`El curso con la asignatura '${asignatura}' existe pero está desactivado`);
        }
    }
};



module.exports = {
    existeCursoById,
    existeAsignatura
}