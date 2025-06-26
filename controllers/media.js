const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ruta base para guardar archivos
const uploadDir = path.join(__dirname, process.env.IMAGE_PATH);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Función para obtener tipo descriptivo
const obtenerTipoArchivo = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'Image';
  if (mimetype.startsWith('video/')) return 'Video';
  if (mimetype === 'application/pdf') return 'PDF';
  return 'Archivo';
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const tipo = req.body.tipo || 'archivo';
    const tipoArchivo = obtenerTipoArchivo(file.mimetype);

    const fechaHora = new Date().toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '-')
      .replace(/\..+/, '');

    const extension = path.extname(file.originalname);
    let nombreFinal;

    if (file.fieldname === 'principal') {
      nombreFinal = `${tipo}-Principal${tipoArchivo}-${fechaHora}${extension}`;
    } else {
      req.extraImageCounter = (req.extraImageCounter || 0) + 1;
      nombreFinal = `${tipo}-Extra${tipoArchivo}-${fechaHora}-${req.extraImageCounter}${extension}`;
    }

    cb(null, nombreFinal);
  }
});

// Configurar multer
const upload = multer({
  storage,
  limits: {
    files: 6
  }
});

// Controlador
const subirImagenes = (req, res) => {
  const files = req.files;

  if (!files || (!files['principal'] && !files['extras'])) {
    return res.status(400).send('No se subieron archivos');
  }

  const base = process.env.IMGAE;
  const principal = files['principal'] ? `${base}${files['principal'][0].filename}` : null;

  const extras = files['extras']
    ? files['extras'].map(file => `${base}${file.filename}`)
    : [];

  res.json({
    principal,
    extras
  });
};

module.exports = {
  upload,
  subirImagenes
};
