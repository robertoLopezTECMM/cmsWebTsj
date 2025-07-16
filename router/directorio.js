const { Router } = require("express");
const { listarDirectorio, listarDirectorioOne, registrarDirectorio, actualizarDirectorio, eliminarDirectorio } = require("../controllers/directorio")

const routerDirectorio = Router();

routerDirectorio.get("/", listarDirectorio);
routerDirectorio.get("/:id", listarDirectorioOne);
routerDirectorio.post("/", registrarDirectorio);
routerDirectorio.put("/", actualizarDirectorio);
routerDirectorio.delete("/:id", eliminarDirectorio);

module.exports = routerDirectorio;