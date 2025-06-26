const { Router } = require("express");
const {registrar_noticia, obtener_noticias, obtener_noticias_one, actualizar_noticia, eliminar_noticia} = require('../controllers/noticias');

const routerNoticias = Router();

routerNoticias.post('/', registrar_noticia);
routerNoticias.get('/', obtener_noticias);
routerNoticias.get('/:idNew', obtener_noticias_one);
routerNoticias.put('/:idNew', actualizar_noticia);
routerNoticias.delete('/:idNew', eliminar_noticia);

module.exports = routerNoticias;