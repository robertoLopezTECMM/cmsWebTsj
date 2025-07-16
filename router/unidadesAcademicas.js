const { Router } = require("express");
const {listarUnidadAcademica, listarUnidadAcademicaOne, registrarUnidadAcademica, actualizarUnidadAcademica, eliminarUnidadAcademica} = require("../controllers/unidadesAcademicas")
const routerUnidad = Router();

routerUnidad.get("/", listarUnidadAcademica);
routerUnidad.get("/:id", listarUnidadAcademicaOne);
routerUnidad.post("/", registrarUnidadAcademica);
routerUnidad.put("/", actualizarUnidadAcademica);
routerUnidad.delete("/:id", eliminarUnidadAcademica);

module.exports = routerUnidad;