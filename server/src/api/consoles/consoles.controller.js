const Console = require('./consoles.model');
const { deleteFile } = require('../../middlewares/deleteFile.middleware');

const getAll = async (req, res, next) => {
    try {
        const consoles = await Console.find().populate("videogames");
        res.status(200).json(consoles);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findById(id).populate("games");
        res.status(200).json(console);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const console = new Console();
        console.name = req.body.name;
        console.maker = req.body.maker;
        console.price = req.body.price;
        console.fabrication = req.body.fabrication;
        console.type = req.body.type;
        console.sales = req.body.sales;
        if (req.file) console.img = req.file.path
        console.videogames = req.body.videogames;

        const consoleDB = await console.save();
        return res.status(201).json(consoleDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = new Console();
        console.name = req.body.name;
        console.maker = req.body.maker;
        console.price = req.body.price;
        console.fabrication = req.body.fabrication;
        console.type = req.body.type;
        console.sales = req.body.sales;
        if (req.file) console.img = req.file.path
        console.videogames = req.body.videogames;

        console._id = id;
        const updateConsole = await Console.findByIdAndUpdate(id, console);
        return res.status(200).json(updateConsole);
    } catch (error) {
        return next(error)
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findByIdAndDelete(id);
        if (console.img) deleteFile(console.img)
        return res.status(200).json(console);
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}