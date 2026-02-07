const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Bağlantı Ayarları (Laragon varsayılanları)
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Laragon varsayılan kullanıcı adı 'root'tur
    password: '',      // Laragon varsayılan şifresi boştur
    database: 'kimya_oyunu', // HeidiSQL'de oluşturduğumuz ad
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Bağlantıyı test et
db.getConnection((err, connection) => {
    if (err) {
        console.error('Veri tabanına bağlanılamadı:', err.message);
    } else {
        console.log('MySQL veri tabanına başarıyla bağlandı!');
        connection.release();
    }
});

// API: Skor Kaydetme (POST)
app.post('/api/skor', (req, res) => {
    const { kullanici_adi, dogru_sayisi, sure } = req.body;

    const sql = 'INSERT INTO skorlar (kullanici_adi, dogru_sayisi, sure) VALUES (?, ?, ?)';
    
    db.query(sql, [kullanici_adi, dogru_sayisi, sure], (err, result) => {
        if (err) {
            console.error('Hata:', err);
            res.status(500).send('Sunucu hatası');
        } else {
            res.status(201).send('Skor kaydedildi');
        }
    });
});

// API: Skorları Getirme (GET)
app.get('/api/skor', (req, res) => {
    // EN SON KAYIT EDİLENLERİ EN ÜSTTE GÖSTERMEK İÇİN kayit_tarihi DESC kullanıyoruz
    const sql = 'SELECT kullanici_adi, dogru_sayisi, sure, kayit_tarihi FROM skorlar ORDER BY kayit_tarihi DESC';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Skorları çekerken hata:', err);
            res.status(500).send('Sunucu hatası');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});