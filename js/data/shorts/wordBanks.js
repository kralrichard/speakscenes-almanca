// ============================================================================
// Word banks — GERMAN. Each noun carries the three article forms the frames
// need (indefinite nominative, indefinite ACCUSATIVE, definite nominative) so
// every generated sentence is grammatically correct without a declension
// engine. Weak nouns (Löwe, Bär, ...) are deliberately excluded because their
// accusative changes the noun itself. Turkish stays in the nominative
// singular, which drops naturally into the Turkish frames.
//
// Noun  = { w, ei, acc, def, tr, topic }   (ein/einen/der + Turkish + topic)
// Adj   = { w, tr }                         (predicative only — no declension)
// Verb  = { inf, ich, trInf, tr1, trGer }   (schwimmen / schwimme / yüzmek /
//                                            yüzüyorum / yüzmeyi)
// ============================================================================

const N = (w, ei, acc, def, tr, topic) => ({ w, ei, acc, def, tr, topic });

export const NOUNS = [
  // food
  N('Apfel', 'ein', 'einen', 'der', 'elma', 'food'),
  N('Banane', 'eine', 'eine', 'die', 'muz', 'food'),
  N('Orange', 'eine', 'eine', 'die', 'portakal', 'food'),
  N('Ei', 'ein', 'ein', 'das', 'yumurta', 'food'),
  N('Keks', 'ein', 'einen', 'der', 'kurabiye', 'food'),
  N('Kuchen', 'ein', 'einen', 'der', 'pasta', 'food'),
  N('Suppe', 'eine', 'eine', 'die', 'çorba', 'food'),
  N('Salat', 'ein', 'einen', 'der', 'salata', 'food'),
  N('Tomate', 'eine', 'eine', 'die', 'domates', 'food'),
  N('Kartoffel', 'eine', 'eine', 'die', 'patates', 'food'),
  N('Zitrone', 'eine', 'eine', 'die', 'limon', 'food'),
  N('Käse', 'ein', 'einen', 'der', 'peynir', 'food'),
  // animals
  N('Hund', 'ein', 'einen', 'der', 'köpek', 'animals'),
  N('Katze', 'eine', 'eine', 'die', 'kedi', 'animals'),
  N('Vogel', 'ein', 'einen', 'der', 'kuş', 'animals'),
  N('Fisch', 'ein', 'einen', 'der', 'balık', 'animals'),
  N('Pferd', 'ein', 'ein', 'das', 'at', 'animals'),
  N('Kuh', 'eine', 'eine', 'die', 'inek', 'animals'),
  N('Schaf', 'ein', 'ein', 'das', 'koyun', 'animals'),
  N('Kaninchen', 'ein', 'ein', 'das', 'tavşan', 'animals'),
  N('Ente', 'eine', 'eine', 'die', 'ördek', 'animals'),
  N('Maus', 'eine', 'eine', 'die', 'fare', 'animals'),
  // objects
  N('Buch', 'ein', 'ein', 'das', 'kitap', 'objects'),
  N('Stift', 'ein', 'einen', 'der', 'kalem', 'objects'),
  N('Tisch', 'ein', 'einen', 'der', 'masa', 'objects'),
  N('Stuhl', 'ein', 'einen', 'der', 'sandalye', 'objects'),
  N('Bett', 'ein', 'ein', 'das', 'yatak', 'objects'),
  N('Tür', 'eine', 'eine', 'die', 'kapı', 'objects'),
  N('Fenster', 'ein', 'ein', 'das', 'pencere', 'objects'),
  N('Schlüssel', 'ein', 'einen', 'der', 'anahtar', 'objects'),
  N('Tasse', 'eine', 'eine', 'die', 'fincan', 'objects'),
  N('Glas', 'ein', 'ein', 'das', 'bardak', 'objects'),
  N('Tasche', 'eine', 'eine', 'die', 'çanta', 'objects'),
  N('Uhr', 'eine', 'eine', 'die', 'saat', 'objects'),
  N('Lampe', 'eine', 'eine', 'die', 'lamba', 'objects'),
  N('Telefon', 'ein', 'ein', 'das', 'telefon', 'objects'),
  // places
  N('Haus', 'ein', 'ein', 'das', 'ev', 'places'),
  N('Schule', 'eine', 'eine', 'die', 'okul', 'places'),
  N('Park', 'ein', 'einen', 'der', 'park', 'places'),
  N('Garten', 'ein', 'einen', 'der', 'bahçe', 'places'),
  N('Zimmer', 'ein', 'ein', 'das', 'oda', 'places'),
  N('Küche', 'eine', 'eine', 'die', 'mutfak', 'places'),
  N('Stadt', 'eine', 'eine', 'die', 'şehir', 'places'),
  N('Krankenhaus', 'ein', 'ein', 'das', 'hastane', 'places'),
  N('Bahnhof', 'ein', 'einen', 'der', 'istasyon', 'places'),
  N('Hotel', 'ein', 'ein', 'das', 'otel', 'places'),
  N('Restaurant', 'ein', 'ein', 'das', 'restoran', 'places'),
  // transport
  N('Auto', 'ein', 'ein', 'das', 'araba', 'transport'),
  N('Bus', 'ein', 'einen', 'der', 'otobüs', 'transport'),
  N('Zug', 'ein', 'einen', 'der', 'tren', 'transport'),
  N('Fahrrad', 'ein', 'ein', 'das', 'bisiklet', 'transport'),
  N('Flugzeug', 'ein', 'ein', 'das', 'uçak', 'transport'),
  // clothes
  N('Hut', 'ein', 'einen', 'der', 'şapka', 'clothes'),
  N('Hemd', 'ein', 'ein', 'das', 'gömlek', 'clothes'),
  N('Schuh', 'ein', 'einen', 'der', 'ayakkabı', 'clothes'),
  N('Mantel', 'ein', 'einen', 'der', 'palto', 'clothes'),
  N('Kleid', 'ein', 'ein', 'das', 'elbise', 'clothes')
];

