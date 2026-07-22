// ============================================================================
// Word banks — GERMAN. Each noun carries the three article forms the frames
// need (indefinite nominative, indefinite ACCUSATIVE, definite nominative) so
// every generated sentence is grammatically correct without a declension
// engine. Weak nouns (Löwe, Bär, ...) are deliberately excluded because their
// accusative changes the noun itself. Turkish stays in the nominative
// singular, which drops naturally into the Turkish frames.
//
// Noun  = { w, ei, acc, def, tr, topic }   (ein/einen/der + Turkish + topic)
// Adj   = { w, tr }        (predicative; attributive endings derived in frames)
// Verb  = { inf, ich, aux, part, trInf, tr1, trGer, trPast, trFut }
//          (schwimmen / schwimme / bin+geschwommen / yüzmek / yüzüyorum /
//           yüzmeyi / yüzdüm / yüzeceğim)
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
// Things a person can own/lose — for possession frames.
export const OWNABLE = NOUNS.filter(n => ['food', 'objects', 'clothes', 'animals', 'transport'].includes(n.topic));

export const ADJECTIVES = [
  ['groß', 'büyük'], ['klein', 'küçük'], ['neu', 'yeni'], ['alt', 'eski'],
  ['gut', 'iyi'], ['schön', 'güzel'], ['lang', 'uzun'], ['kurz', 'kısa'],
  ['heiß', 'sıcak'], ['kalt', 'soğuk'], ['sauber', 'temiz'], ['schmutzig', 'kirli'],
  ['schnell', 'hızlı'], ['langsam', 'yavaş'], ['schwer', 'ağır'], ['leicht', 'hafif'],
  ['teuer', 'pahalı'], ['billig', 'ucuz'], ['voll', 'dolu'], ['leer', 'boş']
].map(([w, tr]) => ({ w, tr }));

export const VERBS = [
  ['schwimmen', 'schwimme', 'bin', 'geschwommen', 'yüzmek', 'yüzüyorum', 'yüzmeyi', 'yüzdüm', 'yüzeceğim'],
  ['laufen', 'laufe', 'bin', 'gelaufen', 'koşmak', 'koşuyorum', 'koşmayı', 'koştum', 'koşacağım'],
  ['schlafen', 'schlafe', 'habe', 'geschlafen', 'uyumak', 'uyuyorum', 'uyumayı', 'uyudum', 'uyuyacağım'],
  ['lesen', 'lese', 'habe', 'gelesen', 'okumak', 'okuyorum', 'okumayı', 'okudum', 'okuyacağım'],
  ['schreiben', 'schreibe', 'habe', 'geschrieben', 'yazmak', 'yazıyorum', 'yazmayı', 'yazdım', 'yazacağım'],
  ['spielen', 'spiele', 'habe', 'gespielt', 'oynamak', 'oynuyorum', 'oynamayı', 'oynadım', 'oynayacağım'],
  ['arbeiten', 'arbeite', 'habe', 'gearbeitet', 'çalışmak', 'çalışıyorum', 'çalışmayı', 'çalıştım', 'çalışacağım'],
  ['lernen', 'lerne', 'habe', 'gelernt', 'öğrenmek', 'öğreniyorum', 'öğrenmeyi', 'öğrendim', 'öğreneceğim'],
  ['kochen', 'koche', 'habe', 'gekocht', 'yemek pişirmek', 'yemek pişiriyorum', 'yemek pişirmeyi', 'yemek pişirdim', 'yemek pişireceğim'],
  ['singen', 'singe', 'habe', 'gesungen', 'şarkı söylemek', 'şarkı söylüyorum', 'şarkı söylemeyi', 'şarkı söyledim', 'şarkı söyleyeceğim'],
  ['tanzen', 'tanze', 'habe', 'getanzt', 'dans etmek', 'dans ediyorum', 'dans etmeyi', 'dans ettim', 'dans edeceğim'],
  ['warten', 'warte', 'habe', 'gewartet', 'beklemek', 'bekliyorum', 'beklemeyi', 'bekledim', 'bekleyeceğim'],
  ['reisen', 'reise', 'bin', 'gereist', 'seyahat etmek', 'seyahat ediyorum', 'seyahat etmeyi', 'seyahat ettim', 'seyahat edeceğim'],
  ['malen', 'male', 'habe', 'gemalt', 'resim yapmak', 'resim yapıyorum', 'resim yapmayı', 'resim yaptım', 'resim yapacağım'],
  ['lachen', 'lache', 'habe', 'gelacht', 'gülmek', 'gülüyorum', 'gülmeyi', 'güldüm', 'güleceğim'],
  ['üben', 'übe', 'habe', 'geübt', 'pratik yapmak', 'pratik yapıyorum', 'pratik yapmayı', 'pratik yaptım', 'pratik yapacağım']
].map(([inf, ich, aux, part, trInf, tr1, trGer, trPast, trFut]) =>
  ({ inf, ich, aux, part, trInf, tr1, trGer, trPast, trFut }));

