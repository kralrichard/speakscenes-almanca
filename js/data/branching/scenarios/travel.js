import { createScenario } from '../scenarioSchema.js?v=6';

// ── Train station: buying a ticket (A2) ─────────────────────────────────────
export const trainTicket = createScenario({
  id: 'train-ticket',
  title: 'Eine Zugfahrkarte kaufen',
  titleTr: 'Tren bileti almak',
  environmentId: 'train', sceneType: 'transit', level: 'A2',
  goal: 'Kaufe die richtige Fahrkarte zu deinem Ziel.',
  goalTr: 'Gideceğin yere doğru bileti al.',
  npcIds: ['nina'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'nina', emotion: 'neutral',
      text: 'Der Nächste, bitte! Wohin reisen Sie heute?',
      translation: 'Sıradaki, lütfen! Bugün nereye seyahat ediyorsunuz?',
      choices: [
        { id: 'to_london', intentionTr: 'Londra’ya bilet iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hallo, ich hätte gern eine Fahrkarte nach London, bitte.',
          translation: 'Merhaba, Londra’ya bir bilet istiyorum, lütfen.',
          altAccepted: ['Eine Fahrkarte nach London bitte', 'Kann ich eine Fahrkarte nach London haben'],
          next: 'return_or_single' },
        { id: 'ask_next', intentionTr: 'Bir sonraki treni sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Wann fährt der nächste Zug nach London?',
          translation: 'Londra’ya bir sonraki tren ne zaman?',
          altAccepted: ['Um wie viel Uhr fährt der nächste Zug nach London', 'Wann geht der nächste Zug nach London'],
          next: 'next_train' }
      ]
    },
    next_train: {
      id: 'next_train', speakerId: 'nina', emotion: 'helpful',
      text: 'Der nächste fährt um 14:15 von Gleis drei. Möchten Sie dafür eine Fahrkarte?',
      translation: 'Bir sonraki 2:15’te üç numaralı perondan kalkıyor. Ona bilet ister misiniz?',
      choices: [
        { id: 'yes_ticket', intentionTr: 'Evet, o bilete al', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja bitte, eine Fahrkarte für den um 14:15.',
          translation: 'Evet lütfen, 2:15 için bir bilet.',
          altAccepted: ['Ja eine für den um Viertel nach zwei', 'Eine Fahrkarte für diesen Zug bitte'],
          next: 'return_or_single' },
        { id: 'confirm_platform', intentionTr: 'Perdonu teyit ederek bilet al', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ja, eine Fahrkarte bitte. Gleis drei, sagten Sie?',
          translation: 'Evet, bir bilet lütfen. Peron üç, demiştiniz değil mi?',
          altAccepted: ['Eine Fahrkarte Gleis drei richtig', 'Ja bitte das war Gleis drei'],
          next: 'return_or_single' }
      ]
    },
    return_or_single: {
      id: 'return_or_single', speakerId: 'nina', emotion: 'neutral',
      text: 'Einfach oder hin und zurück?',
      translation: 'Tek yön mü gidiş-dönüş mü?',
      choices: [
        { id: 'return', intentionTr: 'Gidiş-dönüş iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Hin und zurück, bitte. Ich komme heute Abend wieder.',
          translation: 'Gidiş-dönüş, lütfen. Bu gece dönüyorum.',
          altAccepted: ['Hin und zurück bitte', 'Hin und zurück ich bin abends zurück'],
          next: 'end_ticket' },
        { id: 'single', intentionTr: 'Tek yön iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Nur einfach, danke.',
          translation: 'Sadece tek yön, teşekkürler.',
          altAccepted: ['Einfach bitte', 'Nur eine einfache Fahrt danke'],
          next: 'end_ticket' },
        { id: 'ask_discount', intentionTr: 'İndirim olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Hin und zurück — und gibt es einen Studentenrabatt?',
          translation: 'Gidiş-dönüş — ve öğrenci indirimi var mı?',
          altAccepted: ['Hin und zurück und gibt es Studentenrabatt', 'Haben Sie einen Studentenrabatt'],
          next: 'discount' }
      ]
    },
    discount: {
      id: 'discount', speakerId: 'nina', emotion: 'friendly',
      text: 'Gibt es tatsächlich — mit gültigem Studentenausweis sind es zwanzig Prozent Rabatt. Haben Sie einen?',
      translation: 'Aslında var — geçerli öğrenci kartıyla yüzde yirmi indirim. Kartınız var mı?',
      next: 'end_discount'
    }
  },
  endings: {
    end_ticket: { id: 'end_ticket', kind: 'success', title: 'Fahrkarte in der Hand', titleTr: 'Bilet elde',
      text: 'Du hast die richtige Fahrkarte gekauft und kennst dein Gleis. Alles einsteigen!',
      translation: 'Doğru bileti aldın ve peronunu biliyorsun. Herkes trene!',
      coins: 10 },
    end_discount: { id: 'end_discount', kind: 'excellent', title: 'Günstigere Fahrkarte', titleTr: 'Daha ucuz bilet',
      text: 'Du hast daran gedacht, nach einem Rabatt zu fragen, und Geld gespart. Clever reisen!',
      translation: 'İndirim sormayı akıl ettin ve para biriktirdin. Akıllı yolculuk!',
      coins: 14 }
  }
});

