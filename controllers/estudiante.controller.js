const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

const getEstudiantesCursos = async (req, res) => {
  try {
    const estudianteId = req.usuario._id;

    const estudiante = await Usuario.findById(estudianteId).populate({
      path: 'cursos',
      select: 'asignatura estado',
      match: { estado: true }
    });

    res.json({ cursos: estudiante.cursos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos del estudiante.' });
  }
};

const asignarCursos = async (req, res) => {
  const { id } = req.params;
  const { cursos } = req.body;

  try {

    const asignaturas = await Curso.find({ asignatura: cursos });

    const cursosWithObjectId = asignaturas.map(curso => curso._id);

    await Usuario.findByIdAndUpdate(id, { cursos: cursosWithObjectId });

    const usuario = await Usuario.findById(id);

    res.status(200).json({
      msg: 'Asignado exitosamente',
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al asignar los cursos al estudiante.' });
  }
};

const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { _id, correo, password, ...resto } = req.body;
  await Usuario.findByIdAndUpdate(id, resto);

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: 'Perfil Actualizado exitosamente',
    usuario
  })
}

const eliminarPerfil = async (req, res) => {
  const { id } = req.params;
  await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuario = await Usuario.findOne({ _id: id });
  const usuarioAutenticado = req.usuario;

  res.status(200).json({
    msg: 'PerfilEliminado',
    usuario,
    usuarioAutenticado
  });
}


const getUsuarioByid = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  res.status(200).json({
    usuario
  });
}


module.exports = { getEstudiantesCursos, asignarCursos, getUsuarioByid, eliminarPerfil, editarPerfil };
