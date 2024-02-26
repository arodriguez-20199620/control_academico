const Curso = require('../models/curso');


const existeCursoById = async (id = '') => {
    const existecurso = await Curso.findById(id);
    if (!existecurso) {
        throw new Error(`El curso con el ${id} no existe`);
    }
}

const existeAsignatura = async (asignatura = '') => {
    const cursoExistente = await Curso.findOne({ asignatura });

    if (cursoExistente) {
        if (cursoExistente.estado) {
            throw new Error(`El curso '${asignatura}' ya está registrado en la base de datos`);
        } else {
            throw new Error(`El curso  '${asignatura}' existe pero se encuentra deshabilitado`);

        }
    }
};

const validarNoAsing = async (cursos = []) => {
    if (cursos && cursos.length > 3) {
        throw new Error(`No puedes asignar más de 3 cursos`);
    }
}

const validarCursoDuplicado = async (cursos = []) => {
    let cursosVistos = {};
    for (let i = 0; i < cursos.length; i++) {
        if (cursosVistos[cursos[i]]) {
            throw new Error(`Ya te has asignado al curso de ${cursos[i]}`);
        } else {
            cursosVistos[cursos[i]] = true;
        }
    }
}

const existeCurso = async (cursos = []) => {
    for (let i = 0; i < cursos.length; i++) {
        const curso = await Curso.findOne({ asignatura: cursos[i] });
        if (!curso) {

            throw new Error(`El curso ${cursos[i]} no existe en la base de datos`);
        }
        if (!curso.estado) {
            throw new Error(`El curso ${cursos[i]} no existe en la base de datos`);
        }
    };
}

module.exports = {
    existeCursoById,
    existeAsignatura,
    validarNoAsing,
    validarCursoDuplicado,
    existeCurso
}