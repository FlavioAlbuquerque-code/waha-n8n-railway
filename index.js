const express = require('express');
const { create } = require('@devlikeapro/waha-core');
const venom = require('@devlikeapro/waha-venom');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('WAHA com Venom está rodando! Vá para /qr para escanear o QR Code.');
});

let currentQrCode = '';

const startBot = async () => {
  await create({
    driver: venom,
    port: 3001,
    catchQR: (qrCodeUrl) => {
      currentQrCode = qrCodeUrl;
      console.log('📲 Escaneie o QR Code:');
      console.log(qrCodeUrl);
    },
    onConnected: () => {
      console.log('🤖 Bot conectado com sucesso!');
    },
  });
};

app.get('/qr', (_, res) => {
  res.send(`<img src="${currentQrCode}" />`);
});

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
  startBot();
});
