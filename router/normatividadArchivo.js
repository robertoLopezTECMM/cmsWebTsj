const { Router } = require("express");
const {obtener_archivos} = require('../controllers/normatividadArchivo');
const {authenticateClient} = require("../middlewares/authenticate")

const routerNormatividadArchivo = Router();

// routerNormatividadArchivo.post('/', authenticateClient, registrar_noticia);
routerNormatividadArchivo.get('/', obtener_archivos);
// routerNormatividadArchivo.get('/:idNew', obtener_noticias_one);
// routerNormatividadArchivo.put('/:idNew', authenticateClient, actualizar_noticia);
// routerNormatividadArchivo.delete('/:idNew', authenticateClient, eliminar_noticia);

module.exports = routerNormatividadArchivo;