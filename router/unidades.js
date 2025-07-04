const { Router } = require("express");
const { listarUAs,
    listarUAOne,
    registrarUnidadA,
    actualizarUnidadA,
    eliminarUnidadA
 } = require('../controllers/banners');

const routerNoticias = Router();

routerNoticias.post('/', registrarUnidadA);
routerNoticias.get('/', listarUAs);
routerNoticias.get('/:id', listarUAOne);
routerNoticias.put('/:id', actualizarUnidadA);
routerNoticias.delete('/:id', eliminarUnidadA);

module.exports = routerNoticias;