const fs = require('fs');

fs.createReadStream('./assets/ambully.jpg')
    .pipe(fs.createWriteStream('./assets/ambully-stream.jpg'))
    .on('finish', () => console.log('Imagem foi escrita com sucesso'))