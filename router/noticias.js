const { Router } = require("express");
const {registrar_noticia} = require('../controllers/noticias');

const routerNoticias = Router();

routerNoticias.post('/', registrar_noticia);

module.exports = routerNoticias;