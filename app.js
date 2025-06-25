const express = require("express");
const dotenv = require("dotenv");
const routerEducational = require("./router/educationalOffer");
const routerNoticias = require("./router/noticias")
const routerMedia = require("./router/media");
const https = require("https");

//librerias para maejar archivos
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Para asegurar que los directorios existan

dotenv.config();

// --- Verificación y creación de directorios ---
const uploadBaseDir = './public';
const imagesDir = path.join(uploadBaseDir, 'cmsWebImages');
const filesDir = uploadBaseDir;

// Asegúrate de que los directorios existan.
// 'recursive: true' creará directorios anidados si no existen.
[uploadBaseDir, imagesDir, filesDir].forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
});

// --- Configuración de almacenamiento para Multer ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, imagesDir);
        } else {
            cb(null, filesDir);
        }
    },
    filename: function (req, file, cb) {
        // Define el nombre del archivo guardado.
        // Se recomienda generar nombres únicos para evitar colisiones.
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const http_server = express();
http_server.use( express.json() );

http_server.use(( req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

http_server.use("/educational", routerEducational);
http_server.use("/news", routerNoticias);
http_server.use("/media", routerMedia);

http_server.use(express.static('public'));

/*const privateKey  = fs.readFileSync( '/etc/letsencrypt/live/xura.tsj.mx/privkey.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/xura.tsj.mx/fullchain.pem', 'utf8');
const certificate = fs.readFileSync( '/etc/letsencrypt/live/xura.tsj.mx/cert.pem', 'utf8');*/

//const credentials = { key: privateKey, ca: ca, cert: certificate };
//const https_server = https.createServer( credentials, http_server );

http_server.listen( process.env.PORT , () => { console.log('servidor corriendo en el puerto: ', process.env.PORT); });
