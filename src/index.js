const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./talker.json');
const fs = require('fs/promises')

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

async function checkTalkers() {
  try {
  const fileContent = await fs.readFile('/app/src/talker.json')
  if(!fileContent) {
    return []
  }
  return JSON.parse(fileContent)
} catch (e) {
  console.error(e)
}
}

app.get('/talker', async (_req, res) => {
  const allTalkers = await checkTalkers();
  res.status(200).json(allTalkers)
});