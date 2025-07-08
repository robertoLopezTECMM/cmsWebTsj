const { Router } = require("express");
const { listarUAs,
    listarUAOne,
    registrarUnidadA,
    actualizarUnidadA,
    eliminarUnidadA
 } = require('../controllers/unidades');

const routerUnidades = Router();

routerUnidades.post('/', registrarUnidadA);
routerUnidades.get('/', listarUAs);
routerUnidades.get('/:id', listarUAOne);
routerUnidades.put('/:id', actualizarUnidadA);
routerUnidades.delete('/:id', eliminarUnidadA);

module.exports = routerUnidades;