const db = require("../config/mysql");

const listarEducational = async (req, res) => {
    const con = await db.getConnection()
    try{
        const [educa] = await con.query("SELECT id, name, type, photoLink, videoLink, flayerLink, objective, incomeProfile, outcomeProfile FROM educationalOffer");
        res.status(200).json(educa);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const listarEducationalOne = async (req, res) => {
    const con = await db.getConnection();
    const {id} = req.params;
    try{
        const [[educa]] = await con.query("SELECT id, name, type, photoLink, videoLink, flayerLink, objective, incomeProfile, outcomeProfile FROM educationalOffer WHERE id = ?", [id]);
        res.status(200).json(educa);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const registrarEducational = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
        name, 
        type, 
        photoLink,
        videoLink, 
        flayerLink, 
        objective, 
        incomeProfile,
        outcomeProfile} = req.body;

        await con.query("INSERT INTO educationalOffer(name, type, photoLink, videoLink, flayerLink, objective, incomeProfile, outcomeProfile) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [name, type, photoLink, videoLink, flayerLink, objective, incomeProfile, outcomeProfile]
        );

        res.status(201).json({ok: true, msg: "elemento creado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizarEducational = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id,
        name, 
        type, 
        photoLink,
        videoLink, 
        flayerLink, 
        objective, 
        incomeProfile,
        outcomeProfile} = req.body;

        await con.query("UPDATE educationalOffer SET name = ?, type = ?, photoLink = ?, videoLink = ?, flayerLink = ?, objective = ?, incomeProfile = ?, outcomeProfile = ? WHERE id = ?",
            [name, type, photoLink, videoLink, flayerLink, objective, incomeProfile, outcomeProfile, id]
        );

        res.status(200).json({ok: true, msg: "elemento actualizado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminarEducational = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id} = req.params;
        
        await con.query("DELETE FROM educationalOffer WHERE id = ?", [id]);

        res.status(200).json({ok: true, msg: "elemento eliminado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    listarEducational,
    listarEducationalOne,
    registrarEducational,
    actualizarEducational,
    eliminarEducational
}

///home/usuario/nodeProjects/cmsWebTsj/controllers