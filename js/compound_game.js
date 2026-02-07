document.addEventListener('DOMContentLoaded', () => {

    // Bileşik Havuzu
    const compoundPool = {
        'H,O': 'H₂O (Su)', 'Cl,Na': 'NaCl (Sofra Tuzu)', 'C,O': 'CO₂ (Karbondioksit)', 'Cl,H': 'HCl (Hidroklorik Asit)', 'H,N': 'NH₃ (Amonyak)', 'Ca,O': 'CaO (Sönmemiş Kireç)', 'Mg,O': 'MgO (Magnezyum Oksit)', 'H,S': 'H₂S (Hidrojen Sülfür)', 'Al,O': 'Al₂O₃ (Alüminyum Oksit)', 'Fe,O': 'Fe₂O₃ (Demir(III) Oksit - Pas)', 'Br,K': 'KBr (Potasyum Bromür)', 'I,K': 'KI (Potasyum İyodür)', 'C,H': 'CH₄ (Metan)', 'O,Si': 'SiO₂ (Silisyum Dioksit - Kum)', 'F,H': 'HF (Hidrojen Florür)'
    };
    
    // Compound Pool'daki tüm element sembollerini çıkar
    const allElementSymbols = Array.from(new Set(
        Object.keys(compoundPool).flatMap(key => key.split(','))
    )).sort();

    const elementsContainer = document.getElementById('elements-container');
    const compoundsFoundContainer = document.getElementById('compounds-found');
    const feedback = document.getElementById('compound-feedback');
    const showAnswersBtn = document.getElementById('show-answers-btn');
    const answersPanel = document.getElementById('answers-panel');
    const answersList = document.getElementById('answers-list');

    // YENİ GLOBAL DEĞİŞKEN: Daha önce kullanılmış tüm bileşikleri tutar
    let usedCompounds = []; 
    
    let selectedElements = [];
    let possibleCompoundsInRound = [];
    let foundCompounds = [];

    // --- Fonksiyon: Olası Bileşikleri Hesapla ---
    function calculatePossibleCompounds(elements) {
        const compounds = [];
        for (let i = 0; i < elements.length; i++) {
            for (let j = i + 1; j < elements.length; j++) {
                const sym1 = elements[i];
                const sym2 = elements[j];
                const key = [sym1, sym2].sort().join(',');
                if (compoundPool[key]) {
                    compounds.push(compoundPool[key]);
                }
            }
        }
        return compounds;
    }


    // --- 1. Oyunu Başlatma (GELİŞTİRİLDİ) ---
    function startGame() {
        // Tüm bileşikler kullanıldıysa oyunu bitir.
        if (usedCompounds.length === Object.keys(compoundPool).length) {
            feedback.innerHTML = '🎉 Tebrikler! Oyundaki **tüm** bileşikleri başarıyla buldunuz! 🎉';
            feedback.style.color = 'purple';
            elementsContainer.innerHTML = '';
            compoundsFoundContainer.innerHTML = '';
            return;
        }

        elementsContainer.innerHTML = '';
        compoundsFoundContainer.innerHTML = '';
        feedback.textContent = '';
        
        selectedElements = [];
        foundCompounds = [];
        
        let elementsToShow = [];
        let possibleCompounds = [];
        
        let attemptCount = 0;
        const MAX_ATTEMPTS = 100; // Sonsuz döngüyü engellemek için

        // DÖNGÜ: Minimum 4 olası bileşik bulana ve Tümü DAHA ÖNCE KULLANILMAMIŞ olana kadar element seç
        do {
            elementsToShow = [];
            const numElements = 5 + Math.floor(Math.random() * 4); // 5 ile 8 arası element
            
            // Rastgele ve farklı element seçimi
            while (elementsToShow.length < numElements) {
                const randomIndex = Math.floor(Math.random() * allElementSymbols.length);
                const randomSymbol = allElementSymbols[randomIndex];
                if (!elementsToShow.includes(randomSymbol)) {
                    elementsToShow.push(randomSymbol);
                }
            }
            
            possibleCompounds = calculatePossibleCompounds(elementsToShow);
            
            // Yeni turdaki olası bileşiklerin hepsi daha önce kullanıldı mı?
            const allUsed = possibleCompounds.every(compound => usedCompounds.includes(compound));

            attemptCount++;

            // Şart: En az 4 bileşik olmalı VE (Hepsi kullanıldıysa VEYA 0 bileşik varsa) tekrar denenmeli
        } while (possibleCompounds.length < 4 || (attemptCount < MAX_ATTEMPTS && possibleCompounds.every(compound => usedCompounds.includes(compound))));
        
        
        // Eğer max denemeye rağmen uygun set bulunamazsa (ki bu çok nadir olmalı), uyarı verip mevcut set ile devam et
        if (attemptCount === MAX_ATTEMPTS) {
            console.warn("Max denemeye ulaşıldı. Tüm bileşikler kullanılmış olabilir.");
            // Bu durumda, sadece kullanılmamış bileşikleri tur hedefine ekle (4'ten az olabilir)
            possibleCompounds = possibleCompounds.filter(compound => !usedCompounds.includes(compound));
        }

        // Tur hedefine, SADECE daha önce kullanılmamış bileşikleri dahil et
        possibleCompoundsInRound = possibleCompounds.filter(compound => !usedCompounds.includes(compound));
        
        // Tur hedefinde 4'ten az kaldıysa (çünkü çoğu kullanılmış), o setten en az 1 tane yeni bileşik olsa yeter.
        if (possibleCompoundsInRound.length === 0) {
             // Bu durumda oyun bitişi tetiklenmeli
             feedback.innerHTML = '🎉 Tebrikler! Oyundaki **tüm** bileşikleri başarıyla buldunuz! 🎉';
             feedback.style.color = 'purple';
             return;
        }

        displayElements(elementsToShow);
        
        // Cevap panelini sıfırla ve gizle
        answersPanel.classList.add('answers-panel-hidden');
        answersList.innerHTML = '';
        showAnswersBtn.textContent = 'Cevapları Göster';
    }

    // --- 2. Elementleri Ekranda Gösterme ---
    function displayElements(elementsToShow) {
        elementsToShow.forEach(symbol => {
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('compound-element');
            elementDiv.textContent = symbol;
            elementDiv.dataset.symbol = symbol;
            elementDiv.addEventListener('click', () => selectElement(elementDiv));
            elementsContainer.appendChild(elementDiv);
        });
    }

    // --- 3. Element Seçimi ---
    function selectElement(elementDiv) {
        const symbol = elementDiv.dataset.symbol;

        if (elementDiv.classList.contains('selected')) {
            elementDiv.classList.remove('selected');
            selectedElements = selectedElements.filter(s => s !== symbol);
            feedback.textContent = `Seçilen: ${selectedElements.join(' + ')}`;
        } else if (selectedElements.length < 2) {
            elementDiv.classList.add('selected');
            selectedElements.push(symbol);
            feedback.textContent = `Seçilen: ${selectedElements.join(' + ')}`;
        } else {
            feedback.textContent = 'Sadece iki element seçebilirsin.';
            return;
        }

        if (selectedElements.length === 2) {
            checkCombination();
        }
    }

    // --- 4. Bileşik Kontrolü (GELİŞTİRİLDİ) ---
    function checkCombination() {
        const key = selectedElements.sort().join(',');
        const selectedDivs = document.querySelectorAll('.compound-element.selected');

        if (compoundPool[key]) {
            const compoundFormula = compoundPool[key];
            
            // Eğer bileşik daha önce hiç kullanılmamış VE bu turdaki hedef listesindeyse
            if (possibleCompoundsInRound.includes(compoundFormula)) {
                 // Doğru ve Yeni Bileşik
                feedback.textContent = `✅ Başarılı! ${compoundFormula} oluşturdun.`;
                feedback.style.color = '#4caf50';
                addCompoundToFound(compoundFormula);
                
                // *** KRİTİK GÜNCELLEME: Kullanılmış listesine ekle ***
                usedCompounds.push(compoundFormula); 
                
                selectedDivs.forEach(div => div.classList.add('correct-animation'));
            } 
            else if (foundCompounds.includes(compoundFormula)) {
                feedback.textContent = `🚫 Bu bileşiği (${compoundFormula}) zaten buldun (bu turda).`;
                feedback.style.color = '#f57c00';
                selectedDivs.forEach(div => div.classList.add('wrong-animation'));
            }
            else {
                // Bu bileşik, önceki turlarda bulunmuş olabilir veya bu turdaki elementlerle oluşturulabilse de hedef setin dışındadır.
                 feedback.textContent = `❌ ${compoundFormula} doğru bir bileşik ama bu turda hedef değil.`;
                 feedback.style.color = '#f44336';
                 selectedDivs.forEach(div => div.classList.add('wrong-animation'));
            }
        } else {
            // Yanlış Bileşik
            feedback.textContent = `❌ ${selectedElements.join(' + ')} bir bileşik oluşturmuyor.`;
            feedback.style.color = '#f44336';
            selectedDivs.forEach(div => div.classList.add('wrong-animation'));
        }
        
        // Geri bildirimden sonra sıfırlama
        setTimeout(() => {
            selectedDivs.forEach(div => {
                div.classList.remove('selected', 'correct-animation', 'wrong-animation');
            });
            selectedElements = [];
            feedback.textContent = '';
            
            // TÜM OLASI BİLEŞİKLER bulunduğunda (bu turdaki hedefler) oyunu bitir
            if (foundCompounds.length === possibleCompoundsInRound.length && possibleCompoundsInRound.length > 0) {
                feedback.textContent = `Tebrikler! Turu bitirdiniz! (${foundCompounds.length} YENİ bileşik buldunuz). Yeni Tur Başlıyor...`;
                feedback.style.color = '#0277bd';
                setTimeout(startGame, 3000); 
            }
        }, 1000);
    }

    // --- 5. Bulunan Bileşiği Ekleme ---
    function addCompoundToFound(compoundFormula) {
        foundCompounds.push(compoundFormula);
        
        const compoundDiv = document.createElement('div');
        compoundDiv.classList.add('compound-element');
        compoundDiv.textContent = compoundFormula;
        compoundDiv.style.backgroundColor = '#4caf50'; // Yeşil arka plan
        compoundDiv.style.color = 'white';
        compoundsFoundContainer.appendChild(compoundDiv);
        
        // Cevap listesi açıksa, yeni bulunanı işaretle
        if (!answersPanel.classList.contains('answers-panel-hidden')) {
            const allListItems = answersList.querySelectorAll('li');
            allListItems.forEach(item => {
                if (item.textContent === compoundFormula) {
                    item.style.fontWeight = 'bold';
                    item.style.color = '#4caf50'; 
                }
            });
        }
    }

    // --- 6. Cevapları Göster/Gizle Fonksiyonu ---
    function toggleAnswers() {
        const isHidden = answersPanel.classList.contains('answers-panel-hidden');

        if (isHidden) {
            // Şu an GİZLİ ise -> GÖSTER
            answersPanel.classList.remove('answers-panel-hidden');
            showAnswersBtn.textContent = 'Cevapları Gizle'; 
            
            answersList.innerHTML = '';
            // YALNIZCA bu turdaki *yeni ve kullanılmamış* hedefleri göster
            possibleCompoundsInRound.sort().forEach(compound => {
                const listItem = document.createElement('li');
                listItem.textContent = compound;
                
                // Daha önce bulunmuşsa işaretle
                if (foundCompounds.includes(compound)) {
                    listItem.style.fontWeight = 'bold';
                    listItem.style.color = '#4caf50';
                }
                answersList.appendChild(listItem);
            });

        } else {
            // Şu an GÖRÜNÜR ise -> GİZLE
            showAnswersBtn.textContent = 'Cevapları Göster';
            
            // Düzeltme: Panel gizlendikten sonra içeriği temizle
            setTimeout(() => {
                 answersList.innerHTML = '';
                 answersPanel.classList.add('answers-panel-hidden'); 
            }, 500); 
        }
    }

    showAnswersBtn.addEventListener('click', toggleAnswers);
    startGame();
});