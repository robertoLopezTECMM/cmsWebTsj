const { Router } = require("express");
const {obtener_ordenamientos} = require('../controllers/normatividadOrdenamientos');
const {authenticateClient} = require("../middlewares/authenticate")

const routerNormatividadOrdenamientos = Router();

// routerNormatividadArchivo.post('/', authenticateClient, registrar_noticia);
routerNormatividadOrdenamientos.get('/', obtener_ordenamientos);
// routerNormatividadArchivo.get('/:idNew', obtener_noticias_one);
// routerNormatividadArchivo.put('/:idNew', authenticateClient, actualizar_noticia);
// routerNormatividadArchivo.delete('/:idNew', authenticateClient, eliminar_noticia);

module.exports = routerNormatividadOrdenamientos;