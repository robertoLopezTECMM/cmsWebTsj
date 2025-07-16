const db = require("../config/mysql");

const listarUnidadAcademica = async (req, res) => {
    const con = await db.getConnection();
    try{
        const [unidad] = await con.query(`SELECT id, name, address, email, phone, image, whatsapp FROM unidadesAcademicas`);
        res.status(200).json(unidad);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const listarUnidadAcademicaOne = async (req, res) => {
    const con = await db.getConnection();
    const {id} = req.params;
    try{
        const [[unidad]] = await con.query(`SELECT id, name, address, email, phone, image, whatsapp FROM unidadesAcademicas WHERE id = ?`, [id]);
        res.status(200).json(unidad);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const registrarUnidadAcademica = async (req, res) => {
    const con = await db.getConnection();
    try{
        const {
        name,
        address,
        email,
        phone,
        image,
        whatsapp} = req.body;

        await con.query("INSERT INTO unidadesAcademicas(name, address, email, phone, image, whatsapp) VALUES(?, ?, ?, ?, ?, ?)",
            [name, address, email, phone, image, whatsapp]
        );

        res.status(201).json({ok: true, msg: "elemento creado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizarUnidadAcademica = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
            id,
            name,
            address,
            email,
            phone,
            image,
            whatsapp
        } = req.body;

        await con.query("UPDATE unidadesAcademicas SET name = ?, address = ?, email = ?, phone = ?, image = ?, whatsapp = ? WHERE id = ?",
            [name, address, email, phone, image, whatsapp, id]
        );

        res.status(200).json({ok: true, msg: "elemento actualizado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminarUnidadAcademica = async (req, res) => {
    const con = await db.getConnection();
    try{
        const {id} = req.params;
        
        await con.query("DELETE FROM unidadesAcademicas WHERE id = ?", [id]);

        res.status(200).json({ok: true, msg: "elemento eliminado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    listarUnidadAcademica,
    listarUnidadAcademicaOne,
    registrarUnidadAcademica,
    actualizarUnidadAcademica,
    eliminarUnidadAcademica
}