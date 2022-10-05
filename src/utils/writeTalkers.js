const fs = require('fs/promises');

async function writeTalkers(newTalker, _req, res) {
  try {
      const oldFile = await fs.readFile('/app/src/talker.json')
        .then((result) => JSON.parse(result));
        const talkerData = newTalker;
        talkerData.id = oldFile.length + 1;
      const data = [...oldFile, talkerData];
      await fs.writeFile('/app/src/talker.json', JSON.stringify(data));
    return res.status(201).json(newTalker);
  } catch (e) { console.error(e); }
  }

  module.exports = writeTalkers;