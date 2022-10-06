const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
const checkTalkers = require('./utils/checkTalkers');
const findTalker = require('./utils/findTalker');
const loginValidator = require('./utils/loginValidator');
const writeTalkers = require('./utils/writeTalkers');
const verifyToken = require('./utils/verifyToken');
const verifyTalk = require('./utils/verifyTalk');
const verifyAgeName = require('./utils/verifyAgeName');
const verifyRate = require('./utils/verifyRate');
const verifyWatch = require('./utils/verifyWatch');
const editTalker = require('./utils/editTalker');
const deleteTalker = require('./utils/deleteTalker');

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
   return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

app.post('/login', loginValidator, (req, res) => {
  res.status(200).json({
    token: Crypto.randomBytes(64).toString('hex').slice(0, 16), 
  });
});

app.post('/talker',
          verifyToken,
          verifyTalk,
          verifyRate,
          verifyWatch,
          verifyAgeName,
          async (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const newTalker = {
    name,
    age,
    talk,
  };
  await writeTalkers(newTalker, req, res, authorization);
});

app.put('/talker/:id',
verifyToken,
verifyTalk,
verifyRate,
verifyWatch,
verifyAgeName,
async (req, res) => {
  const { id } = req.params;
  editTalker(id, req.body, req, res);
});

app.delete('/talker/:id',
verifyToken,
async (req, res) => {
  const { id } = req.params;
  deleteTalker(id, req, res);
});