const db = require("../config/mysql");

const listaroffas = async (req, res) => {
    const con = await db.getConnection()
    try{
        const [rows] = await con.query("SELECT UA.name AS unidad_academica, JSON_ARRAYAGG( JSON_OBJECT( 'id', educationalOffer.id, 'name', educationalOffer.name, 'photoLink', educationalOffer.photoLink, 'type', educationalOffer.type ) ) AS ofertas FROM offerUA JOIN UA ON offerUA.idUA = UA.idUA JOIN educationalOffer ON offerUA.idOffer = educationalOffer.id GROUP BY UA.idUA, UA.name;");
        const unidades = rows.map(row => ({
        unidad_academica: row.unidad_academica,
        ofertas: JSON.parse(row.ofertas)
    }));
    res.status(200).json(unidades);
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}


const listarOferAcOne = async (req, res) => {
    const con = await db.getConnection();
    const { id } = req.params;

    try {
        const [[campus]] = await con.query(`
            SELECT 
                UA.name AS unidad_academica,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', educationalOffer.id,
                        'name', educationalOffer.name,
                        'photoLink', educationalOffer.photoLink
                    )
                ) AS ofertas
            FROM offerUA
            JOIN UA ON offerUA.idUA = UA.idUA
            JOIN educationalOffer ON offerUA.idOffer = educationalOffer.id
            WHERE UA.idUA = ?
            GROUP BY UA.idUA, UA.name;
        `, [id]);

        if (!campus) {
            return res.status(404).json({ ok: false, msg: 'Campus no encontrado' });
        }

        const result = {
            unidad_academica: campus.unidad_academica,
            ofertas: JSON.parse(campus.ofertas)
        };

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Algo salió mal' });
    } finally {
        con.release();
    }
};

const listarUAOferOne = async (req, res) => {
    const con = await db.getConnection();
    const { id } = req.params;
    try {
        const [rows] = await con.query(`
            SELECT 
                UA.idUA,
                UA.name AS unidad_academica,
                UA.urlPhoto,
                UA.visible
            FROM offerUA
            JOIN UA ON offerUA.idUA = UA.idUA
            WHERE offerUA.idOffer = ?;
        `, [id]);

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, msg: 'Algo salió mal' });
    } finally {
        con.release();
    }
};

const registrarOfferUA = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {
        idOffer, idUA} = req.body;

        await con.query("INSERT INTO offerUA(idOffer, idUA) VALUES(?, ?)",
            [idOffer, idUA]
        );

        res.status(201).json({ok: true, msg: "elemento creado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

const eliminarOferUA = async (req, res) => {
    const con = await db.getConnection()
    try{
        const {id} = req.params;
        
        await con.query("delete from offerUA WHERE id = ?", [id]);

        res.status(200).json({ok: true, msg: "elemento eliminado con exito"});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Algo salió mal'});
    }finally{
        con.release();
    }
}

module.exports = {
    listaroffas,
    listarOferAcOne,
    listarUAOferOne,
    registrarOfferUA,
    eliminarOferUA
}
