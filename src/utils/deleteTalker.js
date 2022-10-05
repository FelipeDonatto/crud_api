const fs = require('fs/promises');

async function deleteTalker(talkerId, _req, res) {
  try {
      const oldFile = await fs.readFile('/app/src/talker.json')
        .then((result) => JSON.parse(result));
        const data = oldFile.filter((e) => e.id !== Number(talkerId));
      await fs.writeFile('/app/src/talker.json', JSON.stringify(data));
    return res.status(204).json();
  } catch (e) { console.error(e); }
  }

  module.exports = deleteTalker;