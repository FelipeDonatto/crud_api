function verifyTalk(req, res, next) {
    const { talk } = req.body;
    if (!talk || typeof talk !== typeof null) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
}
module.exports = verifyTalk;