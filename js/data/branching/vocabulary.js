// Tappable-word glossary + grammar notes for Story Mode. Keyed by the
// lowercase word so the conversation screen can look up any word the learner
// taps in an NPC line or their own sentence. Not exhaustive — it covers the
// content/travel words that actually appear in the scenarios. Words not found
// here fall back to a "no entry yet" popup rather than breaking.

// StoryWord = { word, tr, type, definition (TR), example, exampleTr, related? }
const WORDS = [
  { word: 'Reservierung', tr: 'rezervasyon', type: 'isim (die)',
    definition: 'Bir oda, masa ya da koltuğun sizin için ayrılması.',
    example: 'Ich habe eine Reservierung für zwei Nächte.', exampleTr: 'İki geceliğine rezervasyonum var.', related: ['buchen', 'Buchung'] },
  { word: 'Buchung', tr: 'rezervasyon / kayıt', type: 'isim (die)',
    definition: 'Önceden yapılmış ayırtma işlemi.',
    example: 'Hier ist meine Buchung auf dem Handy.', exampleTr: 'İşte telefondaki rezervasyonum.' },
  { word: 'Frühstück', tr: 'kahvaltı', type: 'isim (das)',
    definition: 'Sabah yenen ilk öğün.',
    example: 'Ist das Frühstück inbegriffen?', exampleTr: 'Kahvaltı dahil mi?' },
  { word: 'inbegriffen', tr: 'dahil', type: 'sıfat',
    definition: 'Fiyatın içinde olan.',
    example: 'Das Frühstück ist im Preis inbegriffen.', exampleTr: 'Kahvaltı fiyata dahil.' },
  { word: 'Schlüssel', tr: 'anahtar', type: 'isim (der)',
    definition: 'Kapıyı açmaya yarayan nesne.',
    example: 'Hier ist Ihr Schlüssel.', exampleTr: 'İşte anahtarınız.' },
  { word: 'Bordkarte', tr: 'biniş kartı', type: 'isim (die)',
    definition: 'Uçağa binmek için gereken kart.',
    example: 'Hier ist Ihre Bordkarte.', exampleTr: 'İşte biniş kartınız.', related: ['Gate', 'Flug'] },
  { word: 'Gate', tr: 'kapı (uçuş)', type: 'isim (das)',
    definition: 'Havalimanında uçağa bindiğiniz yer.',
    example: 'Sie steigen an Gate B12 ein.', exampleTr: 'B12 kapısından bineceksiniz.' },
  { word: 'Verspätung', tr: 'rötar / gecikme', type: 'isim (die)',
    definition: 'Geç kalma durumu.',
    example: 'Mein Anschlussflug hatte Verspätung.', exampleTr: 'Aktarma uçuşum rötar yaptı.' },
  { word: 'Gepäck', tr: 'bagaj', type: 'isim (das)',
    definition: 'Yolculukta taşınan çantalar ve valizler.',
    example: 'Geben Sie Gepäck auf?', exampleTr: 'Bavul verecek misiniz?', related: ['Koffer', 'Handgepäck'] },
  { word: 'Rezept', tr: 'reçete', type: 'isim (das)',
    definition: 'Doktorun yazdığı ilaç belgesi.',
    example: 'Ich möchte dieses Rezept einlösen.', exampleTr: 'Bu reçeteyi doldurtmak istiyorum.' },
  { word: 'Kopfschmerzen', tr: 'baş ağrısı', type: 'isim (çoğul)',
    definition: 'Baştaki ağrı.',
    example: 'Ich habe seit zwei Tagen Kopfschmerzen.', exampleTr: 'İki gündür başım ağrıyor.' },
  { word: 'müde', tr: 'yorgun / uykulu', type: 'sıfat',
    definition: 'Enerjisi kalmamış; uyku ihtiyacı olan.',
    example: 'Dieses Medikament kann müde machen.', exampleTr: 'Bu ilaç uyku yapabilir.' },
  { word: 'allergisch', tr: 'alerjik', type: 'sıfat',
    definition: 'Vücudun bir şeye kötü tepki vermesi.',
    example: 'Ich bin allergisch gegen Nüsse.', exampleTr: 'Fındık/fıstığa alerjim var.' },
  { word: 'empfehlen', tr: 'önermek / tavsiye etmek', type: 'fiil',
    definition: 'Bir şeyin iyi olduğunu söylemek.',
    example: 'Was würden Sie empfehlen?', exampleTr: 'Ne önerirsiniz?' },
  { word: 'Entschädigung', tr: 'tazminat / telafi', type: 'isim (die)',
    definition: 'Bir zahmet ya da kayıp için verilen karşılık.',
    example: 'Ich würde eine Entschädigung erwarten.', exampleTr: 'Bir telafi beklerdim.' },
  { word: 'Missverständnis', tr: 'yanlış anlaşılma', type: 'isim (das)',
    definition: 'Bir şeyi yanlış anlama durumu.',
    example: 'Ich glaube, da gab es ein Missverständnis.', exampleTr: 'Sanırım bir yanlış anlaşılma oldu.' },
  { word: 'delegieren', tr: 'yetki devretmek', type: 'fiil',
    definition: 'Bir işi başkasına vermek.',
    example: 'Ich lerne, mehr zu delegieren.', exampleTr: 'Daha fazla yetki devretmeyi öğreniyorum.' },
  { word: 'Verantwortung', tr: 'sorumluluk', type: 'isim (die)',
    definition: 'Üstlenilmesi gereken görev.',
    example: 'Ich möchte mehr Verantwortung übernehmen.', exampleTr: 'Daha fazla sorumluluk almak istiyorum.' },
  { word: 'entschuldigen', tr: 'özür dilemek', type: 'fiil',
    definition: 'Üzgün olduğunu söylemek.',
    example: 'Ich entschuldige mich für die Umstände.', exampleTr: 'Zahmet için özür dilerim.' },
  { word: 'Wegbeschreibung', tr: 'yol tarifi', type: 'isim (die)',
    definition: 'Bir yere nasıl gidileceğini anlatan bilgiler.',
    example: 'Können Sie mir eine Wegbeschreibung geben?', exampleTr: 'Bana yol tarifi verir misiniz?' },
  { word: 'Apotheke', tr: 'eczane', type: 'isim (die)',
    definition: 'İlaç satılan yer.',
    example: 'Wo ist die nächste Apotheke?', exampleTr: 'En yakın eczane nerede?' },
  { word: 'Rückerstattung', tr: 'para iadesi', type: 'isim (die)',
    definition: 'İade edilen ürün için geri verilen para.',
    example: 'Ich hätte gern eine Rückerstattung.', exampleTr: 'Para iadesi istiyorum.', related: ['umtauschen', 'zurückgeben'] },
  { word: 'umtauschen', tr: 'değiştirmek', type: 'fiil',
    definition: 'Bir şeyi başka bir şeyle takas etmek.',
    example: 'Kann ich sie gegen eine größere Größe umtauschen?', exampleTr: 'Daha büyük bedenle değiştirebilir miyim?' },
  { word: 'Kassenbon', tr: 'fiş / makbuz', type: 'isim (der)',
    definition: 'Ne ödediğinizi gösteren kağıt.',
    example: 'Haben Sie den Kassenbon?', exampleTr: 'Fişiniz var mı?' },
  { word: 'Gleis', tr: 'peron / ray', type: 'isim (das)',
    definition: 'Trenin kalktığı platform.',
    example: 'Der Zug fährt von Gleis drei.', exampleTr: 'Tren üçüncü perondan kalkıyor.' },
  { word: 'Fahrkarte', tr: 'bilet', type: 'isim (die)',
    definition: 'Yolculuk için ödeme belgesi.',
    example: 'Eine Fahrkarte nach London, bitte.', exampleTr: 'Londra’ya bir bilet, lütfen.', related: ['Rückfahrkarte'] },
  { word: 'sperren', tr: 'bloke etmek', type: 'fiil',
    definition: 'Bir kartı kullanılamaz hale getirmek.',
    example: 'Könnten Sie meine Karte sperren?', exampleTr: 'Kartımı bloke edebilir misiniz?' },
  { word: 'Anzeige', tr: 'tutanak / ihbar', type: 'isim (die)',
    definition: 'Polise yapılan resmi bildirim.',
    example: 'Ich möchte eine Anzeige aufgeben.', exampleTr: 'Tutanak tutturmak istiyorum.' },
  { word: 'Versicherung', tr: 'sigorta', type: 'isim (die)',
    definition: 'Kayıplara karşı koruma sağlayan hizmet.',
    example: 'Ich brauche das für meine Versicherung.', exampleTr: 'Buna sigortam için ihtiyacım var.' }
];

