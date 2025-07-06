// Gerekli kütüphaneler
const express = require('express');
const axios = require("axios");
require("dotenv").config();

const app = express();
// Railway'in verdiği portu veya varsayılan olarak 3000'i kullan
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot aktif ve Railway üzerinde çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda dinleniyor.`);
});

// .env dosyasından veya Railway değişkenlerinden bilgileri al
const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;
const message = process.env.MESSAGE;

if (!token || !channelId || !message) {
    console.error("HATA: TOKEN, CHANNEL_ID veya MESSAGE değişkenlerinden biri eksik!");
} else {
    // Her 5 saniyede bir mesaj gönder
    setInterval(sendMessage, 5000);
}

function sendMessage() {
  axios.post(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    content: message
  }, {
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    }
  }).then(() => {
    console.log(`✅ Mesaj başarıyla gönderildi: "${message}"`);
  }).catch((err) => {
    console.error("❌ Mesaj gönderilemedi. Hata:", err.response?.status, err.response?.data);
  });
}
