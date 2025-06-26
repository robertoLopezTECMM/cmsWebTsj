const db = require("../config/mysql");

const registrar_Banner = async (req, res) => {
    const {titulo, mainImage, urlPagina, archivoAdjunto} = req.body;

    const con = await db.getConnection();
    try{
        const arregloIns = [mainImage, titulo, urlPagina, archivoAdjunto]

        const insertarBanners = await con.query("INSERT INTO Banners(mainImage, tittle, urlPage) VALUES(?, ?, ?);", arregloIns);
        const insertId = insertarBanners[0].insertId;

        if (archivoAdjunto) {
            await con.query("INSERT INTO bannerFiles(idBanner, file) VALUES(?, ?)", [insertId, archivoAdjunto]);
        }

        return res.status(201).json({ok: true, msg: "Banner creado exitosamente"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const obtener_Banners = async (req, res) => {
    const con = await db.getConnection();
    try{
        const [Bannerss] = await con.query("SELECT * FROM Banners where status = 1");
        let contador = 0;
        const elementos = Bannerss.length;

        Bannerss.map(async Banners =>{
            final_Json = [];
            idBanner = Banners.idBanner;

            const [bannerFiles] = await con.query("SELECT file FROM bannerFiles WHERE idBanner = ?", idBanner);

            const archivos = bannerFiles.map(item => item.file);

            const semi_json = {
                "idBanners": Banners.idBanner,
                "titulo": Banners.tittle, 
	            "fotografiaPrincipal": Banners.mainImage,
                "urlPagina": Banners.urlPage,
                "archivosAdjuntos": archivos
            }

            final_Json.push(semi_json);
            contador = contador + 1;

            if(elementos === contador){
                return res.status(200).json(final_Json); 
            }
        
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const obtener_Banner_One = async (req, res) => {
    const { idBanner } = req.params;
    const con = await db.getConnection();
    try {
        const [banners] = await con.query("SELECT * FROM Banners WHERE idBanner = ? AND status = 1", [idBanner]);
        if (banners.length === 0) {
            return res.status(404).json({ ok: false, msg: "Banner no encontrado" });
        }
        const banner = banners[0];
        const [bannerFile] = await con.query("SELECT file FROM bannerFiles WHERE idBanner = ?", [idBanner]);
        const archivos = bannerFile.length > 0 ? [bannerFile[0].file] : [];

        const result = {
            idBanners: banner.idBanner,
            titulo: banner.tittle,
            fotografiaPrincipal: banner.mainImage,
            urlPagina: banner.urlPage,
            archivoAdjunto: archivos
        };

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Algo salió mal' });
    } finally {
        con.release();
    }
}
const modificar_Banner = async (req, res) => {
    const { idBanner } = req.params;
    const { titulo, mainImage, urlPagina, archivoAdjunto } = req.body;
    const con = await db.getConnection();
    try {
        const [banners] = await con.query("SELECT * FROM Banners WHERE idBanner = ? AND status = 1", [idBanner]);
        if (banners.length === 0) {
            return res.status(404).json({ ok: false, msg: "Banner no encontrado" });
        }

        await con.query(
            "UPDATE Banners SET tittle = ?, mainImage = ?, urlPage = ? WHERE idBanner = ?",
            [titulo, mainImage, urlPagina, idBanner]
        );

        if (archivoAdjunto) {
            const [bannerFiles] = await con.query("SELECT * FROM bannerFiles WHERE idBanner = ?", [idBanner]);
            if (bannerFiles.length > 0) {
                await con.query("UPDATE bannerFiles SET file = ? WHERE idBanner = ?", [archivoAdjunto, idBanner]);
            } else {
                await con.query("INSERT INTO bannerFiles(idBanner, file) VALUES(?, ?)", [idBanner, archivoAdjunto]);
            }
        }

        const [updatedBannerRows] = await con.query("SELECT * FROM Banners WHERE idBanner = ?", [idBanner]);
        const updatedBanner = updatedBannerRows[0];
        const [updatedFiles] = await con.query("SELECT file FROM bannerFiles WHERE idBanner = ?", [idBanner]);
        const archivos = updatedFiles.map(item => item.file);

        const result = {
            idBanners: updatedBanner.idBanner,
            titulo: updatedBanner.tittle,
            fotografiaPrincipal: updatedBanner.mainImage,
            urlPagina: updatedBanner.urlPage,
            archivoAdjunto: archivos
        };

        return res.status(200).json({ ok: true, msg: "Banner actualizado exitosamente", banner: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Algo salió mal' });
    } finally {
        con.release();
    }
}

const eliminar_Banner = async (req, res) => {
    const { idBanner } = req.params;
    const con = await db.getConnection();
    try {
        const [banners] = await con.query("SELECT * FROM Banners WHERE idBanner = ? AND status = 1", [idBanner]);
        if (banners.length === 0) {
            return res.status(404).json({ ok: false, msg: "Banner no encontrado" });
        }

        await con.query("UPDATE Banners SET status = 0 WHERE idBanner = ?", [idBanner]);

        return res.status(200).json({ ok: true, msg: "Banner eliminado exitosamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Algo salió mal' });
    } finally {
        con.release();
    }
}

module.exports = {registrar_Banner, obtener_Banners, obtener_Banner_One, modificar_Banner, eliminar_Banner}