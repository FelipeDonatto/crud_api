const fs = require('fs/promises');

async function findTalker(id) {
    try {
    const fileContent = await fs.readFile('/app/src/talker.json');
    const talker = JSON.parse(fileContent).find((e) => e.id === Number(id));
    if (!talker) {
      return 'NOT FOUND';
    }
    return talker;
  } catch (e) {
    console.error(e);
  }
  }

  module.exports = findTalker;