// ── Taxi ride (A2) ──────────────────────────────────────────────────────────
export const taxiRide = createScenario({
  id: 'taxi-ride',
  title: 'Mit dem Taxi fahren',
  titleTr: 'Taksiye binmek',
  environmentId: 'taxi', sceneType: 'taxi', level: 'A2',
  goal: 'Sag dem Fahrer, wohin es geht, und meistere die Fahrt.',
  goalTr: 'Sürücüye nereye gideceğini söyle ve yolculuğu yönet.',
  npcIds: ['victor'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'victor', emotion: 'friendly',
      text: 'Guten Abend! Steigen Sie ein. Wohin darf ich Sie bringen?',
      translation: 'İyi akşamlar! Atla. Sizi nereye götüreyim?',
      choices: [
        { id: 'airport', intentionTr: 'Havalimanına git de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Zum Flughafen, bitte. Terminal zwei.',
          translation: 'Havalimanına, lütfen. İkinci terminal.',
          altAccepted: ['Flughafen bitte Terminal zwei', 'Zum Flughafen Terminal zwei'],
          next: 'hurry' },
        { id: 'hotel_addr', intentionTr: 'Otel adresini ver', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Könnten Sie mich zum Hotel Sunrise in der King Street bringen?',
          translation: 'Beni King Caddesi’ndeki Sunrise Otel’e götürür müsünüz?',
          altAccepted: ['Zum Hotel Sunrise in der King Street bitte', 'Hotel Sunrise King Street bitte'],
          next: 'smalltalk' }
      ]
    },
    hurry: {
      id: 'hurry', speakerId: 'victor', emotion: 'neutral',
      text: 'Kein Problem. Der Verkehr ist heute Abend etwas dicht — haben Sie es eilig, oder soll ich die schöne Strecke nehmen?',
      translation: 'Sorun değil. Bu gece trafik biraz yoğun — aceleniz var mı, yoksa manzaralı yoldan mı gideyim?',
      choices: [
        { id: 'fast', intentionTr: 'Acelen olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe es eilig — den schnellsten Weg, bitte.',
          translation: 'Acelem var — en hızlı yol, lütfen.',
          altAccepted: ['Den schnellsten Weg bitte ich bin in Eile', 'Die schnellste Route ich habe es eilig'],
          next: 'end_arrived' },
        { id: 'relax', intentionTr: 'Acelen olmadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Gar keine Eile. Wie es für Sie einfacher ist.',
          translation: 'Hiç acelem yok. Sizin için hangisi kolaysa.',
          altAccepted: ['Keine Eile wie es einfacher ist', 'Lassen Sie sich Zeit egal welcher Weg'],
          next: 'smalltalk', relationshipEffect: 1 }
      ]
    },
    smalltalk: {
      id: 'smalltalk', speakerId: 'victor', emotion: 'happy',
      text: 'Und, besuchen Sie die Stadt, oder wohnen Sie hier?',
      translation: 'Peki, şehri mi ziyaret ediyorsunuz yoksa burada mı yaşıyorsunuz?',
      choices: [
        { id: 'tourist', intentionTr: 'Turist olduğunu söyle', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Ich bin nur für ein paar Tage zu Besuch. Eine wunderschöne Stadt!',
          translation: 'Sadece birkaç günlüğüne ziyaretteyim. Güzel bir şehir!',
          altAccepted: ['Ich bin nur ein paar Tage zu Besuch', 'Zu Besuch für ein paar Tage sehr schön hier'],
          next: 'recommend' },
        { id: 'quiet', intentionTr: 'Kibarca sessiz kalmayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Nur zu Besuch. Es war aber ein langer Tag — stört es Sie, wenn ich mich ausruhe?',
          translation: 'Sadece ziyaret. Ama uzun bir gündü — dinlensem sorun olur mu?',
          altAccepted: ['Stört es Sie wenn ich mich ausruhe langer Tag', 'Langer Tag darf ich kurz die Augen zumachen'],
          next: 'end_arrived', relationshipEffect: 1 }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'victor', emotion: 'friendly',
      text: 'Dann müssen Sie unbedingt den alten Markt sehen und den Hafen bei Sonnenuntergang. So, da wären wir — das macht zwölf Euro.',
      translation: 'O zaman eski çarşıyı ve gün batımında limanı mutlaka görmelisiniz. Geldik — on iki euro.',
      next: 'end_tips'
    }
  },
  endings: {
    end_arrived: { id: 'end_arrived', kind: 'success', title: 'Sicher angekommen', titleTr: 'Güvenle vardın',
      text: 'Du hast dem Fahrer das Ziel gesagt und bist problemlos angekommen. Eine leichte Fahrt.',
      translation: 'Sürücüye nereye gideceğini söyledin ve sorunsuz vardın. Kolay bir yolculuk.',
      coins: 10 },
    end_tips: { id: 'end_tips', kind: 'relationship', title: 'Insider-Tipps und ein Freund', titleTr: 'Yerel ipuçları ve bir dost',
      text: 'Du hast mit dem Fahrer geplaudert und tolle lokale Tipps bekommen. Smalltalk bringt dich auf Deutsch weit!',
      translation: 'Sürücüyle sohbet ettin ve harika yerel ipuçları aldın. Almancada biraz sohbet çok işe yarar!',
      relationshipEffect: 1, coins: 12 }
  }
});
