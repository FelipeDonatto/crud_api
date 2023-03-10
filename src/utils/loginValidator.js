function loginValidator(req, res, next) {
  const { email, password } = req.body; 
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (!/[A-z0-9._]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    
    next();
  }

  module.exports = loginValidator;
