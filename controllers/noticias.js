const db = require("../config/mysql");

const registrar_noticia = (req, res) => {
    res.status(200).json({ok: true});
}

module.exports = {registrar_noticia}