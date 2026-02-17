const fs = require('node:fs/promises');

fs.writeFile('write.txt', 'Node.js is awesome platform')
  .then(() => console.log('OK'))
  .catch((error) => console.error(error));
