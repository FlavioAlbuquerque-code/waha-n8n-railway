const express = require('express');
const { create } = require('@waha/core');
const venom = require('@waha/venom');

const app = express();
const PORT = process.env.PORT || 3000;

let currentQrCode = '';

app.get('/', (req, res) => {
  res.send('WAHA com Venom está rodando! Vá para /qr para escanear o QR Code.');
});

app.get('/qr', (req, res) => {
  if (currentQrCode) {
    res.send(`<img src="data:image/png;base64,${currentQrCode}" />`);
  } else {
    res.send('QR Code ainda não gerado. Aguarde...');
  }
});

const startBot = async () => {
  await create({
    driver: venom,
    port: 3001,
    catchQR: (qrCode) => {
      currentQrCode = qrCode;
      console.log('✅ Escaneie o QR Code com seu WhatsApp Business');
    },
    onConnected: () => {
      console.log('🎉 WAHA conectado com sucesso!');
    },
    onDisconnected: () => {
      console.log('⚠️ Desconectado. Reiniciando em 5 segundos...');
      setTimeout(startBot, 5000);
    },
  });
};

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  startBot();
});
