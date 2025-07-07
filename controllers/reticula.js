const db = require("../config/mysql");

const registrar_reticula = async (req, res) => {
    const con = await db.getConnection();
    const {idEducational, nombre, tipo, semestre} = req.body;
    try{
        const obj = [idEducational, nombre, tipo, semestre];
        await con.query("INSERT INTO reticula(idEducational, nombre, tipo, semestre) VALUES(?, ?, ?, ?)", obj);
        res.status(201).json({ok: true, msg: "reticula añadida con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const obtener_reticula = async (req, res) => {
    const con = await db.getConnection();
    const {idEducational} = req.params;
    try{
        const [reticula] = await con.query("SELECT idReticula, nombre, tipo, semestre FROM reticula WHERE idEducational = ? ORDER BY semestre", [idEducational]);

        res.status(200).json(reticula);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizar_reticula = async (req, res) => {
    const con = await db.getConnection();
    const {idReticula, nombre, tipo, semestre} = req.body;
    try{
        await con.query("UPDATE reticula SET nombre = ?, tipo = ?, semestre = ? WHERE idReticula = ?", [nombre, tipo, semestre, idReticula]);

        res.status(200).json({ok: true, msg: "se actualizo la reticula exitosamente"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminar_reticula = async (req, res) => {
    const con = await db.getConnection();
    const {idReticula} = req.params;
    try{
        await con.query("DELETE FROM reticula WHERE idReticula = ?", [idReticula]);

        res.status(200).json({ok: true, msg: "se elimino reticula exitosamente"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    registrar_reticula,
    obtener_reticula,
    actualizar_reticula,
    eliminar_reticula
}