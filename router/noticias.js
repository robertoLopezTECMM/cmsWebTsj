const { Router } = require("express");
const {registrar_noticia, obtener_noticias, obtener_noticias_one, actualizar_noticia, eliminar_noticia} = require('../controllers/noticias');
const {authenticateClient} = require("../middlewares/authenticate")

const routerNoticias = Router();

routerNoticias.post('/', authenticateClient, registrar_noticia);
routerNoticias.get('/', obtener_noticias);
routerNoticias.get('/:idNew', obtener_noticias_one);
routerNoticias.put('/:idNew', authenticateClient, actualizar_noticia);
routerNoticias.delete('/:idNew', authenticateClient, eliminar_noticia);

module.exports = routerNoticias;