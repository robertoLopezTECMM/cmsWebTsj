const { Router } = require("express");
const {registrar_noticia, obtener_noticias} = require('../controllers/noticias');

const routerNoticias = Router();

routerNoticias.post('/', registrar_noticia);
routerNoticias.get('/', obtener_noticias);

module.exports = routerNoticias;