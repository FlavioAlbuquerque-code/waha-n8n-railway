const express = require('express');
const { create } = require('@wppconnect-team/wppconnect');

const app = express();
const port = process.env.PORT || 3000;

create({
  session: 'sessionName',
  catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
    console.log('QR Code:', asciiQR);
  }
}).then((client) => {
  console.log('📱 Cliente conectado!');
});

app.get('/', (req, res) => {
  res.send('WAHA + WPPConnect rodando na Railway!');
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
