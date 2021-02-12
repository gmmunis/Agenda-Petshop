const fs = require('fs');

fs.readFile('./assets/ambully.jpg', (erro, buffer) => {
    console.log('imagem foi bufferizada');

    fs.writeFile('./assets/ambully2.jpg', buffer, erro => {
        console.log('imagem foi escrita');
    });
});