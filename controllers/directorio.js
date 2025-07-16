const db = require("../config/mysql");

const listarDirectorio = async (req, res) => {
    const con = await db.getConnection();
    try{
        const [directorio] = await con.query(`SELECT id, name, puesto, email, phone, image FROM directorio`);
        res.status(200).json(directorio);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const listarDirectorioOne = async (req, res) => {
    const con = await db.getConnection();
    const {id} = req.params;
    try{
        const [[directorio]] = await con.query(`SELECT id, name, puesto, email, phone, image FROM directorio WHERE id = ?`, [id]);
        res.status(200).json(directorio);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const registrarDirectorio = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
        name,
        puesto,
        email,
        phone,
        image} = req.body;

        await con.query("INSERT INTO directorio(name, puesto, email, phone, image) VALUES(?, ?, ?, ?, ?)",
            [name, puesto, email, phone, image]
        );

        res.status(201).json({ok: true, msg: "elemento creado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const actualizarDirectorio = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
            id,
            name,
            puesto,
            email,
            phone,
            image
        } = req.body;

        await con.query("UPDATE directorio SET name = ?, puesto = ?, email = ?, phone = ?, image = ? WHERE id = ?",
            [name, puesto, email, phone, image, id]
        );

        res.status(200).json({ok: true, msg: "elemento actualizado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminarDirectorio = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id} = req.params;
        
        await con.query("DELETE FROM directorio WHERE id = ?", [id]);

        res.status(200).json({ok: true, msg: "elemento eliminado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    listarDirectorio,
    listarDirectorioOne,
    registrarDirectorio,
    actualizarDirectorio,
    eliminarDirectorio
}