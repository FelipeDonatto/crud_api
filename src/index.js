const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
const checkTalkers = require('./utils/checkTalkers');
const findTalker = require('./utils/findTalker');
const loginValidator = require('./utils/loginValidator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const allTalkers = await checkTalkers();
  res.status(200).json(allTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalker(id);
  if (talker === 'NOT FOUND') {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body; 
  const validate = await loginValidator(email, password);
  if (validate !== '') {
    return res.status(400).json({ message: validate });
  }
  res.status(200).json({
    email,
    password,
    token: Crypto.randomBytes(64).toString('hex').slice(0, 16), 
  });
});