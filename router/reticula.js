const { Router } = require("express");
const {registrar_reticula, obtener_reticula, actualizar_reticula, eliminar_reticula} = require("../controllers/reticula");

const routerReticula = Router();

routerReticula.post("/", registrar_reticula);
routerReticula.get("/:idEducational", obtener_reticula);
routerReticula.put("/", actualizar_reticula);
routerReticula.delete("/:idReticula", eliminar_reticula);

module.exports = routerReticula;