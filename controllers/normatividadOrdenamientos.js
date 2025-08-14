const db = require("../config/mysql");

// const registrar_noticia = async (req, res) => {
//     const {titulo, fotografiaPrincipal, fecha, descripcion, cuerpo, fotografiasExtra, archivosAdjuntos} = req.body;

//     const con = await db.getConnection();
//     try{
//         const arregloIns = [fotografiaPrincipal, titulo, fecha, descripcion, cuerpo]

//         const insertarNoticia = await con.query("INSERT INTO News(mainImage, title, dateNew, description, body) VALUES(?, ?, ?, ?, ?)", arregloIns);
//         const insertId = insertarNoticia[0].insertId;

//         fotografiasExtra.map(async fotoExtra =>  {
//             await con.query("INSERT INTO newsImageExtra(idNew, image) VALUES(?, ?)", [insertId, fotoExtra]);
//         });

//         archivosAdjuntos.map(async archivoAdjunto => {
//             await con.query("INSERT INTO newsFiles(idNew, file) VALUES(?, ?)", [insertId, archivoAdjunto]);
//         });

//         return res.status(201).json({ok: true, msg: "noticia creada exitosamente"});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ok: false, msg: 'Algo salió mal'});
//     }finally{
//         con.release();
//     }
// }

const obtener_ordenamientos = async (req, res) => {
    const con = await db.getConnection();
    try{


        const [ordenamientos] = await con.query("SELECT * FROM normatividadOrdenamientos")
        return res.status(200).json(ordenamientos); 

    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

// const obtener_noticias_one = async (req, res) => {
//     const con = await db.getConnection();
//     const {idNew} = req.params; 
//     try{
//         const [[noticias]] = await con.query("SELECT * FROM News WHERE idNew = ?", [idNew]);

//         const [newsImageExtra] = await con.query("SELECT image FROM newsImageExtra WHERE idNew = ?", [idNew]);
//         const [newsFiles] = await con.query("SELECT file FROM newsFiles WHERE idNew = ?", [idNew]);

//         const imagenes = newsImageExtra.map(item => item.image);
//         const archivos = newsFiles.map(item => item.file);

//         const semi_json = {
//             "idNoticia": noticias.idNew,
//             "titulo": noticias.title, 
// 	        "fotografiaPrincipal": noticias.mainImage,
// 	        "fecha": noticias.dateNew,
// 	        "descripcion": noticias.description, 
// 	        "cuerpo": noticias.body,
//             "fotografiasExtra": imagenes,
//             "archivosAdjuntos": archivos
//         }

//         return res.status(200).json(semi_json); 
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ok: false, msg: 'Algo salió mal'});
//     }finally{
//         con.release();
//     } 
// }

// const actualizar_noticia = async (req, res) => {
//     const {titulo, fotografiaPrincipal, fecha, descripcion, cuerpo, fotografiasExtra, archivosAdjuntos} = req.body;
//     const {idNew} = req.params;
//     const con = await db.getConnection();

//     try{
        
//         const obj = [fotografiaPrincipal, titulo, fecha, descripcion, cuerpo, idNew];
//         await con.query("UPDATE News SET mainImage = ?, title = ?, dateNew = ?, description = ?, body = ? WHERE idNew = ?", obj);

//         for (const urlAntigua in fotografiasExtra) {
//             const urlNueva = fotografiasExtra[urlAntigua];
            
//             await con.query("UPDATE newsImageExtra SET image = ? WHERE image = ? AND idNew = ?", [urlNueva, urlAntigua, idNew]);
//         }

//         for (const archivoAntiguo in archivosAdjuntos) {
//             const archivoNuevo = archivosAdjuntos[archivoAntiguo];

//             await con.query("UPDATE newsFiles SET file = ? WHERE file = ? AND idNew = ?", [archivoNuevo, archivoAntiguo, idNew]);
//         }
        
//         return res.status(200).json({ok: true, msg: "noticia actualizada con exito"});
        
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ok: false, msg: 'Algo salió mal'});
//     }finally{
//         con.release();
//     } 
// }

// const eliminar_noticia = async (req, res) => {
//     const {idNew} = req.params;
//     const con = await db.getConnection();

//     try{
//         await con.query("DELETE FROM News WHERE idNew = ?", idNew);
        
//         return res.status(200).json({ok: true, msg: "noticia eliminada con exito"});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ok: false, msg: 'Algo salió mal'});
//     }finally{
//         con.release();
//     } 

//     return res.status(200).json({ok: true})
// }

module.exports = {obtener_ordenamientos}