const { Router } = require("express");
const { listaroffas,
    listarOferAcOne,
    listarUAOferOne,
    registrarOfferUA,
    eliminarOferUA
 } = require('../controllers/offerUa');

const routerCampus = Router();

routerCampus.post('/', registrarOfferUA);
routerCampus.get('/', listaroffas);
routerCampus.get('/campus/:id', listarOferAcOne);
routerCampus.get('/carrera/:id', listarUAOferOne);
routerCampus.delete('/:id', eliminarOferUA);

module.exports = routerCampus;