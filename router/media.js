const { Router } = require('express');
const { upload, subirImagenes } = require('../controllers/media');
const { authenticateClient } = require('../middlewares/authenticate');

const routerMedia = Router();

routerMedia.post(
  '/subir',
  
  upload.fields([
    { name: 'principal', maxCount: 1 },
    { name: 'extras', maxCount: 5 }
  ]),
  subirImagenes
);

module.exports = routerMedia;
