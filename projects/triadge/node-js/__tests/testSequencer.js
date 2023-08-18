// customSequencer.js

const Sequencer = require('@jest/test-sequencer').default;
const fs = require('fs');
const path = require('path');

// Defina o caminho base de onde os módulos estão localizados.
const basePath = path.join(__dirname, '../src/modules/');

// Obter todos os nomes dos diretórios dentro da pasta basePath
function getDirectories(source) {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

// Obtenha todos os módulos (pastas) e ordene-os alfabeticamente
const testOrder = getDirectories(basePath).sort();

console.log(testOrder)

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);

    return copyTests.sort((testA, testB) => {
      const indexA = testOrder.findIndex(order => testA.path.includes(order));
      const indexB = testOrder.findIndex(order => testB.path.includes(order));
      return indexA - indexB;
    });
  }
}

module.exports = CustomSequencer;
