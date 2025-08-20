const { Router } = require("express");
const {video} = require("../controllers/video")

const routerVideo = Router();

routerVideo.get("/", video);

module.exports = routerVideo;