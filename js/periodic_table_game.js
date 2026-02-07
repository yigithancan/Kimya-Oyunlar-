document.addEventListener('DOMContentLoaded', () => {

    // LÜTFEN KONTROL EDİN: Bu URL, Apps Script'inizi dağıttığınız URL olmalıdır.
    const WEB_APP_URL = 'http://localhost:3000/api/skor';
    // 118 elementin tamamı (Mevcut listeniz)
    const elements = [
        { symbol: 'H', name: 'Hidrojen', atomicNumber: 1, row: 1, col: 1 },
        { symbol: 'He', name: 'Helyum', atomicNumber: 2, row: 1, col: 18 },
        { symbol: 'Li', name: 'Lityum', atomicNumber: 3, row: 2, col: 1 },
        { symbol: 'Be', name: 'Berilyum', atomicNumber: 4, row: 2, col: 2 },
        { symbol: 'B', name: 'Bor', atomicNumber: 5, row: 2, col: 13 },
        { symbol: 'C', name: 'Karbon', atomicNumber: 6, row: 2, col: 14 },
        { symbol: 'N', name: 'Azot', atomicNumber: 7, row: 2, col: 15 },
        { symbol: 'O', name: 'Oksijen', atomicNumber: 8, row: 2, col: 16 },
        { symbol: 'F', name: 'Flor', atomicNumber: 9, row: 2, col: 17 },
        { symbol: 'Ne', name: 'Neon', atomicNumber: 10, row: 2, col: 18 },
        { symbol: 'Na', name: 'Sodyum', atomicNumber: 11, row: 3, col: 1 },
        { symbol: 'Mg', name: 'Magnezyum', atomicNumber: 12, row: 3, col: 2 },
        { symbol: 'Al', name: 'Alüminyum', atomicNumber: 13, row: 3, col: 13 },
        { symbol: 'Si', name: 'Silisyum', atomicNumber: 14, row: 3, col: 14 },
        { symbol: 'P', name: 'Fosfor', atomicNumber: 15, row: 3, col: 15 },
        { symbol: 'S', name: 'Kükürt', atomicNumber: 16, row: 3, col: 16 },
        { symbol: 'Cl', name: 'Klor', atomicNumber: 17, row: 3, col: 17 },
        { symbol: 'Ar', name: 'Argon', atomicNumber: 18, row: 3, col: 18 },
        { symbol: 'K', name: 'Potasyum', atomicNumber: 19, row: 4, col: 1 },
        { symbol: 'Ca', name: 'Kalsiyum', atomicNumber: 20, row: 4, col: 2 },
        { symbol: 'Sc', name: 'Skandiyum', atomicNumber: 21, row: 4, col: 3 },
        { symbol: 'Ti', name: 'Titanyum', atomicNumber: 22, row: 4, col: 4 },
        { symbol: 'V', name: 'Vanadyum', atomicNumber: 23, row: 4, col: 5 },
        { symbol: 'Cr', name: 'Krom', atomicNumber: 24, row: 4, col: 6 },
        { symbol: 'Mn', name: 'Mangan', atomicNumber: 25, row: 4, col: 7 },
        { symbol: 'Fe', name: 'Demir', atomicNumber: 26, row: 4, col: 8 },
        { symbol: 'Co', name: 'Kobalt', atomicNumber: 27, row: 4, col: 9 },
        { symbol: 'Ni', name: 'Nikel', atomicNumber: 28, row: 4, col: 10 },
        { symbol: 'Cu', name: 'Bakır', atomicNumber: 29, row: 4, col: 11 },
        { symbol: 'Zn', name: 'Çinko', atomicNumber: 30, row: 4, col: 12 },
        { symbol: 'Ga', name: 'Galyum', atomicNumber: 31, row: 4, col: 13 },
        { symbol: 'Ge', name: 'Germanyum', atomicNumber: 32, row: 4, col: 14 },
        { symbol: 'As', name: 'Arsenik', atomicNumber: 33, row: 4, col: 15 },
        { symbol: 'Se', name: 'Selenyum', atomicNumber: 34, row: 4, col: 16 },
        { symbol: 'Br', name: 'Brom', atomicNumber: 35, row: 4, col: 17 },
        { symbol: 'Kr', name: 'Kripton', atomicNumber: 36, row: 4, col: 18 },
        { symbol: 'Rb', name: 'Rubidyum', atomicNumber: 37, row: 5, col: 1 },
        { symbol: 'Sr', name: 'Stronsiyum', atomicNumber: 38, row: 5, col: 2 },
        { symbol: 'Y', name: 'İtriyum', atomicNumber: 39, row: 5, col: 3 },
        { symbol: 'Zr', name: 'Zirkonyum', atomicNumber: 40, row: 5, col: 4 },
        { symbol: 'Nb', name: 'Niyobyum', atomicNumber: 41, row: 5, col: 5 },
        { symbol: 'Mo', name: 'Molibden', atomicNumber: 42, row: 5, col: 6 },
        { symbol: 'Tc', name: 'Teknesyum', atomicNumber: 43, row: 5, col: 7 },
        { symbol: 'Ru', name: 'Rutenyum', atomicNumber: 44, row: 5, col: 8 },
        { symbol: 'Rh', name: 'Rodyum', atomicNumber: 45, row: 5, col: 9 },
        { symbol: 'Pd', name: 'Paladyum', atomicNumber: 46, row: 5, col: 10 },
        { symbol: 'Ag', name: 'Gümüş', atomicNumber: 47, row: 5, col: 11 },
        { symbol: 'Cd', name: 'Kadmiyum', atomicNumber: 48, row: 5, col: 12 },
        { symbol: 'In', name: 'İndiyum', atomicNumber: 49, row: 5, col: 13 },
        { symbol: 'Sn', name: 'Kalay', atomicNumber: 50, row: 5, col: 14 },
        { symbol: 'Sb', name: 'Antimon', atomicNumber: 51, row: 5, col: 15 },
        { symbol: 'Te', name: 'Tellür', atomicNumber: 52, row: 5, col: 16 },
        { symbol: 'I', name: 'İyot', atomicNumber: 53, row: 5, col: 17 },
        { symbol: 'Xe', name: 'Ksenon', atomicNumber: 54, row: 5, col: 18 },
        { symbol: 'Cs', name: 'Sezyum', atomicNumber: 55, row: 6, col: 1 },
        { symbol: 'Ba', name: 'Baryum', atomicNumber: 56, row: 6, col: 2 },
        { symbol: 'La', name: 'Lantan', atomicNumber: 57, row: 8, col: 3 },
        { symbol: 'Ce', name: 'Seryum', atomicNumber: 58, row: 8, col: 4 },
        { symbol: 'Pr', name: 'Praseodim', atomicNumber: 59, row: 8, col: 5 },
        { symbol: 'Nd', name: 'Neodimyum', atomicNumber: 60, row: 8, col: 6 },
        { symbol: 'Pm', name: 'Prometyum', atomicNumber: 61, row: 8, col: 7 },
        { symbol: 'Sm', name: 'Samaryum', atomicNumber: 62, row: 8, col: 8 },
        { symbol: 'Eu', name: 'Evropyum', atomicNumber: 63, row: 8, col: 9 },
        { symbol: 'Gd', name: 'Gadolinyum', atomicNumber: 64, row: 8, col: 10 },
        { symbol: 'Tb', name: 'Terbiyum', atomicNumber: 65, row: 8, col: 11 },
        { symbol: 'Dy', name: 'Disprozyum', atomicNumber: 66, row: 8, col: 12 },
        { symbol: 'Ho', name: 'Holmiyum', atomicNumber: 67, row: 8, col: 13 },
        { symbol: 'Er', name: 'Erbiyum', atomicNumber: 68, row: 8, col: 14 },
        { symbol: 'Tm', name: 'Tulyum', atomicNumber: 69, row: 8, col: 15 },
        { symbol: 'Yb', name: 'İterbiyum', atomicNumber: 70, row: 8, col: 16 },
        { symbol: 'Lu', name: 'Lutesyum', atomicNumber: 71, row: 8, col: 17 },
        { symbol: 'Hf', name: 'Hafniyum', atomicNumber: 72, row: 6, col: 4 },
        { symbol: 'Ta', name: 'Tantal', atomicNumber: 73, row: 6, col: 5 },
        { symbol: 'W', name: 'Tungsten', atomicNumber: 74, row: 6, col: 6 },
        { symbol: 'Re', name: 'Renyum', atomicNumber: 75, row: 6, col: 7 },
        { symbol: 'Os', name: 'Osmiyum', atomicNumber: 76, row: 6, col: 8 },
        { symbol: 'Ir', name: 'İridyum', atomicNumber: 77, row: 6, col: 9 },
        { symbol: 'Pt', name: 'Platin', atomicNumber: 78, row: 6, col: 10 },
        { symbol: 'Au', name: 'Altın', atomicNumber: 79, row: 6, col: 11 },
        { symbol: 'Hg', name: 'Cıva', atomicNumber: 80, row: 6, col: 12 },
        { symbol: 'Tl', name: 'Talyum', atomicNumber: 81, row: 6, col: 13 },
        { symbol: 'Pb', name: 'Kurşun', atomicNumber: 82, row: 6, col: 14 },
        { symbol: 'Bi', name: 'Bizmut', atomicNumber: 83, row: 6, col: 15 },
        { symbol: 'Po', name: 'Polonyum', atomicNumber: 84, row: 6, col: 16 },
        { symbol: 'At', name: 'Astatin', atomicNumber: 85, row: 6, col: 17 },
        { symbol: 'Rn', name: 'Radon', atomicNumber: 86, row: 6, col: 18 },
        { symbol: 'Fr', name: 'Fransiyum', atomicNumber: 87, row: 7, col: 1 },
        { symbol: 'Ra', name: 'Radyum', atomicNumber: 88, row: 7, col: 2 },
        { symbol: 'Ac', name: 'Aktinyum', atomicNumber: 89, row: 9, col: 3 },
        { symbol: 'Th', name: 'Toryum', atomicNumber: 90, row: 9, col: 4 },
        { symbol: 'Pa', name: 'Protaktinyum', atomicNumber: 91, row: 9, col: 5 },
        { symbol: 'U', name: 'Uranyum', atomicNumber: 92, row: 9, col: 6 },
        { symbol: 'Np', name: 'Neptünyum', atomicNumber: 93, row: 9, col: 7 },
        { symbol: 'Pu', name: 'Plütonyum', atomicNumber: 94, row: 9, col: 8 },
        { symbol: 'Am', name: 'Amerikyum', atomicNumber: 95, row: 9, col: 9 },
        { symbol: 'Cm', name: 'Küriyum', atomicNumber: 96, row: 9, col: 10 },
        { symbol: 'Bk', name: 'Berkelyum', atomicNumber: 97, row: 9, col: 11 },
        { symbol: 'Cf', name: 'Kaliforniyum', atomicNumber: 98, row: 9, col: 12 },
        { symbol: 'Es', name: 'Aynştaynyum', atomicNumber: 99, row: 9, col: 13 },
        { symbol: 'Fm', name: 'Fermiyum', atomicNumber: 100, row: 9, col: 14 },
        { symbol: 'Md', name: 'Mendelevyum', atomicNumber: 101, row: 9, col: 15 },
        { symbol: 'No', name: 'Nobelyum', atomicNumber: 102, row: 9, col: 16 },
        { symbol: 'Lr', name: 'Lavrensiyum', atomicNumber: 103, row: 9, col: 17 },
        { symbol: 'Rf', name: 'Rutherfordiyum', atomicNumber: 104, row: 7, col: 4 },
        { symbol: 'Db', name: 'Dubniyum', atomicNumber: 105, row: 7, col: 5 },
        { symbol: 'Sg', name: 'Seaborgiyum', atomicNumber: 106, row: 7, col: 6 },
        { symbol: 'Bh', name: 'Bohriyum', atomicNumber: 107, row: 7, col: 7 },
        { symbol: 'Hs', name: 'Hassiyum', atomicNumber: 108, row: 7, col: 8 },
        { symbol: 'Mt', name: 'Meitneriyum', atomicNumber: 109, row: 7, col: 9 },
        { symbol: 'Ds', name: 'Darmstadtiyum', atomicNumber: 110, row: 7, col: 10 },
        { symbol: 'Rg', name: 'Röntgenyum', atomicNumber: 111, row: 7, col: 11 },
        { symbol: 'Cn', 'name': 'Kopernikyum', atomicNumber: 112, row: 7, col: 12 },
        { symbol: 'Nh', name: 'Nihonyum', atomicNumber: 113, row: 7, col: 13 },
        { symbol: 'Fl', name: 'Flerovyum', atomicNumber: 114, row: 7, col: 14 },
        { symbol: 'Mc', name: 'Moskovyum', atomicNumber: 115, row: 7, col: 15 },
        { symbol: 'Lv', name: 'Livermoryum', atomicNumber: 116, row: 7, col: 16 },
        { symbol: 'Ts', name: 'Tennesin', atomicNumber: 117, row: 7, col: 17 },
        { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, row: 7, col: 18 }
    ];

    
    const table = document.getElementById('periodic-table');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options');
    const feedback = document.getElementById('feedback');
    const livesSpan = document.getElementById('lives');
    const timerSpan = document.getElementById('timer');

    let lives = 4;
    let timer;
    let timeLeft = 15; 
    let currentElement = null;
    let foundElements = 0;
    let isQuestionActive = false; // Kilit değişkeni
    let startTime; // Başlangıç zamanı
    
    // ----------------------------------------------------------------
    // 🏆 SKOR KAYIT FONKSİYONU (Apps Script'e POST Ediyor)
    // ----------------------------------------------------------------
async function saveScoreToDatabase(scoreData) { // async keyword'ünü ekledik
    console.log("Skor gönderiliyor:", scoreData);
    
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            // mode: 'no-cors', KALDIRILDI
            headers: {
                'Content-Type': 'application/json' // Bu ayar JSON göndermek için GEREKLİ
            },
            body: JSON.stringify(scoreData) // Verileri JSON formatına dönüştürüp gönderiyoruz
        });

        if (response.ok) { // Cevap 200-299 aralığındaysa başarılı demektir
            console.log("Skor veritabanına başarıyla kaydedildi.");
        } else {
            // Sunucudan gelen hata mesajını görmemizi sağlar
            const errorText = await response.text(); 
            console.error("Skor kaydetme hatası (Sunucu):", response.status, errorText);
        }
    } catch (error) {
        console.error("Skor kaydetme hatası (Fetch API):", error);
    }
}

