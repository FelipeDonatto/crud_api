const fs = require('fs/promises');

async function editTalker(talkerId, talker, _req, res) {
  try {
      const oldFile = await fs.readFile('src/talker.json')
        .then((result) => JSON.parse(result));
        const oldData = oldFile.filter((e) => e.id !== Number(talkerId));
        const talkerData = talker;
        talkerData.id = Number(talkerId);
      const data = [...oldData, talkerData];
      await fs.writeFile('src/talker.json', JSON.stringify(data));
    return res.status(200).json(talkerData);
  } catch (e) { console.error(e); }
  }

  module.exports = editTalker;