// "I have been ...ing for ..." equivalents: German present + seit.
// Activity = full 1st-person clause; Duration = seit-phrase.
export const ACTIVITIES = [
  ['Ich warte', 'bekliyorum'],
  ['Ich lerne Deutsch', 'Almanca çalışıyorum'],
  ['Ich arbeite an diesem Bericht', 'bu rapor üzerinde çalışıyorum'],
  ['Ich suche meine Schlüssel', 'anahtarlarımı arıyorum'],
  ['Ich spare für eine Reise', 'bir gezi için para biriktiriyorum'],
  ['Ich putze die Wohnung', 'evi temizliyorum'],
  ['Ich plane die Hochzeit', 'düğünü planlıyorum'],
  ['Ich lese dieses Buch', 'bu kitabı okuyorum'],
  ['Ich trainiere im Fitnessstudio', 'spor salonunda antrenman yapıyorum'],
  ['Ich suche eine neue Arbeit', 'yeni bir iş arıyorum'],
  ['Ich schreibe meine Abschlussarbeit', 'tezimi yazıyorum'],
  ['Ich lerne kochen', 'yemek yapmayı öğreniyorum']
].map(([t, tr]) => ({ t, tr }));

export const DURATIONS = [
  ['seit zehn Minuten', 'on dakikadır'],
  ['seit einer halben Stunde', 'yarım saattir'],
  ['seit zwei Stunden', 'iki saattir'],
  ['seit heute Morgen', 'bu sabahtan beri'],
  ['seit drei Tagen', 'üç gündür'],
  ['seit einer Woche', 'bir haftadır'],
  ['seit einem Monat', 'bir aydır'],
  ['seit einer Ewigkeit', 'uzun zamandır']
].map(([t, tr]) => ({ t, tr }));

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

