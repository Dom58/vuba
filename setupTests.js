/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const importMockFiles = (
  dir = path.join(__dirname, 'src/__mocks__'),
  importPath = './src/__mocks__',
) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      importMockFiles(`${dir}/${file}`, `${importPath}/${file}`);
    } else if (file.indexOf('.') !== 0 && file.slice(-3) === '.js') {
      require(`${importPath}/${file}`);
    }
  });
};

importMockFiles();
