import { createScenario } from '../scenarioSchema.js?v=7';

// ── Café order (A1) ─────────────────────────────────────────────────────────
export const cafeOrder = createScenario({
  id: 'cafe-order',
  title: 'Bestellen im Café',
  titleTr: 'Kafede sipariş vermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'A1',
  goal: 'Bestelle ein Getränk so, wie du es magst.',
  goalTr: 'İçeceğini istediğin gibi sipariş et.',
  npcIds: ['mia'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'mia', emotion: 'happy',
      text: 'Hallo! Was darf es sein?',
      translation: 'Merhaba! Ne alırsınız?',
      choices: [
        { id: 'coffee', intentionTr: 'Bir kahve iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Hallo! Kann ich bitte einen Kaffee haben?',
          translation: 'Merhaba! Bir kahve alabilir miyim, lütfen?',
          altAccepted: ['Einen Kaffee bitte', 'Ich hätte gern einen Kaffee'],
          next: 'size' },
        { id: 'tea', intentionTr: 'Bir çay iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Könnte ich bitte eine Tasse Tee bekommen?',
          translation: 'Bir fincan çay alabilir miyim, lütfen?',
          altAccepted: ['Kann ich bitte einen Tee haben', 'Einen Tee bitte'],
          next: 'size' },
        { id: 'recommend', intentionTr: 'Ne önerdiğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Was ist hier gut? Was empfehlen Sie?',
          translation: 'Burada ne güzel? Ne önerirsin?',
          altAccepted: ['Was empfehlen Sie', 'Was ist hier beliebt'],
          next: 'suggest' }
      ]
    },
    suggest: {
      id: 'suggest', speakerId: 'mia', emotion: 'friendly',
      text: 'Unser Karamell-Latte ist ein Favorit, und der Eistee ist super an einem heißen Tag. Was klingt gut?',
      translation: 'Karamelli latte favorimiz, sıcak günlerde de buzlu çay harika. Hangisi hoşuna gitti?',
      choices: [
        { id: 'latte', intentionTr: 'Latte’yi seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Der Karamell-Latte klingt perfekt. Den nehme ich.',
          translation: 'Karamelli latte harika. Onu alayım.',
          altAccepted: ['Ich nehme den Karamell-Latte', 'Den Karamell-Latte bitte'],
          next: 'size', relationshipEffect: 1 },
        { id: 'icedtea', intentionTr: 'Buzlu çayı seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Ich probiere den Eistee, danke.',
          translation: 'Buzlu çayı deneyeyim, teşekkürler.',
          altAccepted: ['Den Eistee bitte', 'Ich nehme den Eistee'],
          next: 'size' }
      ]
    },
    size: {
      id: 'size', speakerId: 'mia', emotion: 'neutral',
      text: 'Gern! Welche Größe möchten Sie — klein, mittel oder groß?',
      translation: 'Tabii! Hangi boy istersiniz — küçük, orta, yoksa büyük?',
      choices: [
        { id: 'medium', intentionTr: 'Orta boy iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Mittel, bitte. Zum Mitnehmen.',
          translation: 'Orta boy, lütfen. Dışarı alacağım.',
          altAccepted: ['Mittel bitte zum Mitnehmen', 'Eine mittlere Größe zum Mitnehmen'],
          next: 'end_ordered' },
        { id: 'large_stay', intentionTr: 'Büyük iste ve içeride kal', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Einen großen, und ich trinke ihn hier.',
          translation: 'Büyük boy ve burada içeceğim.',
          altAccepted: ['Groß und ich trinke ihn hier', 'Einen großen zum Hiertrinken'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Bestellung fertig', titleTr: 'Sipariş hazır',
      text: 'Du hast dein Getränk klar bestellt, mit Größe und allem. Lass es dir schmecken!',
      translation: 'İçeceğini boyuyla birlikte net biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Café catch-up with a friend (B1) ────────────────────────────────────────
export const cafeMeetup = createScenario({
  id: 'cafe-meetup',
  title: 'Eine alte Freundin wiedertreffen',
  titleTr: 'Eski bir arkadaşla hasret gidermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'B1',
  goal: 'Nimm wieder Kontakt zu einer Freundin auf, die du seit Jahren nicht gesehen hast.',
  goalTr: 'Yıllardır görmediğin bir arkadaşınla yeniden bağ kur.',
  npcIds: ['hannah'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'hannah', emotion: 'surprised',
      text: 'Oh mein Gott — bist du das wirklich? Wie lange ist das her, fünf Jahre?',
      translation: 'Aman tanrım — bu gerçekten sen misin? Ne kadar oldu, beş yıl mı?',
      choices: [
        { id: 'warm', intentionTr: 'Sıcak bir şekilde karşılık ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Hannah! Ich kann es nicht glauben, du siehst genauso aus wie früher!',
          translation: 'Hannah! İnanamıyorum — tıpatıp aynısın!',
          altAccepted: ['Ich kann es nicht glauben, du siehst gleich aus', 'Hannah, schön dich zu sehen'],
          next: 'whats_new', relationshipEffect: 2 },
        { id: 'surprised', intentionTr: 'Şaşkınlığını dile getir', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Wow, was für ein Zufall! Was machst du hier?',
          translation: 'Vay, ne tesadüf! Burada ne yapıyorsun?',
          altAccepted: ['Was für ein Zufall, was machst du hier', 'Was machst du denn hier'],
          next: 'whats_new' }
      ]
    },
    whats_new: {
      id: 'whats_new', speakerId: 'hannah', emotion: 'happy',
      text: 'Ich bin letzten Monat zurückgezogen! Ich arbeite jetzt im Krankenhaus. Erzähl mal — was hast du so gemacht?',
      translation: 'Geçen ay geri taşındım! Şimdi hastanede çalışıyorum. Anlat bakalım — sen neler yapıyordun?',
      choices: [
        { id: 'job', intentionTr: 'İşinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Es hat sich viel verändert! Vor zwei Jahren habe ich meine eigene Firma gegründet.',
          translation: 'Çok şey değişti! İki yıl önce kendi işimi kurdum.',
          altAccepted: ['Ich habe vor zwei Jahren meine eigene Firma gegründet', 'Ich führe jetzt meine eigene Firma'],
          next: 'plans', relationshipEffect: 1 },
        { id: 'travel', intentionTr: 'Seyahatlerinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Ehrlich gesagt bin ich viel gereist, ich bin gerade aus Japan zurück.',
          translation: 'Açıkçası çok seyahat ediyordum — daha yeni Japonya’dan döndüm.',
          altAccepted: ['Ich bin viel gereist und gerade aus Japan zurück', 'Ich komme gerade aus Japan zurück'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'hannah', emotion: 'friendly',
      text: 'Das ist großartig! Wir haben so viel nachzuholen. Hast du Zeit für einen richtigen Kaffee, oder musst du gleich weiter?',
      translation: 'Bu harika! Konuşacak çok şeyimiz var. Doğru dürüst bir kahveye vaktin var mı, yoksa acele mi ediyorsun?',
      choices: [
        { id: 'stay', intentionTr: 'Kal ve sohbet et', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'Ich habe den ganzen Nachmittag Zeit. Suchen wir uns einen Tisch und reden in Ruhe.',
          translation: 'Bütün öğleden sonram boş. Bir masa tutup güzelce sohbet edelim.',
          altAccepted: ['Ich habe Zeit, setzen wir uns und reden', 'Nehmen wir uns einen Tisch und reden'],
          next: 'end_reunion', relationshipEffect: 2 },
        { id: 'reschedule', intentionTr: 'Şimdi olmaz ama buluşma ayarla', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Ich muss jetzt los, aber lass uns Nummern tauschen und uns diese Woche richtig treffen.',
          translation: 'Şimdi gitmem lazım ama numaralarımızı alalım ve bu hafta doğru dürüst buluşalım.',
          altAccepted: ['Tauschen wir Nummern und treffen uns diese Woche', 'Ich muss los, aber wir treffen uns diese Woche'],
          next: 'end_plan', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_reunion: { id: 'end_reunion', kind: 'relationship', title: 'Ein echtes Wiedersehen', titleTr: 'Gerçek bir buluşma',
      text: 'Ihr habt euch hingesetzt und stundenlang geredet. Manche Freundschaften machen genau da weiter, wo sie aufgehört haben.',
      translation: 'Oturup saatlerce konuştunuz. Bazı dostluklar kaldığı yerden devam eder.',
      relationshipEffect: 2, coins: 16 },
    end_plan: { id: 'end_plan', kind: 'success', title: 'Ein Plan für ein Treffen', titleTr: 'Buluşma planı',
      text: 'Du konntest nicht bleiben, aber ihr habt einen festen Plan gemacht, euch wiederzusehen. Warm und höflich gelöst.',
      translation: 'Kalamadın ama tekrar buluşmak için sağlam bir plan yaptın. Sıcak ve kibarca halledildi.',
      coins: 10 }
  }
});
