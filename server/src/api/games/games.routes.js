const GameRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./games.controller');

GameRoutes.get('/', getAll);
GameRoutes.get('/:id', getOne);
GameRoutes.post('/', upload.single('img'), postOne);
GameRoutes.patch('/:id', upload.single('img'), patchOne);
GameRoutes.delete('/:id', deleteOne);

module.exports = GameRoutes;