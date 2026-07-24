import { createScenario } from '../scenarioSchema.js?v=7';

// ── Bank: reporting a lost card (B1) ────────────────────────────────────────
export const bankLostCard = createScenario({
  id: 'bank-lost-card',
  title: 'Eine verlorene Karte melden',
  titleTr: 'Kayıp kartı bildirmek',
  environmentId: 'bank', sceneType: 'bank-office', level: 'B1',
  goal: 'Melde deine verlorene Karte und besorge Ersatz.',
  goalTr: 'Kayıp kartını bildir ve yenisini al.',
  npcIds: ['david'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'david', emotion: 'friendly',
      text: 'Guten Morgen. Wie kann ich Ihnen heute helfen?',
      translation: 'Günaydın. Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'lost', intentionTr: 'Kartını kaybettiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Guten Morgen. Ich glaube, ich habe meine Bankkarte verloren.',
          translation: 'Günaydın. Sanırım banka kartımı kaybettim.',
          altAccepted: ['Ich habe meine Bankkarte verloren', 'Ich glaube ich habe meine Karte verloren'],
          next: 'when_lost' },
        { id: 'stolen', intentionTr: 'Kartının çalınmış olabileceğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Ich muss meine Karte sperren lassen, ich glaube, sie wurde vielleicht gestohlen.',
          translation: 'Kartımı bloke ettirmem gerekiyor — sanırım çalınmış olabilir.',
          altAccepted: ['Ich glaube meine Karte wurde gestohlen bitte sperren', 'Meine Karte wurde vielleicht gestohlen'],
          next: 'block_now' }
      ]
    },
    when_lost: {
      id: 'when_lost', speakerId: 'david', emotion: 'concerned',
      text: 'Das tut mir leid. Wann haben Sie sie zuletzt benutzt? Ich sperre sie sofort.',
      translation: 'Bunu duyduğuma üzüldüm. En son ne zaman kullandınız? Hemen bloke edeceğim.',
      choices: [
        { id: 'yesterday', intentionTr: 'Dün kullandığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe sie gestern in einem Restaurant benutzt und seitdem nicht mehr gesehen.',
          translation: 'Dün bir restoranda kullandım ve o zamandan beri görmedim.',
          altAccepted: ['Zuletzt gestern in einem Restaurant', 'Gestern im Restaurant und seitdem nicht mehr'],
          next: 'new_card' },
        { id: 'not_sure', intentionTr: 'Emin olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ehrlich gesagt bin ich nicht sicher. Vielleicht vor zwei Tagen.',
          translation: 'Açıkçası emin değilim. Belki iki gün önce.',
          altAccepted: ['Ich bin nicht sicher vielleicht vor zwei Tagen', 'Ehrlich gesagt weiß ich es nicht genau vor ein paar Tagen'],
          next: 'new_card' }
      ]
    },
    block_now: {
      id: 'block_now', speakerId: 'david', emotion: 'concerned',
      text: 'Verstanden — ich sperre sie in dieser Sekunde. Erledigt. Sind Ihnen Zahlungen aufgefallen, die Sie nicht kennen?',
      translation: 'Anlaşıldı — şu an bloke ediyorum. Tamam. Tanımadığınız bir ödeme fark ettiniz mi?',
      choices: [
        { id: 'yes_strange', intentionTr: 'Tanımadığın bir ödeme olduğunu söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Ja, tatsächlich, da ist eine Zahlung, die ich ganz sicher nicht gemacht habe.',
          translation: 'Evet, aslında — kesinlikle benim yapmadığım bir ödeme var.',
          altAccepted: ['Da ist eine Zahlung die nicht von mir ist', 'Ja ich sehe eine Abbuchung die nicht meine ist'],
          next: 'dispute', relationshipEffect: 1 },
        { id: 'no_strange', intentionTr: 'Tuhaf bir şey yok de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Nein, bis jetzt nichts Ungewöhnliches.',
          translation: 'Hayır, şimdiye kadar tuhaf bir şey yok.',
          altAccepted: ['Nein nichts Seltsames bisher', 'Bisher nichts Ungewöhnliches'],
          next: 'new_card' }
      ]
    },
    dispute: {
      id: 'dispute', speakerId: 'david', emotion: 'friendly',
      text: 'Danke für den Hinweis. Ich eröffne eine Reklamation, und Sie haften nicht dafür. So, jetzt bestellen wir Ihre neue Karte.',
      translation: 'Bildirdiğiniz için teşekkürler. Bir itiraz başlatacağım ve bundan sorumlu olmayacaksınız. Şimdi yeni kartınızı sipariş edelim.',
      next: 'new_card'
    },
    new_card: {
      id: 'new_card', speakerId: 'david', emotion: 'helpful',
      text: 'Ich kann Ihnen in drei bis fünf Tagen eine neue Karte an Ihre Adresse schicken, oder Sie holen sie morgen hier ab. Was passt Ihnen?',
      translation: 'Yeni kartı üç-beş günde adresinize gönderebilirim ya da yarın buradan alabilirsiniz. Hangisi uygun?',
      choices: [
        { id: 'post', intentionTr: 'Posta ile gönderilmesini iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Schicken Sie sie bitte an meine Adresse. Das passt.',
          translation: 'Lütfen adresime gönderin. Uygun.',
          altAccepted: ['Bitte an meine Adresse schicken', 'Per Post ist gut'],
          next: 'end_sorted' },
        { id: 'collect', intentionTr: 'Yarın gelip almayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich würde sie lieber morgen abholen, wenn das möglich ist.',
          translation: 'Mümkünse yarın gelip almayı tercih ederim.',
          altAccepted: ['Ich hole sie morgen ab', 'Kann ich sie morgen hier abholen'],
          next: 'end_sorted', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_sorted: { id: 'end_sorted', kind: 'problem-solved', title: 'Karte geregelt', titleTr: 'Kart halledildi',
      text: 'Du hast die verlorene Karte ruhig gemeldet, sperren lassen und Ersatz organisiert. Genau die richtigen Schritte.',
      translation: 'Kayıp kartı sakince bildirdin, bloke ettirdin ve yenisini ayarladın. Tam da doğru adımlar.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Police station: reporting a lost phone (B1) ─────────────────────────────
export const policeLostPhone = createScenario({
  id: 'police-lost-phone',
  title: 'Ein verlorenes Handy melden',
  titleTr: 'Kayıp telefonu bildirmek',
  environmentId: 'police', sceneType: 'formal-office', level: 'B1',
  goal: 'Erstatte Anzeige für dein verlorenes Handy und gib die Details an.',
  goalTr: 'Kayıp telefonun için tutanak tut ve ayrıntıları ver.',
  npcIds: ['grant'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grant', emotion: 'friendly',
      text: 'Guten Tag. Was kann ich für Sie tun?',
      translation: 'İyi günler. Sizin için ne yapabilirim?',
      choices: [
        { id: 'report_lost', intentionTr: 'Telefonunu kaybettiğini bildir', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Hallo. Ich möchte gern ein verlorenes Handy melden, bitte.',
          translation: 'Merhaba. Kayıp bir telefon bildirmek istiyorum, lütfen.',
          altAccepted: ['Ich will ein verlorenes Handy melden', 'Ich möchte mein Handy als verloren melden'],
          next: 'where' },
        { id: 'maybe_stolen', intentionTr: 'Çalınmış olabileceğini bildir', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Ich glaube, mein Handy wurde heute Morgen im Bus gestohlen.',
          translation: 'Sanırım telefonum bu sabah otobüste çalındı.',
          altAccepted: ['Mein Handy wurde heute Morgen im Bus gestohlen', 'Ich glaube mein Handy wurde im Bus genommen'],
          next: 'where' }
      ]
    },
    where: {
      id: 'where', speakerId: 'grant', emotion: 'neutral',
      text: 'In Ordnung, nehmen wir die Details auf. Wo und wann hatten Sie es zuletzt?',
      translation: 'Peki, ayrıntıları alalım. En son nerede ve ne zaman elinizdeydi?',
      choices: [
        { id: 'give_details', intentionTr: 'Ayrıntılı yer ve zaman ver', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Im Bus Nummer 12, heute Morgen gegen acht. Es ist ein schwarzes Handy in einer blauen Hülle.',
          translation: '12 numaralı otobüste, bu sabah sekiz sularında. Mavi kılıfta siyah bir telefon.',
          altAccepted: ['Im 12er Bus gegen acht schwarzes Handy blaue Hülle', 'Gegen acht im Bus Nummer 12 ein schwarzes Handy mit blauer Hülle'],
          next: 'contact', relationshipEffect: 1 },
        { id: 'vague_details', intentionTr: 'Kısaca, emin olmadan söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Irgendwo in der Innenstadt heute Morgen. Ich bin nicht ganz sicher, wo.',
          translation: 'Bu sabah şehir merkezinde bir yerde. Tam olarak nerede emin değilim.',
          altAccepted: ['In der Innenstadt heute Morgen nicht genau sicher', 'Irgendwo im Zentrum heute früh'],
          next: 'contact' }
      ]
    },
    contact: {
      id: 'contact', speakerId: 'grant', emotion: 'helpful',
      text: 'Alles klar. Ich nehme die Anzeige auf und gebe Ihnen ein Aktenzeichen. Wie sollen wir Sie erreichen, falls es auftaucht?',
      translation: 'Aldım. Tutanağı tutup size bir referans numarası vereceğim. Bulunursa sizinle nasıl iletişim kuralım?',
      choices: [
        { id: 'by_email', intentionTr: 'E-posta ile iletişim iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Per E-Mail wäre am besten, danke.',
          translation: 'E-posta ile olması en iyisi, teşekkürler.',
          altAccepted: ['E-Mail ist am besten danke', 'Per E-Mail bitte'],
          next: 'end_filed' },
        { id: 'ask_insurance', intentionTr: 'Sigorta için ne gerektiğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Per E-Mail, bitte. Und bekomme ich ein Dokument für meine Versicherung?',
          translation: 'E-posta ile, lütfen. Ayrıca, sigortam için bir belge alacak mıyım?',
          altAccepted: ['Bekomme ich ein Dokument für die Versicherung', 'Gibt es Unterlagen für meine Versicherung'],
          next: 'insurance', relationshipEffect: 1 }
      ]
    },
    insurance: {
      id: 'insurance', speakerId: 'grant', emotion: 'friendly',
      text: 'Ja — das Aktenzeichen und diese Anzeige sind genau das, was Ihre Versicherung braucht. Bitte sehr. Viel Glück.',
      translation: 'Evet — referans numarası ve bu tutanak, sigortacınızın tam olarak isteyeceği şey. Buyurun. Bol şans.',
      next: 'end_insurance'
    }
  },
  endings: {
    end_filed: { id: 'end_filed', kind: 'problem-solved', title: 'Anzeige erstattet', titleTr: 'Tutanak tutuldu',
      text: 'Du hast das Handy klar und mit allen Details gemeldet. Mehr konntest du nicht tun.',
      translation: 'Telefonu tüm ayrıntılarıyla net biçimde bildirdin. Yapabileceğin başka bir şey yoktu.',
      coins: 10 },
    end_insurance: { id: 'end_insurance', kind: 'excellent', title: 'Bereit für die Versicherung', titleTr: 'Sigortaya hazır',
      text: 'Du hast vorausgedacht und nach den Versicherungsunterlagen gefragt. Diese Frage kann dir viel Geld sparen.',
      translation: 'İleriyi düşündün ve sigorta belgesini istedin. Bu soru sana çok para kazandırabilir.',
      coins: 14 }
  }
});
