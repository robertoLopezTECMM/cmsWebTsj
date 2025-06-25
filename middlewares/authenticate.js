const clients = {
    "client": 'd99ffee5cf7acda86e241b396989020d',
};

const authenticateClient = (req, res, next) =>{
    const {xtoken} = req.headers;

    if(clients.client !== xtoken){
        return res.status(401).send({ error: 'xtoken' });
    }
    
    next();
}



module.exports = {authenticateClient}