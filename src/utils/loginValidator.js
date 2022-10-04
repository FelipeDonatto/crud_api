function loginValidator(email, password) {
    if (!email) {
        return 'O campo "email" é obrigatório';
    }
    if (!password) {
        return 'O campo "password" é obrigatório';
    }
    if (!/[A-z0-9._]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
        return 'O "email" deve ter o formato "email@email.com"';
    }
    if (password.length < 6) {
        return 'O "password" deve ter pelo menos 6 caracteres';
    }
    return '';
  }

  module.exports = loginValidator;
