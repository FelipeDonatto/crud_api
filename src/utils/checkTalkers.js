const fs = require('fs/promises');

async function checkTalkers() {
    try {
    const fileContent = await fs.readFile('/app/src/talker.json');
    if (!fileContent) {
      return [];
    }
    return JSON.parse(fileContent);
  } catch (e) {
    console.error(e);
  }
  }

  module.exports = checkTalkers;