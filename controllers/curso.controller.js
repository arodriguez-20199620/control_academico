const { response, json } = require('express');
const Curso = require('../models/curso');


const cursoPost = async (req, res) => {
    const { asignatura } = req.body;
    const curso = new Curso({ asignatura });
    await curso.save();
    res.status(201).json({
        msg: 'Curso Registrado exitosamente',
        curso
    });
}

const cursoGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true, };

    const [total, curso] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.status(200).json({
        total,
        curso
    });
}

const cursoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...asignatura } = req.body;

    await Curso.findByIdAndUpdate(id, asignatura);

    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        msg: 'Curso Actualizado exitosamente',
        curso
    })
}

const cursoDelete = async (req, res) => {
    const { id } = req.params;
    await Curso.findByIdAndUpdate(id, { estado: false });

    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        msg: 'Curso eliminado exitosamente',
        curso
    });
}

const cursoSearch = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        curso
    });
}



module.exports = {
    cursoGet,
    cursoPost,
    cursoPut,
    cursoDelete,
    cursoSearch,
}