// Hand-written, real everyday sentences (greetings, small talk, travel,
// opinions) — injected into the stream as-is, one per card.
export const DAILY = [
  // A1
  ['A1', 'Hallo, wie geht’s?', 'Merhaba, nasılsın?'],
  ['A1', 'Mir geht es gut, danke.', 'İyiyim, teşekkürler.'],
  ['A1', 'Wie heißt du?', 'Adın ne?'],
  ['A1', 'Ich heiße Anna.', 'Benim adım Anna.'],
  ['A1', 'Freut mich!', 'Memnun oldum!'],
  ['A1', 'Guten Morgen!', 'Günaydın!'],
  ['A1', 'Gute Nacht!', 'İyi geceler!'],
  ['A1', 'Bis morgen!', 'Yarın görüşürüz!'],
  ['A1', 'Ich habe Hunger.', 'Acıktım.'],
  ['A1', 'Ich habe Durst.', 'Susadım.'],
  ['A1', 'Ich bin müde.', 'Yorgunum.'],
  ['A1', 'Das Wetter ist heute sehr schön.', 'Bugün hava çok güzel.'],
  ['A1', 'Es regnet.', 'Yağmur yağıyor.'],
  ['A1', 'Wie alt bist du?', 'Kaç yaşındasın?'],
  ['A1', 'Ich bin zehn Jahre alt.', 'On yaşındayım.'],
  ['A1', 'Woher kommst du?', 'Nerelisin?'],
  ['A1', 'Ich komme aus der Türkei.', 'Türkiye’denim.'],
  ['A1', 'Das ist meine Familie.', 'Bu benim ailem.'],
  ['A1', 'Ich liebe dich.', 'Seni seviyorum.'],
  ['A1', 'Tschüss!', 'Hoşça kal!'],
  // A2
  ['A2', 'Ich verstehe nicht.', 'Anlamıyorum.'],
  ['A2', 'Können Sie das wiederholen?', 'Tekrar eder misiniz?'],
  ['A2', 'Können Sie langsamer sprechen?', 'Daha yavaş konuşur musunuz?'],
  ['A2', 'Können Sie mir helfen?', 'Bana yardım eder misiniz?'],
  ['A2', 'Wo ist die Toilette?', 'Tuvalet nerede?'],
  ['A2', 'Wie spät ist es?', 'Saat kaç?'],
  ['A2', 'Welcher Tag ist heute?', 'Bugün günlerden ne?'],
  ['A2', 'Wann kommt der nächste Bus?', 'Bir sonraki otobüs ne zaman?'],
  ['A2', 'Wo kann ich ein Ticket kaufen?', 'Bilet nereden alabilirim?'],
  ['A2', 'Die Rechnung, bitte.', 'Hesap, lütfen.'],
  ['A2', 'Guten Appetit!', 'Afiyet olsun!'],
  ['A2', 'Entschuldigung, ich bin zu spät.', 'Özür dilerim, geç kaldım.'],
  ['A2', 'Kein Problem.', 'Sorun değil.'],
  ['A2', 'Was für eine tolle Idee!', 'Ne harika bir fikir!'],
  ['A2', 'Ich spreche ein bisschen Deutsch.', 'Biraz Almanca konuşuyorum.'],
  ['A2', 'Ich habe mich verlaufen.', 'Kayboldum.'],
  ['A2', 'Kann ich mich hier hinsetzen?', 'Buraya oturabilir miyim?'],
  ['A2', 'Darf ich ein Foto machen?', 'Fotoğraf çekebilir miyim?'],
  ['A2', 'Das ist zu teuer!', 'Bu çok pahalı!'],
  ['A2', 'Gibt es einen Rabatt?', 'İndirim var mı?'],
  // B1
  ['B1', 'Ich bin gestern sehr spät ins Bett gegangen.', 'Dün gece çok geç yattım.'],
  ['B1', 'Ich muss morgen früh aufstehen.', 'Yarın erken kalkmam lazım.'],
  ['B1', 'Hast du am Wochenende schon etwas vor?', 'Hafta sonu için planın var mı?'],
  ['B1', 'Wir haben uns lange nicht gesehen.', 'Uzun zamandır görüşemedik.'],
  ['B1', 'Ich wohne seit zwei Jahren in dieser Stadt.', 'İki yıldır bu şehirde yaşıyorum.'],
  ['B1', 'Ich suche gerade eine neue Arbeit.', 'Şu sıralar yeni bir iş arıyorum.'],
  ['B1', 'Ich habe gerade mit dem Sport angefangen.', 'Spora yeni başladım.'],
  ['B1', 'Ich kann dir dieses Buch wirklich empfehlen.', 'Bu kitabı gerçekten tavsiye ederim.'],
  ['B1', 'Ich wünschte, ich hätte mehr Zeit.', 'Keşke daha fazla zamanım olsa.'],
  ['B1', 'Ich verspreche, das passiert nicht noch einmal.', 'Söz veriyorum, bir daha olmayacak.'],
  ['B1', 'Hast du deine Meinung geändert?', 'Fikrini değiştirdin mi?'],
  ['B1', 'Lohnt sich das wirklich?', 'Buna gerçekten değer mi?'],
  // B2
  ['B2', 'Ehrlich gesagt bin ich mir nicht sicher.', 'Açıkçası pek emin değilim.'],
  ['B2', 'Da stimme ich dir völlig zu.', 'Bu konuda sana tamamen katılıyorum.'],
  ['B2', 'Wenn ich das richtig verstanden habe, ist das Meeting morgen abgesagt.', 'Yanlış anlamadıysam yarınki toplantı iptal.'],
  ['B2', 'Ich verstehe, was du meinst, aber ich sehe das anders.', 'Ne demek istediğini anlıyorum ama farklı düşünüyorum.'],
  ['B2', 'Sieh es doch mal aus dieser Perspektive.', 'Bir de şu açıdan bak.'],
  ['B2', 'Ich werde mein Bestes geben.', 'Elimden geleni yapacağım.'],
  ['B2', 'Wie auch immer es ausgeht, der Versuch war es wert.', 'Sonuç ne olursa olsun denemeye değerdi.'],
  ['B2', 'Gib mir etwas Zeit zum Nachdenken.', 'Düşünmek için bana biraz zaman ver.']
].map(([level, t, tr]) => ({ level, t, tr }));
