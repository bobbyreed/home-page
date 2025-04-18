const dataFile = path.join(__dirname, '../data/tricks.json');
const fs = require('fs');
const path = require('path');

async function getTricks() {
  try {
    const data = await fs.promises.readFile(dataFile, 'utf-8');
    return JSON.parse(data).tricks;
    } catch (error) {
    console.error('Error reading tricks data:', error);
}
}

async function getTrickById(id) {
  const tricks = await getTricks();
  return tricks.find(trick => trick.id === id);
}