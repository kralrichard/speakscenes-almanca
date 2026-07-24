import { createScenario } from '../scenarioSchema.js?v=7';

// ── Meeting a new friend (A1) ───────────────────────────────────────────────
export const meetingFriend = createScenario({
  id: 'meeting-friend',
  title: 'Einen neuen Mitschüler kennenlernen',
  titleTr: 'Yeni bir sınıf arkadaşıyla tanışmak',
  environmentId: 'street', sceneType: 'school', level: 'A1',
  goal: 'Stell dich vor und finde einen neuen Freund.',
  goalTr: 'Kendini tanıt ve yeni bir arkadaş edin.',
  npcIds: ['leo'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'leo', emotion: 'friendly',
      text: 'Hi! Ich glaube, wir kennen uns noch nicht. Ich bin Leo. Bist du neu hier?',
      translation: 'Selam! Sanırım tanışmadık. Ben Leo. Buraya yeni mi geldin?',
      choices: [
        { id: 'introduce', intentionTr: 'Kendini tanıt', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Hi Leo! Ich bin Sam. Ja, das ist meine erste Woche.',
          translation: 'Selam Leo! Ben Sam. Evet, ilk haftam.',
          altAccepted: ['Hi ich bin Sam ja meine erste Woche', 'Hallo Leo ich heiße Sam ich bin neu'],
          next: 'where_from', relationshipEffect: 1 },
        { id: 'shy', intentionTr: 'Utangaç ama nazik ol', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hallo. Ja, ich bin neu. Schön, dich kennenzulernen.',
          translation: 'Merhaba. Evet, yeniyim. Tanıştığıma memnun oldum.',
          altAccepted: ['Hi ja ich bin neu freut mich', 'Hallo ich bin neu hier freut mich'],
          next: 'where_from' }
      ]
    },
    where_from: {
      id: 'where_from', speakerId: 'leo', emotion: 'curious',
      text: 'Freut mich, Sam! Woher kommst du?',
      translation: 'Tanıştığıma memnun oldum, Sam! Nerelisin?',
      choices: [
        { id: 'from_turkey', intentionTr: 'Nereli olduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Ich komme aus der Türkei. Ich bin letzten Monat hergezogen.',
          translation: 'Türkiye’denim. Geçen ay buraya taşındım.',
          altAccepted: ['Ich komme aus der Türkei und bin letzten Monat hergezogen', 'Aus der Türkei ich bin neu hier'],
          next: 'hobbies' },
        { id: 'ask_back', intentionTr: 'Sen nerelisin diye sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Ich komme aus der Türkei. Und du, bist du von hier?',
          translation: 'Türkiye’denim. Ya sen — buralı mısın?',
          altAccepted: ['Ich komme aus der Türkei und du', 'Aus der Türkei woher kommst du'],
          next: 'hobbies', relationshipEffect: 1 }
      ]
    },
    hobbies: {
      id: 'hobbies', speakerId: 'leo', emotion: 'happy',
      text: 'Cool! Ein paar von uns spielen freitags nach dem Unterricht Fußball. Willst du diese Woche mitkommen?',
      translation: 'Harika! Birkaçımız cuma günleri dersten sonra futbol oynuyoruz. Bu hafta bize katılmak ister misin?',
      choices: [
        { id: 'accept', intentionTr: 'Daveti kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Das klingt nach Spaß! Ich komme sehr gern mit.',
          translation: 'Kulağa eğlenceli geliyor! Size katılmayı çok isterim.',
          altAccepted: ['Ich komme gern mit', 'Klingt super ich komme gern'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'decline_polite', intentionTr: 'Kibarca reddet ama başka zaman de', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Diesen Freitag kann ich nicht, aber vielleicht nächste Woche?',
          translation: 'Bu cuma olmaz ama belki gelecek hafta?',
          altAccepted: ['Diesen Freitag nicht aber vielleicht nächste Woche', 'Freitag bin ich beschäftigt wie wäre nächste Woche'],
          next: 'end_maybe', relationshipEffect: 1 },
        { id: 'ask_details', intentionTr: 'Saatini ve yerini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Vielleicht! Um wie viel Uhr fängt es an, und wo spielt ihr?',
          translation: 'Belki! Kaçta başlıyor ve nerede oynuyorsunuz?',
          altAccepted: ['Wann und wo spielt ihr', 'Um wie viel Uhr fängt es an und wo'],
          next: 'details' }
      ]
    },
    details: {
      id: 'details', speakerId: 'leo', emotion: 'friendly',
      text: 'Wir fangen um vier an, im Park hinter der Schule. Bring Sportschuhe mit und komm einfach vorbei!',
      translation: 'Saat dörtte, okulun arkasındaki parkta başlıyoruz. Spor ayakkabı getir ve gel!',
      choices: [
        { id: 'ill_come', intentionTr: 'Geleceğini söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfekt, ich bin um vier da. Danke für die Einladung!',
          translation: 'Mükemmel, dörtte orada olacağım. Davet ettiğin için teşekkürler!',
          altAccepted: ['Super ich bin um vier da', 'Ich komme um vier danke für die Einladung'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'ask_bring', intentionTr: 'Başka bir şey getirmen gerekip gerekmediğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Klingt super! Soll ich außer Sportschuhen noch etwas mitbringen?',
          translation: 'Harika! Spor ayakkabı dışında başka bir şey getirmeli miyim?',
          altAccepted: ['Soll ich noch etwas mitbringen', 'Brauche ich außer Sportschuhen noch etwas'],
          next: 'end_friends', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_friends: { id: 'end_friends', kind: 'relationship', title: 'Ein neuer Freund', titleTr: 'Yeni bir arkadaş',
      text: 'Du hast dich herzlich vorgestellt und mit Leo Pläne gemacht. So beginnen Freundschaften!',
      translation: 'Kendini içtenlikle tanıttın ve Leo ile plan yaptın. Arkadaşlıklar böyle başlar!',
      relationshipEffect: 1, coins: 12 },
    end_maybe: { id: 'end_maybe', kind: 'success', title: 'Ein guter Anfang', titleTr: 'İyi bir başlangıç',
      text: 'Diesmal hat es nicht geklappt, aber du hast die Tür höflich offen gelassen. Leo fragt bestimmt wieder.',
      translation: 'Bu sefer gelemedin ama kapıyı kibarca açık bıraktın. Leo tekrar soracak.',
      coins: 8 }
  }
});

// ── Asking for directions (A2) ──────────────────────────────────────────────
export const askingDirections = createScenario({
  id: 'asking-directions',
  title: 'Den Weg finden',
  titleTr: 'Yolunu bulmak',
  environmentId: 'street', sceneType: 'street', level: 'A2',
  goal: 'Frag eine Fremde nach dem Weg und verstehe die Antwort.',
  goalTr: 'Bir yabancıdan yol tarifi iste ve cevabı anla.',
  npcIds: ['sophie'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'sophie', emotion: 'friendly',
      text: 'Du siehst etwas verloren aus — kann ich dir helfen, etwas zu finden?',
      translation: 'Biraz kaybolmuş görünüyorsun — bir şey bulmana yardım edebilir miyim?',
      choices: [
        { id: 'ask_station', intentionTr: 'İstasyonun yerini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ja, bitte. Können Sie mir sagen, wie ich zum Bahnhof komme?',
          translation: 'Evet, lütfen. Tren istasyonuna nasıl gideceğimi söyler misiniz?',
          altAccepted: ['Wie komme ich zum Bahnhof', 'Können Sie mir den Weg zum Bahnhof sagen'],
          next: 'station_dir', relationshipEffect: 1 },
        { id: 'ask_pharmacy', intentionTr: 'En yakın eczaneyi sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Könnten Sie mir sagen, wo die nächste Apotheke ist?',
          translation: 'En yakın eczanenin nerede olduğunu söyleyebilir misiniz?',
          altAccepted: ['Wo ist die nächste Apotheke', 'Wissen Sie wo die nächste Apotheke ist'],
          next: 'pharmacy_dir', relationshipEffect: 1 }
      ]
    },
    station_dir: {
      id: 'station_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'Klar! Geh diese Straße geradeaus, nimm die zweite links, und er ist direkt vor dir. Etwa fünf Minuten.',
      translation: 'Tabii! Bu caddeden düz git, ikinci soldan dön, tam karşında. Yaklaşık beş dakika.',
      choices: [
        { id: 'confirm_understood', intentionTr: 'Anladığını tekrar ederek doğrula', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Also geradeaus und dann die zweite links. Ist es zu Fuß weit?',
          translation: 'Yani, düz git ve ikinci soldan dön. Yürüyerek uzak mı?',
          altAccepted: ['Geradeaus und zweite links ist es weit zu Fuß', 'Also zweite links ist das weit'],
          next: 'walkable', relationshipEffect: 1 },
        { id: 'thanks_go', intentionTr: 'Teşekkür et ve git', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Verstanden, vielen Dank für Ihre Hilfe!',
          translation: 'Anladım, yardımın için çok teşekkürler!',
          altAccepted: ['Vielen Dank für die Hilfe', 'Alles klar danke sehr'],
          next: 'end_found' }
      ]
    },
    pharmacy_dir: {
      id: 'pharmacy_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'Gleich um die Ecke ist eine, neben der Bäckerei. An der Ampel rechts abbiegen, dann sehen Sie sie schon.',
      translation: 'Hemen köşede, fırının yanında bir tane var. Trafik ışıklarında sağa dön, göreceksin.',
      choices: [
        { id: 'thank_pharmacy', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'An der Ampel rechts, neben der Bäckerei. Danke!',
          translation: 'Işıklarda sağa, fırının yanında. Teşekkürler!',
          altAccepted: ['Rechts an der Ampel bei der Bäckerei danke', 'An der Ampel rechts alles klar danke'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_open', intentionTr: 'Şu an açık mı diye sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Danke! Wissen Sie, ob sie um diese Uhrzeit geöffnet hat?',
          translation: 'Teşekkürler! Bu saatte açık mı, biliyor musunuz?',
          altAccepted: ['Hat sie um diese Zeit geöffnet', 'Wissen Sie ob sie jetzt offen ist'],
          next: 'end_found', relationshipEffect: 1 }
      ]
    },
    walkable: {
      id: 'walkable', speakerId: 'sophie', emotion: 'happy',
      text: 'Gar nicht weit — fünf Minuten, der ganze Weg ist eben. Das schaffst du locker. Gute Reise!',
      translation: 'Hiç uzak değil — beş dakika, yol boyunca düz. Sorun olmaz. İyi yolculuklar!',
      next: 'end_confirmed'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'Auf dem Weg', titleTr: 'Yolunda',
      text: 'Du hast klar gefragt und Sophie gedankt. Du weißt genau, wohin du musst.',
      translation: 'Net biçimde sordun ve Sophie’ye teşekkür ettin. Nereye gideceğini tam olarak biliyorsun.',
      coins: 10 },
    end_confirmed: { id: 'end_confirmed', kind: 'excellent', title: 'Bestätigt und sicher', titleTr: 'Doğrulandı ve emin',
      text: 'Du hast die Wegbeschreibung wiederholt, um sicherzugehen, und noch eine Frage gestellt. Das Zeichen eines selbstbewussten Sprechers.',
      translation: 'Anladığını kontrol etmek için tarifi tekrarladın ve bir soru daha sordun. Bu, kendinden emin bir konuşmacının işareti.',
      relationshipEffect: 1, coins: 14 }
  }
});
