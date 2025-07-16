const db = require("../config/mysql");

const listarEducational = async (req, res) => {
    const con = await db.getConnection()
    try{
        const [educa] = await con.query(`SELECT ed.id, ed.name, ed.type, ed.photoLink, ed.videoLink, ed.flayerLink, ed.objective, ed.incomeProfile, ed.outcomeProfile, JSON_ARRAYAGG(JSON_OBJECT('idunidad', ua.idUA, 'unidad', ua.name)) as Campus FROM educationalOffer ed JOIN offerUA ofu on ofu.idOffer = ed.id JOIN UA ua on ua.idUA = ofu.idUA GROUP BY ed.id, ed.name, ed.type, ed.photoLink, ed.videoLink, ed.flayerLink, ed.objective, ed.incomeProfile, ed.outcomeProfile;`);
        // Transform the result to include campus information
        educa.forEach(item => {
            item.Campus = JSON.parse(item.Campus);
        });
        // Return the result
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
    const {name} = req.params;
    const formattedName = name.replace(/-/g, ' ');
    try{
        const [[educa]] = await con.query("SELECT ed.id, ed.name, ed.type, ed.photoLink, ed.videoLink, ed.flayerLink, ed.objective, ed.incomeProfile, ed.outcomeProfile, JSON_ARRAYAGG(JSON_OBJECT('idunidad', ua.idUA, 'unidad', ua.name)) as Campus FROM educationalOffer ed JOIN offerUA ofu on ofu.idOffer = ed.id JOIN UA ua on ua.idUA = ofu.idUA WHERE ed.name like (?) GROUP BY ed.id, ed.name, ed.type, ed.photoLink, ed.videoLink, ed.flayerLink, ed.objective, ed.incomeProfile, ed.outcomeProfile;", [formattedName]);
        // Transform the result to include campus information
        if (educa) {
            educa.Campus = JSON.parse(educa.Campus);
        } else {
            return res.status(404).json({ok: false, msg: 'Oferta educativa no encontrada'});
        }
        // Return the result
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