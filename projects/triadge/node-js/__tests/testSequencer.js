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
      const extractModuleNameFromPath = (p) => {
        const match = p.match(/src\/modules\/(.*?)\//);
        return match ? match[1] : '';
      };

      try {
        const moduleA = extractModuleNameFromPath(testA.path);
        const moduleB = extractModuleNameFromPath(testB.path);



        const indexA = testOrder.indexOf(moduleA);
        const indexB = testOrder.indexOf(moduleB);


        return indexA - indexB;
      } catch (error) {
          console.error("Sorting error:", error);
      }

    });
  }
}

module.exports = CustomSequencer;
