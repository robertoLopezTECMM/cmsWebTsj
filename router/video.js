const { Router } = require("express");
const {video, video2} = require("../controllers/video")

const routerVideo = Router();

routerVideo.get("/", video);
routerVideo.get("/bienvenida", video2);

module.exports = routerVideo;