// Things you can plausibly buy / order / carry — for commerce frames.
export const GOODS = NOUNS.filter(n => ['food', 'objects', 'clothes'].includes(n.topic));
export const PLACES = NOUNS.filter(n => n.topic === 'places');

export const ADJECTIVES = [
  ['groß', 'büyük'], ['klein', 'küçük'], ['neu', 'yeni'], ['alt', 'eski'],
  ['gut', 'iyi'], ['schön', 'güzel'], ['lang', 'uzun'], ['kurz', 'kısa'],
  ['heiß', 'sıcak'], ['kalt', 'soğuk'], ['sauber', 'temiz'], ['schmutzig', 'kirli'],
  ['schnell', 'hızlı'], ['langsam', 'yavaş'], ['schwer', 'ağır'], ['leicht', 'hafif'],
  ['teuer', 'pahalı'], ['billig', 'ucuz'], ['voll', 'dolu'], ['leer', 'boş']
].map(([w, tr]) => ({ w, tr }));

export const VERBS = [
  ['schwimmen', 'schwimme', 'yüzmek', 'yüzüyorum', 'yüzmeyi'],
  ['laufen', 'laufe', 'koşmak', 'koşuyorum', 'koşmayı'],
  ['schlafen', 'schlafe', 'uyumak', 'uyuyorum', 'uyumayı'],
  ['lesen', 'lese', 'okumak', 'okuyorum', 'okumayı'],
  ['schreiben', 'schreibe', 'yazmak', 'yazıyorum', 'yazmayı'],
  ['spielen', 'spiele', 'oynamak', 'oynuyorum', 'oynamayı'],
  ['arbeiten', 'arbeite', 'çalışmak', 'çalışıyorum', 'çalışmayı'],
  ['lernen', 'lerne', 'öğrenmek', 'öğreniyorum', 'öğrenmeyi'],
  ['kochen', 'koche', 'yemek pişirmek', 'yemek pişiriyorum', 'yemek pişirmeyi'],
  ['singen', 'singe', 'şarkı söylemek', 'şarkı söylüyorum', 'şarkı söylemeyi'],
  ['tanzen', 'tanze', 'dans etmek', 'dans ediyorum', 'dans etmeyi'],
  ['warten', 'warte', 'beklemek', 'bekliyorum', 'beklemeyi'],
  ['reisen', 'reise', 'seyahat etmek', 'seyahat ediyorum', 'seyahat etmeyi'],
  ['malen', 'male', 'resim yapmak', 'resim yapıyorum', 'resim yapmayı'],
  ['lachen', 'lache', 'gülmek', 'gülüyorum', 'gülmeyi'],
  ['üben', 'übe', 'pratik yapmak', 'pratik yapıyorum', 'pratik yapmayı']
].map(([inf, ich, trInf, tr1, trGer]) => ({ inf, ich, trInf, tr1, trGer }));