// ----------------------------------------------------------------
// 📊 SKORLARI ÇEKME FONKSİYONU
// ----------------------------------------------------------------
async function fetchScores() {
    console.log("Skorlar sunucudan çekiliyor...");
    const leaderBoardBody = document.getElementById('leaderboard-body');
    leaderBoardBody.innerHTML = '<tr><td colspan="4">Yükleniyor...</td></tr>';

    try {
        // Node.js'deki GET API adresini kullanıyoruz.
        const response = await fetch(WEB_APP_URL); // WEB_APP_URL = 'http://localhost:3000/api/skor'
        
        if (!response.ok) {
            throw new Error(`HTTP hata kodu: ${response.status}`);
        }

        const scores = await response.json(); // Gelen JSON verisini ayrıştır

        // Tabloyu Temizle
        leaderBoardBody.innerHTML = ''; 

        if (scores.length === 0) {
            leaderBoardBody.innerHTML = '<tr><td colspan="4">Henüz skor yok. İlk skoru kaydet!</td></tr>';
        } else {
            scores.forEach((score, index) => {
                const row = leaderBoardBody.insertRow();
                
                // NOT: Alan adları MySQL tablonuzdaki gibi olmalıdır!
                row.insertCell(0).textContent = index + 1; // Sıra numarası
                row.insertCell(1).textContent = score.kullanici_adi; // Kullanıcı Adı
                row.insertCell(2).textContent = score.dogru_sayisi; // Doğru Sayısı
                row.insertCell(3).textContent = `${score.sure} sn`; // Süre (Saniye)
                
                if (index < 3) {
                    row.classList.add('top-score'); // İlk 3 için görsel vurgu
                }
            });
        }
    } catch (error) {
        console.error("Liderlik tablosu yüklenirken hata oluştu:", error);
        leaderBoardBody.innerHTML = '<tr><td colspan="4">Skorlar yüklenemedi. Sunucu çalışıyor mu?</td></tr>';
    }
}
// ----------------------------------------------------------------
    // ----------------------------------------------------------------
    
    // Oyun Başlangıcı ve Kullanıcı Kontrolü
    function initializeGame() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Lütfen önce kullanıcı adınızı girin.');
            window.location.href = 'periodic_table_login.html';
            return;
        }
        startTime = Date.now(); // Oyuna başlama zamanını kaydet
        livesSpan.textContent = lives;
    }
    // ----------------------------------------------------------------

    // Periyodik Tabloyu Oluşturur
    function createTable() {
        for (let i = 1; i <= 9 * 18; i++) {
            const cell = document.createElement('div');
            table.appendChild(cell);
        }
        elements.forEach(el => {
            const index = (el.row - 1) * 18 + (el.col - 1);
            if(table.children[index]) {
                const elementBox = table.children[index];
                elementBox.classList.add('element-box');
                elementBox.dataset.atomicNumber = el.atomicNumber;
                
                elementBox.addEventListener('click', () => selectElement(el, elementBox));
            }
        });
    }
    
    // Element Kutucuğuna Tıklanınca Çalışır
    function selectElement(element, box) {
        // Zaten bulunmuşsa veya soru aktifse engelle
        if (box.classList.contains('found') || isQuestionActive) return; 
        
        isQuestionActive = true; 
        currentElement = element;
        box.style.transform = 'scale(1.5)';
        displayQuestion(element);
    }

    // Soruyu ve Seçenekleri Gösterir
    function displayQuestion(correctElement) {
        questionContainer.style.display = 'block';
        optionsContainer.innerHTML = '';
        
        let options = [correctElement.name];
        while (options.length < 4) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            if (!options.includes(randomElement.name)) {
                options.push(randomElement.name);
            }
        }
        options.sort(() => Math.random() - 0.5);

        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
        clearInterval(timer); 
        startTimer();
    }
    
    // Cevabı Kontrol Eder
    function checkAnswer(selectedOption) {
        clearInterval(timer); 
        const correct = selectedOption === currentElement.name;
        const box = document.querySelector(`[data-atomic-number='${currentElement.atomicNumber}']`);
        
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        optionButtons.forEach(btn => btn.disabled = true); 

        if (correct) {
            // DOĞRU CEVAP
            feedback.textContent = 'Doğru! Harika!';
            feedback.style.color = '#4caf50';
            box.textContent = currentElement.symbol; 
            box.classList.add('found');
            box.classList.add('correct-animation');
            box.style.transform = 'scale(1)'; 
            
            foundElements++;
            box.title = currentElement.name; 
            
            if(foundElements === elements.length) {
                endGame(true); // Tüm elementler bulundu
            } else {
                setTimeout(() => {
                    questionContainer.style.display = 'none'; 
                    feedback.textContent = '';
                    box.classList.remove('correct-animation');
                    isQuestionActive = false; // Kilit kaldırıldı: Yeni seçim yapılabilir
                }, 1000); 
            }
            
        } else {
            // YANLIŞ CEVAP
            lives--; 
            if (lives < 0) lives = 0;
            livesSpan.textContent = lives; 
            
            feedback.textContent = 'Yanlış cevap! Tekrar dene.'; 
            feedback.style.color = '#f44336';
            feedback.classList.add('wrong-animation'); 
            
            setTimeout(() => {
                feedback.classList.remove('wrong-animation');
                
                if (lives <= 0) {
                    box.textContent = currentElement.symbol; 
                    box.title = currentElement.name; 
                    box.style.backgroundColor = '#f44336'; 
                    box.style.transform = 'scale(1)'; 
                    endGame(false); // Can bitti
                } else {
                    feedback.textContent = ''; 
                    startTimer(); // Tekrar süre başlat
                    optionButtons.forEach(btn => btn.disabled = false); // Seçenekleri tekrar aktifleştir
                    box.style.transform = 'scale(1.5)'; 
                }
            }, 500);
        }
    }

    // Geri Sayım Sayacını Başlatır
    function startTimer() {
        timeLeft = 15; 
        timerSpan.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = timeLeft;
            if (timeLeft <= 0) { 
                clearInterval(timer);
                
                const box = document.querySelector(`[data-atomic-number='${currentElement.atomicNumber}']`);

                lives--; // Süre bitince Can düşürülüyor
                if (lives < 0) lives = 0;
                livesSpan.textContent = lives; 
                
                questionContainer.style.display = 'none'; 
                isQuestionActive = false; 

                if (lives <= 0) {
                    box.textContent = currentElement.symbol; 
                    box.title = currentElement.name; 
                    box.style.backgroundColor = '#f44336'; 
                    box.style.transform = 'scale(1)'; 
                    endGame(false); 
                } else {
                    feedback.textContent = 'Süre doldu! Yeni bir element seç.';
                    feedback.style.color = '#f44336';
                    box.style.transform = 'scale(1)'; 
                    
                    setTimeout(() => {
                        feedback.textContent = '';
                    }, 2000); 
                }
            }
        }, 1000);
    }
    
    // ----------------------------------------------------------------
    // 🥇 OYUN BİTİŞ FONKSİYONU (Skoru Sheets'e Gönderme)
    // ----------------------------------------------------------------
    function endGame(isWin) {
        clearInterval(timer); 
        
        isQuestionActive = true;
        table.style.pointerEvents = 'none'; // Tabloyu tamamen devre dışı bırak
        
        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTime) / 1000);
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            const scoreData = {
                kullanici_adi: currentUser,
                dogru_sayisi: foundElements,
                sure: durationSeconds,
                date: new Date().toLocaleDateString('tr-TR'),
                correct: foundElements,
                livesLeft: lives, 
                duration: durationSeconds,
                result: isWin ? 'KAZANDI' : 'KAYBETTİ'
            };
            
            // SKOR KAYIT İŞLEMİ BURADA! (Sheets'e gönder)
            saveScoreToDatabase(scoreData);
        }
        
        // Görsel Kapanış İşlemleri
        questionContainer.style.display = 'none';
        
        if (isWin) {
            feedback.textContent = "🎉 Tebrikler! Tüm elementleri buldun!";
            feedback.style.color = 'blue';
        } else {
            feedback.innerHTML = `Game Over! ${currentUser ? currentUser + " için" : ""} <br> Doğru: ${foundElements}, Süre: ${durationSeconds} saniye.`;
            feedback.style.color = 'darkred';
        }
        
        // En son Giriş bilgisini temizle
        localStorage.removeItem('currentUser');
    }
    // ------------------------------------------

    createTable();
    initializeGame(); // Oyunu başlat
    fetchScores();
});