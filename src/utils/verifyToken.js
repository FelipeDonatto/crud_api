function verifyToken(req, res, next) {
    const { authorization } = req.headers; 
    const authLength = 16;
    if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== authLength) {
    return res.status(401).json({ message: 'Token inválido' });
    }
    next();
}
module.exports = verifyToken;