// Full, natural main clauses (B1-C2 opinion frames wrap these unchanged —
// German V2 word order stays correct because the clause is never re-ordered).
export const OPINIONS = [
  ['diese Entscheidung war ein Fehler', 'bu karar bir hataydı'],
  ['der Preis ist viel zu hoch', 'fiyat çok fazla yüksek'],
  ['wir brauchen einen klareren Plan', 'daha net bir plana ihtiyacımız var'],
  ['dieser Ansatz wird nicht funktionieren', 'bu yaklaşım işe yaramayacak'],
  ['jeder verdient eine zweite Chance', 'herkes ikinci bir şansı hak eder'],
  ['das Projekt liegt hinter dem Zeitplan', 'proje programın gerisinde'],
  ['kleine Veränderungen können viel bewirken', 'küçük değişiklikler büyük fark yaratabilir'],
  ['die Frist ist unrealistisch', 'teslim tarihi gerçekçi değil'],
  ['Veränderung ist unbequem, aber notwendig', 'değişim rahatsız edici ama gerekli'],
  ['die beste Lösung ist oft die einfachste', 'en iyi çözüm çoğu zaman en basit olanıdır'],
  ['man kann es nicht allen recht machen', 'herkesi memnun edemeyiz'],
  ['Geduld ist eine unterschätzte Fähigkeit', 'sabır, hafife alınan bir beceridir'],
  ['dieser Trend wird nicht lange anhalten', 'bu trend sürmeyecek'],
  ['wir sollten mehr zuhören und weniger reden', 'konuştuğumuzdan çok dinlemeliyiz'],
  ['ein guter Ruf braucht Jahre', 'iyi bir itibar yıllar alır'],
  ['die Wahrheit ist selten einfach', 'gerçek nadiren basittir'],
  ['das Team ist stärker als ein Einzelner', 'takım, tek bir kişiden daha güçlüdür'],
  ['der erste Eindruck lässt sich schwer ändern', 'ilk izlenimleri değiştirmek zordur'],
  ['die Zahlen passen nicht zusammen', 'rakamlar tutmuyor'],
  ['Zeit kann man nicht zurückkaufen', 'zaman geri satın alınamaz']
].map(([de, tr]) => ({ c: de, tr }));

// Polite-request verb phrases in VERB-FINAL form, so they slot correctly into
// "Könnten Sie bitte {r}?" and "..., wenn Sie {r} könnten."
export const REQUESTS = [
  ['das Fenster öffnen', 'pencereyi açar mısın'],
  ['etwas langsamer sprechen', 'biraz daha yavaş konuşur musun'],
  ['mir die Details schicken', 'bana ayrıntıları gönderir misin'],
  ['mir dabei helfen', 'bu konuda bana yardım eder misin'],
  ['draußen auf mich warten', 'beni dışarıda bekler misin'],
  ['mich später zurückrufen', 'beni sonra arar mısın'],
  ['das noch einmal erklären', 'bunu bir kez daha açıklar mısın'],
  ['sich das ansehen', 'buna bir bakar mısın'],
  ['mir ein Glas Wasser bringen', 'bana bir bardak su getirir misin'],
  ['die Adresse noch einmal prüfen', 'adresi bir daha kontrol eder misin'],
  ['die Tür aufhalten', 'kapıyı tutar mısın'],
  ['mir einen Platz freihalten', 'bana bir yer ayırır mısın']
].map(([de, tr]) => ({ r: de, tr }));
