const db = require("../config/mysql");

const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ruta base para guardar archivos
const uploadDir = path.join(__dirname, process.env.PHOTOGRAPHY_PATH);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const obtenerTipoArchivo = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'Image';
  return 'NA';
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const tipoArchivo = obtenerTipoArchivo(file.mimetype);
        if(tipoArchivo === 'NA') return;

        const fechaHora = new Date().toISOString()
            .replace(/[-:]/g, '')
            .replace('T', '-')
            .replace(/\..+/, '');

        const extension = path.extname(file.originalname);
        let nombreFinal = `Credencial${tipoArchivo}-${fechaHora}${extension}`;

        cb(null, nombreFinal);
    }
});

const upload = multer({
  storage,
  limits: {
    files: 1
  }
});

const registrarCredencial = async (req, res) => {
    const files = req.files;
    if (!files || (!files['photography'])) {
      return res.status(400).send('No se subieron archivos');
    }

    const con = await db.getConnection();
    try{
        const {
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            noNomina,
            noSeguroSocial,
            tipoSangre,
            nombreContactoEmergencia,
            phoneContactoEmergencia,
        } = req.body;

        console.log(files['photography'][0].filename);

        await con.query("INSERT INTO Credenciales(nombres, apellidoPaterno, apellidoMaterno, noNomina, noSeguroSocial, tipoSangre, nombreContactoEmergencia, phoneContactoEmergencia, photography) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombres, apellidoPaterno, apellidoMaterno, noNomina, noSeguroSocial, tipoSangre, nombreContactoEmergencia, phoneContactoEmergencia, files['photography'][0].filename]
        );
        
        return res.status(200).json({ok: true});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const obtener_credenciales = async (req, res) => {
    const con = await db.getConnection();
    try{
        const [credenciales] = await con.query("SELECT * FROM Credenciales");
        
        const resultado = credenciales.map(item => {
            // Se crea una copia del objeto para no modificar el original
            const nuevoItem = { ...item };

            // Si el campo 'photography' no es nulo o vacío, se le añade la URL base
            if (nuevoItem.photography) {
              nuevoItem.photography = `${process.env.PHOTOGRAPHY_URL}/${item.photography}`;
            }
      
            return nuevoItem;
        });

        return res.status(200).json(resultado);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const obtener_credenciales_one = async (req, res) => {
    const con = await db.getConnection();
    const {id} = req.params;
    try{
        const [credenciales] = await con.query("SELECT * FROM Credenciales WHERE idCredencial = ?", [id]);
        
        const resultado = credenciales.map(item => {
            // Se crea una copia del objeto para no modificar el original
            const nuevoItem = { ...item };

            if (nuevoItem.photography) {
              nuevoItem.photography = `${process.env.PHOTOGRAPHY_URL}/${item.photography}`;
            }
      
            return nuevoItem;
        });

        return res.status(200).json(resultado);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizar_credencial = async (req, res) => {
    const con = await db.getConnection();
    try{
        const {
            idCredencial,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            noNomina,
            noSeguroSocial,
            tipoSangre,
            nombreContactoEmergencia,
            phoneContactoEmergencia,
        } = req.body;
        
        await con.query("UPDATE Credenciales SET nombres = ?, apellidoPaterno = ?, apellidoMaterno = ?, noNomina = ?, noSeguroSocial = ?, tipoSangre = ?, nombreContactoEmergencia = ?, phoneContactoEmergencia = ? WHERE idCredencial = ?", 
            [nombres, apellidoPaterno, apellidoMaterno, noNomina, noSeguroSocial, tipoSangre, nombreContactoEmergencia, phoneContactoEmergencia, idCredencial]
        );

        const [actualizado] =  await con.query("SELECT * FROM Credenciales WHERE idCredencial = ?", [idCredencial]);

        return res.status(200).json(actualizado);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizar_foto = async (req, res) => {
    const files = req.files;
    if (!files || (!files['photography'])) {
      return res.status(400).send('No se subieron archivos');
    }

    const con = await db.getConnection();

    try{
        const {idCredencial} = req.body;

        await con.query("UPDATE Credenciales SET photography = ? WHERE idCredencial = ?", [files['photography'][0].filename, idCredencial]);
        const [actualizado] =  await con.query("SELECT * FROM Credenciales WHERE idCredencial = ?", [idCredencial]);

        const resultado = actualizado.map(item => {
            // Se crea una copia del objeto para no modificar el original
            const nuevoItem = { ...item };

            if (nuevoItem.photography) {
              nuevoItem.photography = `${process.env.PHOTOGRAPHY_URL}/${item.photography}`;
            }
            
            return nuevoItem;
        });

        return res.status(200).json(resultado);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salio mal'})
    }finally{
        con.release();
    }
}

const eliminar_credencial = async (req, res) => {
    const con = await db.getConnection();
    const {idCredencial} = req.params
    try{
        console.log(idCredencial);
        await con.query("DELETE FROM Credenciales WHERE idCredencial = ?", [idCredencial]);
        return res.status(200).json({ok: true, msg: 'Credencial eliminada exitosamente'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salio mal'});
    } finally {
        con.release();
    }
}

module.exports = {
    upload,
    registrarCredencial,
    obtener_credenciales,
    obtener_credenciales_one,
    actualizar_credencial,
    actualizar_foto,
    eliminar_credencial
}