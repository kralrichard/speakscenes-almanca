// A0/A1 word catalog. Powers the Object Hunt and Memory Match mini-games and
// Word Builder's target words. Every entry is real content (German word +
// Turkish meaning + example), not a placeholder -- these are the words an
// A0/A1 learner meets first: people, food, animals, actions, greetings,
// colors, numbers, everyday objects.
//
// VocabWord = {
//   id, word, translation_tr, emoji, level: 'A0'|'A1',
//   category, exampleSentence, exampleSentence_tr
// }

export const VOCABULARY = [
  // ---- people ----
  { id: 'mom', word: 'Mama', translation_tr: 'anne', emoji: '👩', level: 'A0', category: 'people', exampleSentence: 'Ich liebe meine Mama.', exampleSentence_tr: 'Annemi seviyorum.' },
  { id: 'dad', word: 'Papa', translation_tr: 'baba', emoji: '👨', level: 'A0', category: 'people', exampleSentence: 'Mein Papa ist groß.', exampleSentence_tr: 'Babam uzun boylu.' },
  { id: 'baby', word: 'Baby', translation_tr: 'bebek', emoji: '👶', level: 'A0', category: 'people', exampleSentence: 'Das Baby schläft.', exampleSentence_tr: 'Bebek uyuyor.' },
  { id: 'friend', word: 'Freund', translation_tr: 'arkadaş', emoji: '🧑‍🤝‍🧑', level: 'A1', category: 'people', exampleSentence: 'Er ist mein bester Freund.', exampleSentence_tr: 'O benim en iyi arkadaşım.' },
  { id: 'boy', word: 'Junge', translation_tr: 'erkek çocuk', emoji: '👦', level: 'A0', category: 'people', exampleSentence: 'Der Junge spielt.', exampleSentence_tr: 'Erkek çocuk oynuyor.' },
  { id: 'girl', word: 'Mädchen', translation_tr: 'kız çocuk', emoji: '👧', level: 'A0', category: 'people', exampleSentence: 'Das Mädchen ist glücklich.', exampleSentence_tr: 'Kız çocuk mutlu.' },
  { id: 'teacher', word: 'Lehrer', translation_tr: 'öğretmen', emoji: '🧑‍🏫', level: 'A1', category: 'people', exampleSentence: 'Mein Lehrer ist nett.', exampleSentence_tr: 'Öğretmenim naziktir.' },

  // ---- food & drink ----
  { id: 'water', word: 'Wasser', translation_tr: 'su', emoji: '💧', level: 'A0', category: 'food', exampleSentence: 'Ich möchte Wasser.', exampleSentence_tr: 'Su istiyorum.' },
  { id: 'milk', word: 'Milch', translation_tr: 'süt', emoji: '🥛', level: 'A0', category: 'food', exampleSentence: 'Das Baby trinkt Milch.', exampleSentence_tr: 'Bebek süt içiyor.' },
  { id: 'apple', word: 'Apfel', translation_tr: 'elma', emoji: '🍎', level: 'A0', category: 'food', exampleSentence: 'Ich esse einen Apfel.', exampleSentence_tr: 'Bir elma yiyorum.' },
  { id: 'banana', word: 'Banane', translation_tr: 'muz', emoji: '🍌', level: 'A0', category: 'food', exampleSentence: 'Der Affe mag Bananen.', exampleSentence_tr: 'Maymun muz sever.' },
  { id: 'bread', word: 'Brot', translation_tr: 'ekmek', emoji: '🍞', level: 'A1', category: 'food', exampleSentence: 'Wir essen jeden Tag Brot.', exampleSentence_tr: 'Her gün ekmek yeriz.' },
  { id: 'egg', word: 'Ei', translation_tr: 'yumurta', emoji: '🥚', level: 'A1', category: 'food', exampleSentence: 'Ich hatte ein Ei zum Frühstück.', exampleSentence_tr: 'Kahvaltıda yumurta yedim.' },
  { id: 'cheese', word: 'Käse', translation_tr: 'peynir', emoji: '🧀', level: 'A1', category: 'food', exampleSentence: 'Sie mag Käse.', exampleSentence_tr: 'O peyniri sever.' },
  { id: 'cookie', word: 'Keks', translation_tr: 'kurabiye', emoji: '🍪', level: 'A0', category: 'food', exampleSentence: 'Kann ich einen Keks haben?', exampleSentence_tr: 'Bir kurabiye alabilir miyim?' },
  { id: 'juice', word: 'Saft', translation_tr: 'meyve suyu', emoji: '🧃', level: 'A1', category: 'food', exampleSentence: 'Ich trinke Orangensaft.', exampleSentence_tr: 'Portakal suyu içerim.' },

  // ---- animals ----
  { id: 'cat', word: 'Katze', translation_tr: 'kedi', emoji: '🐱', level: 'A0', category: 'animals', exampleSentence: 'Die Katze schläft.', exampleSentence_tr: 'Kedi uyuyor.' },
  { id: 'dog', word: 'Hund', translation_tr: 'köpek', emoji: '🐶', level: 'A0', category: 'animals', exampleSentence: 'Der Hund rennt.', exampleSentence_tr: 'Köpek koşuyor.' },
  { id: 'bird', word: 'Vogel', translation_tr: 'kuş', emoji: '🐦', level: 'A0', category: 'animals', exampleSentence: 'Der Vogel kann fliegen.', exampleSentence_tr: 'Kuş uçabilir.' },
  { id: 'fish', word: 'Fisch', translation_tr: 'balık', emoji: '🐟', level: 'A0', category: 'animals', exampleSentence: 'Der Fisch schwimmt im Wasser.', exampleSentence_tr: 'Balık suda yüzer.' },
  { id: 'horse', word: 'Pferd', translation_tr: 'at', emoji: '🐴', level: 'A1', category: 'animals', exampleSentence: 'Das Pferd läuft schnell.', exampleSentence_tr: 'At hızlı koşar.' },
  { id: 'rabbit', word: 'Hase', translation_tr: 'tavşan', emoji: '🐰', level: 'A1', category: 'animals', exampleSentence: 'Der Hase ist klein.', exampleSentence_tr: 'Tavşan küçüktür.' },

  // ---- actions ----
  { id: 'eat', word: 'essen', translation_tr: 'yemek', emoji: '🍽️', level: 'A0', category: 'actions', exampleSentence: 'Ich esse um acht Frühstück.', exampleSentence_tr: 'Sekizde kahvaltı yaparım.' },
  { id: 'drink', word: 'trinken', translation_tr: 'içmek', emoji: '🥤', level: 'A0', category: 'actions', exampleSentence: 'Ich trinke jeden Tag Wasser.', exampleSentence_tr: 'Her gün su içerim.' },
  { id: 'sleep', word: 'schlafen', translation_tr: 'uyumak', emoji: '😴', level: 'A0', category: 'actions', exampleSentence: 'Das Baby schläft gern.', exampleSentence_tr: 'Bebek uyumayı sever.' },
  { id: 'play', word: 'spielen', translation_tr: 'oynamak', emoji: '🧸', level: 'A0', category: 'actions', exampleSentence: 'Die Kinder spielen im Park.', exampleSentence_tr: 'Çocuklar parkta oynar.' },
  { id: 'walk', word: 'gehen', translation_tr: 'yürümek', emoji: '🚶', level: 'A1', category: 'actions', exampleSentence: 'Wir gehen zu Fuß zur Schule.', exampleSentence_tr: 'Okula yürüyerek gideriz.' },
  { id: 'run', word: 'laufen', translation_tr: 'koşmak', emoji: '🏃', level: 'A1', category: 'actions', exampleSentence: 'Er kann sehr schnell laufen.', exampleSentence_tr: 'O çok hızlı koşabilir.' },
  { id: 'read', word: 'lesen', translation_tr: 'okumak', emoji: '📖', level: 'A1', category: 'actions', exampleSentence: 'Ich lese jeden Abend ein Buch.', exampleSentence_tr: 'Her gece bir kitap okurum.' },
  { id: 'sing', word: 'singen', translation_tr: 'şarkı söylemek', emoji: '🎵', level: 'A1', category: 'actions', exampleSentence: 'Sie singt gern.', exampleSentence_tr: 'O şarkı söylemeyi sever.' },

  // ---- greetings & small words ----
  { id: 'hello', word: 'hallo', translation_tr: 'merhaba', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Hallo! Schön, dich kennenzulernen.', exampleSentence_tr: 'Merhaba! Tanıştığımıza memnun oldum.' },
  { id: 'bye', word: 'tschüss', translation_tr: 'hoşça kal', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Tschüss! Bis bald.', exampleSentence_tr: 'Hoşça kal! Yakında görüşürüz.' },
  { id: 'yes', word: 'ja', translation_tr: 'evet', emoji: '✅', level: 'A0', category: 'greetings', exampleSentence: 'Ja, gern.', exampleSentence_tr: 'Evet, memnuniyetle.' },
  { id: 'no', word: 'nein', translation_tr: 'hayır', emoji: '❌', level: 'A0', category: 'greetings', exampleSentence: 'Nein, danke.', exampleSentence_tr: 'Hayır, teşekkür ederim.' },
  { id: 'please', word: 'bitte', translation_tr: 'lütfen', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Wasser, bitte.', exampleSentence_tr: 'Su, lütfen.' },
  { id: 'thankyou', word: 'danke', translation_tr: 'teşekkür ederim', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Danke schön.', exampleSentence_tr: 'Çok teşekkür ederim.' },
  { id: 'sorry', word: 'Entschuldigung', translation_tr: 'özür dilerim', emoji: '😔', level: 'A1', category: 'greetings', exampleSentence: 'Entschuldigung, ich bin spät.', exampleSentence_tr: 'Özür dilerim, geç kaldım.' },

  // ---- colors ----
  { id: 'red', word: 'rot', translation_tr: 'kırmızı', emoji: '🔴', level: 'A0', category: 'colors', exampleSentence: 'Der Apfel ist rot.', exampleSentence_tr: 'Elma kırmızı.' },
  { id: 'blue', word: 'blau', translation_tr: 'mavi', emoji: '🔵', level: 'A0', category: 'colors', exampleSentence: 'Der Himmel ist blau.', exampleSentence_tr: 'Gökyüzü mavi.' },
  { id: 'green', word: 'grün', translation_tr: 'yeşil', emoji: '🟢', level: 'A0', category: 'colors', exampleSentence: 'Das Gras ist grün.', exampleSentence_tr: 'Çim yeşil.' },
  { id: 'yellow', word: 'gelb', translation_tr: 'sarı', emoji: '🟡', level: 'A0', category: 'colors', exampleSentence: 'Die Banane ist gelb.', exampleSentence_tr: 'Muz sarı.' },

  // ---- numbers ----
  { id: 'one', word: 'eins', translation_tr: 'bir', emoji: '1️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Ich habe einen Bruder.', exampleSentence_tr: 'Bir erkek kardeşim var.' },
  { id: 'two', word: 'zwei', translation_tr: 'iki', emoji: '2️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Ich habe zwei Katzen.', exampleSentence_tr: 'İki kedim var.' },
  { id: 'three', word: 'drei', translation_tr: 'üç', emoji: '3️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Drei Bücher liegen auf dem Tisch.', exampleSentence_tr: 'Masada üç kitap var.' },

  // ---- objects ----
  { id: 'ball', word: 'Ball', translation_tr: 'top', emoji: '⚽', level: 'A0', category: 'objects', exampleSentence: 'Der Junge spielt mit einem Ball.', exampleSentence_tr: 'Çocuk topla oynuyor.' },
  { id: 'book', word: 'Buch', translation_tr: 'kitap', emoji: '📕', level: 'A0', category: 'objects', exampleSentence: 'Ich lese ein Buch.', exampleSentence_tr: 'Bir kitap okurum.' },
  { id: 'car', word: 'Auto', translation_tr: 'araba', emoji: '🚗', level: 'A0', category: 'objects', exampleSentence: 'Das Auto ist schnell.', exampleSentence_tr: 'Araba hızlı.' },
  { id: 'house', word: 'Haus', translation_tr: 'ev', emoji: '🏠', level: 'A0', category: 'objects', exampleSentence: 'Das ist mein Haus.', exampleSentence_tr: 'Bu benim evim.' },
  { id: 'bed', word: 'Bett', translation_tr: 'yatak', emoji: '🛏️', level: 'A0', category: 'objects', exampleSentence: 'Ich schlafe in meinem Bett.', exampleSentence_tr: 'Yatağımda uyurum.' },
  { id: 'chair', word: 'Stuhl', translation_tr: 'sandalye', emoji: '🪑', level: 'A1', category: 'objects', exampleSentence: 'Setz dich bitte auf den Stuhl.', exampleSentence_tr: 'Lütfen sandalyeye otur.' },
  { id: 'phone', word: 'Handy', translation_tr: 'telefon', emoji: '📱', level: 'A1', category: 'objects', exampleSentence: 'Mein Handy ist neu.', exampleSentence_tr: 'Telefonum yeni.' },
  { id: 'bag', word: 'Tasche', translation_tr: 'çanta', emoji: '🎒', level: 'A1', category: 'objects', exampleSentence: 'Sie hat eine rote Tasche.', exampleSentence_tr: 'Onun kırmızı bir çantası var.' },
  { id: 'umbrella', word: 'Regenschirm', translation_tr: 'şemsiye', emoji: '☂️', level: 'A1', category: 'objects', exampleSentence: 'Nimm deinen Regenschirm, es regnet.', exampleSentence_tr: 'Şemsiyeni al, yağmur yağıyor.' },
  { id: 'key', word: 'Schlüssel', translation_tr: 'anahtar', emoji: '🔑', level: 'A1', category: 'objects', exampleSentence: 'Wo ist mein Schlüssel?', exampleSentence_tr: 'Anahtarım nerede?' },

  // ---- feelings ----
  { id: 'happy', word: 'glücklich', translation_tr: 'mutlu', emoji: '😊', level: 'A1', category: 'feelings', exampleSentence: 'Ich bin heute glücklich.', exampleSentence_tr: 'Bugün mutluyum.' },
  { id: 'sad', word: 'traurig', translation_tr: 'üzgün', emoji: '😢', level: 'A1', category: 'feelings', exampleSentence: 'Sie sieht traurig aus.', exampleSentence_tr: 'Üzgün görünüyor.' },
  { id: 'tired', word: 'müde', translation_tr: 'yorgun', emoji: '😪', level: 'A1', category: 'feelings', exampleSentence: 'Ich bin nach der Schule müde.', exampleSentence_tr: 'Okuldan sonra yorgunum.' },
  { id: 'hungry', word: 'hungrig', translation_tr: 'aç', emoji: '🍽️', level: 'A1', category: 'feelings', exampleSentence: 'Ich bin hungrig, lass uns essen.', exampleSentence_tr: 'Açım, hadi yiyelim.' }
];

export function getVocabById(id) {
  return VOCABULARY.find(v => v.id === id);
}

export function getVocabByLevel(level) {
  return VOCABULARY.filter(v => v.level === level);
}

export function getVocabByCategory(category) {
  return VOCABULARY.filter(v => v.category === category);
}
