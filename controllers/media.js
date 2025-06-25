const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ruta base para guardar imágenes
const uploadDir = path.join(__dirname, process.env.IMAGE_PATH);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const tipo = req.body.tipo || 'archivo';

    const fechaHora = new Date().toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '-')
      .replace(/\..+/, '');

    const extension = path.extname(file.originalname);
    let nombreFinal;

    if (file.fieldname === 'principal') {
      nombreFinal = `${tipo}PrincipalImage-${fechaHora}${extension}`;
    } else {
      // Initialize a counter for extra images if it doesn't exist
      req.extraImageCounter = (req.extraImageCounter || 0) + 1;
      nombreFinal = `${tipo}ExtraImage-${fechaHora}-${req.extraImageCounter}${extension}`;
    }

    cb(null, nombreFinal);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 6 // 1 principal + hasta 5 extras
  }
});

// Controlador
const subirImagenes = (req, res) => {
  const files = req.files;

  if (!files || (!files['principal'] && !files['extras'])) {
    return res.status(400).send('No se subieron imágenes');
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