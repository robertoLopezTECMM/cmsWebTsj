const db = require("../config/mysql");

const listarUAs = async (req, res) => {
    const con = await db.getConnection()
    try{
        const [unidades] = await con.query("SELECT * FROM UAs");
        res.status(200).json(unidades);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const listarUAOne = async (req, res) => {
    const con = await db.getConnection();
    const {id} = req.params;
    try{
        const [[campus]] = await con.query("SELECT * FROM educationalOffer WHERE id = ?", [id]);
        res.status(200).json(campus);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const registrarUnidadA = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
        name, 
        urlPhoto} = req.body;

        await con.query("INSERT INTO UA(name, urlPhoto) VALUES(?, ?)",
            [name, urlPhoto]
        );

        res.status(201).json({ok: true, msg: "elemento creado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizarUnidadA = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id,
        name, urlPhoto} = req.body;

        await con.query("UPDATE UA SET name = ?, urlPhoto =? WHERE id = ?",
            [name, urlPhoto, id]
        );

        res.status(200).json({ok: true, msg: "elemento actualizado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminarUnidadA = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id} = req.params;
        
        await con.query("UPDATE UA SET visible = 0 WHERE id = ?", [id]);

        res.status(200).json({ok: true, msg: "elemento eliminado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    listarUAs,
    listarUAOne,
    registrarUnidadA,
    actualizarUnidadA,
    eliminarUnidadA
}
