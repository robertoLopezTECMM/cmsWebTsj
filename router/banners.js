const { Router } = require("express");
const {registrar_Banner, obtener_Banners, obtener_Banner_One, modificar_Banner, eliminar_Banner} = require('../controllers/banners');

const routerNoticias = Router();

routerNoticias.post('/', registrar_Banner);
routerNoticias.get('/', obtener_Banners);
routerNoticias.get('/:idBanner', obtener_Banner_One);
routerNoticias.put('/:idBanner', modificar_Banner);
routerNoticias.delete('/:idBanner', eliminar_Banner);

module.exports = routerNoticias;