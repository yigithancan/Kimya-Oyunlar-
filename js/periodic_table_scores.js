document.addEventListener('DOMContentLoaded', () => {

    // Apps Script URL'si (OYUN SAYFASIYLA AYNI OLMALIDIR!)
    const WEB_APP_URL = 'http://localhost:3000/api/skor';    

    const scoresList = document.getElementById('scores-list');
    
    // Verileri Google Sheets'ten çeken ve gösteren fonksiyon
    function fetchAndDisplayScores() {
        if (!scoresList) {
             console.error("HATA: 'scores-list' ID'li element bulunamadı.");
             return;
        }

        scoresList.innerHTML = 'Skorlar yükleniyor...';
        
        // 🚀 GET isteği gönderiyoruz (Apps Script'teki doGet fonksiyonunu çalıştırır)
        fetch(WEB_APP_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Hata kodu: ${response.status}`);
                }
                return response.json();
            })
            .then(scores => {
                if (scores.length === 0) {
                    scoresList.innerHTML = 'Henüz kaydedilmiş bir skor bulunmamaktadır.';
                    return;
                }
                
                // Skorları sıralama mantığı (En yüksek doğru, sonra en kısa süre)
                scores.sort((a, b) => {
                    if (b.DogruSayisi !== a.DogruSayisi) {
                        return b.DogruSayisi - a.DogruSayisi;
                    }
                    return a.Sure - b.Sure;
                });

                // Tabloyu oluşturma
                let html = `
                    <table class="score-table">
                        <thead>
                            <tr style="background-color: #3f51b5; color: white;">
                                <th>Kullanıcı Adı</th>
                                <th>Tarih</th>
                                <th>Doğru Sayısı</th>
                                <th>Kalan Hak</th>
                                <th>Süre (sn)</th>
                                <th>Sonuç</th>
                            </tr>
                        </thead>
                    <tbody>
                `;
                
                scores.forEach((score) => {
                    // KAYBETTİ sonuçları için kırmızı satır rengi
                    const rowColor = score.Sonuc === 'KAYBETTİ' ? 'background-color: #ffdddd;' : ''; 
                    
                    html += `<tr style="${rowColor}">
                                <td>${score.KullaniciAdi}</td>
                                <td>${score.Tarih}</td>
                                <td>${score.DogruSayisi}</td>
                                <td>${score.KalanCan}</td>
                                <td>${score.Sure}</td>
                                <td>${score.Sonuc}</td>
                             </tr>`;
                });
                
                html += '</tbody></table>';
                scoresList.innerHTML = html;
                
            })
            .catch(error => {
                console.error("Skor çekme hatası:", error);
                scoresList.innerHTML = 'Skorlar yüklenirken bir hata oluştu. Lütfen Apps Script dağıtımını kontrol edin.';
            });
    }

    // Sayfa yüklendiğinde çalıştır
    fetchAndDisplayScores();
});