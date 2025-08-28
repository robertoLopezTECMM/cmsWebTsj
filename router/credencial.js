const { Router } = require("express");
const {upload, registrarCredencial, obtener_credenciales, obtener_credenciales_one, actualizar_credencial, actualizar_foto, eliminar_credencial} = require("../controllers/credencial");

const routerCredencial = Router();

routerCredencial.post("/", 
    upload.fields([
        { name: 'photography', maxCount: 1 }
    ]),
    registrarCredencial);

routerCredencial.get("/", obtener_credenciales);
routerCredencial.get("/:id", obtener_credenciales_one);
routerCredencial.put("/", actualizar_credencial);
routerCredencial.put("/foto",
    upload.fields([
        { name: 'photography', maxCount: 1 }
    ]), 
    actualizar_foto);

routerCredencial.delete("/:idCredencial", eliminar_credencial);

module.exports = routerCredencial;