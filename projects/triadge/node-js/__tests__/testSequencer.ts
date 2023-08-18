// customSequencer.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import Sequencer from '@jest/test-sequencer';
import fs from 'fs';
import path from 'path';

// Defina o caminho base de onde os módulos estão localizados.
const basePath = path.join(__dirname, '../path-to-your-modules-folder'); // Substitua pelo caminho apropriado

// Obter todos os nomes dos diretórios dentro da pasta basePath
const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Obtenha todos os módulos (pastas) e ordene-os alfabeticamente
const testOrder = getDirectories(basePath).sort();

class CustomSequencer extends Sequencer {
  sort(tests: Array<{ path: string }>): Array<{ path: string }> {
    const copyTests = Array.from(tests);

    return copyTests.sort((testA, testB) => {
      const indexA = testOrder.findIndex(order => testA.path.includes(order));
      const indexB = testOrder.findIndex(order => testB.path.includes(order));
      return indexA - indexB;
    });
  }
}

export = CustomSequencer;