export const STORY_VOCAB = Object.fromEntries(WORDS.map(w => [w.word.toLowerCase(), w]));

/** Look up a tapped word (strips punctuation, lowercases). Returns the entry
 *  or a minimal fallback object so the popup always has something to show. */
export function lookupWord(raw) {
  const key = String(raw).toLowerCase().replace(/[^\p{L}'’-]/gu, '');
  if (STORY_VOCAB[key]) return STORY_VOCAB[key];
  // try singular-ish fallbacks (drop trailing letters — covers common plurals)
  for (const cut of [1, 2]) {
    const base = key.slice(0, -cut);
    if (base && STORY_VOCAB[base]) return STORY_VOCAB[base];
  }
  return { word: key, tr: null, type: null, ipa: null, definition: null, example: null };
}

// Per-choice grammar notes, keyed by "scenarioId::choiceId". Only the trickier
// sentences get an explanation; the UI shows a generic "tap words to learn"
// hint when there's no specific note. Kept small on purpose — extendable.
export const GRAMMAR_NOTES = {
  'asking-directions::ask_pharmacy': {
    title: 'Dolaylı soru (indirekte Frage)',
    points: [
      '“Könnten Sie mir sagen…” kibar bir soru kalıbıdır.',
      'İç cümlede fiil sona gider: “…wo die nächste Apotheke ist”.',
      'Doğrudan soruda ise fiil öndedir: “Wo ist die Apotheke?”'
    ]
  },
  'hotel-checkin::confirm': {
    title: 'haben + Reservierung',
    points: [
      '“Ich habe eine Reservierung” — şu anki bir durum için şimdiki zaman.',
      '“auf den Namen Alex” rezervasyonun kimin adına olduğunu söyler.'
    ]
  },
  'missing-flight::explain': {
    title: 'Neden anlatmak',
    points: [
      '“hatte Verspätung” — geçmişte olan gecikmeyi anlatır.',
      '“deshalb konnte ich nicht…” gecikmenin sonucunu gösterir.'
    ]
  },
  'job-interview::honest_weakness': {
    title: 'früher + lernen zu',
    points: [
      '“Früher habe ich zu viel übernommen” = değişmiş eski bir alışkanlık.',
      '“ich lerne zu delegieren” gelişimi gösterir — güçlü bir mülakat hamlesi.'
    ]
  }
};
