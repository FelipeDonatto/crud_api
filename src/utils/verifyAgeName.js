function verifyAgeName(req, res, next) {
    const { name, age } = req.body;
    const minLen = 3;
    const minAge = 18;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
        }
    if (name.length < minLen) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        }
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
        }
    if (age < minAge) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
        }
    next();
}
module.exports = verifyAgeName;