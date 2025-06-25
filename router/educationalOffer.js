const { Router } = require("express");
const { listarEducational, registrarEducational, actualizarEducational, eliminarEducational } = require("../controllers/educationalOffer")
const {authenticateClient} = require("../middlewares/authenticate")

const routerEducational = Router();

routerEducational.get("/", listarEducational);
routerEducational.post("/", authenticateClient, registrarEducational);
routerEducational.put("/", authenticateClient, actualizarEducational)
routerEducational.delete("/:id", authenticateClient, eliminarEducational);

module.exports = routerEducational;
