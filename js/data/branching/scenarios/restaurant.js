import { createScenario } from '../scenarioSchema.js?v=6';

// ── Restaurant order (A2) ───────────────────────────────────────────────────
export const restaurantOrder = createScenario({
  id: 'restaurant-order',
  title: 'Abendessen bestellen',
  titleTr: 'Akşam yemeği sipariş etmek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Bestelle ein Essen und ein Getränk so, wie du sie möchtest.',
  goalTr: 'İstediğin şekilde bir yemek ve içecek sipariş et.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'Guten Abend! Hier sind Ihre Speisekarten. Möchten Sie schon bestellen, oder brauchen Sie noch ein paar Minuten?',
      translation: 'İyi akşamlar! Menüleriniz burada. Sipariş vermeye hazır mısınız, yoksa birkaç dakika ister misiniz?',
      choices: [
        { id: 'order_now', intentionTr: 'Hemen sipariş ver', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ich bin so weit. Ich nehme das gegrillte Hähnchen, bitte.',
          translation: 'Hazırım. Izgara tavuk alacağım, lütfen.',
          altAccepted: ['Ich nehme das gegrillte Hähnchen bitte', 'Das gegrillte Hähnchen bitte'],
          next: 'sides' },
        { id: 'need_time', intentionTr: 'Biraz zaman iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Könnten wir bitte noch ein paar Minuten haben?',
          translation: 'Birkaç dakika daha alabilir miyiz, lütfen?',
          altAccepted: ['Noch ein paar Minuten bitte', 'Können wir noch etwas Zeit haben'],
          next: 'back_later' },
        { id: 'recommend', intentionTr: 'Bir öneri iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Was würden Sie heute Abend empfehlen?',
          translation: 'Bu akşam ne önerirsiniz?',
          altAccepted: ['Was empfehlen Sie', 'Haben Sie eine Empfehlung'],
          next: 'recommendation' },
        { id: 'allergy', intentionTr: 'Bir yemekte fıstık olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Sind in der Pasta Nüsse? Ich bin allergisch.',
          translation: 'Makarnada fındık/fıstık var mı? Alerjim var.',
          altAccepted: ['Enthält die Pasta Nüsse', 'Hat die Pasta Nüsse ich bin allergisch'],
          next: 'allergy_answer' }
      ]
    },
    recommendation: {
      id: 'recommendation', speakerId: 'elena', emotion: 'happy',
      text: 'Unsere Meeresfrüchte-Pasta ist heute der Favorit, und das Lamm ist auch ausgezeichnet. Soll ich Ihnen eins davon bringen?',
      translation: 'Bu akşam deniz mahsullü makarnamız favori, kuzu da mükemmel. Bunlardan birini getireyim mi?',
      choices: [
        { id: 'take_pasta', intentionTr: 'Makarnayı seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Die Meeresfrüchte-Pasta klingt super. Die nehme ich.',
          translation: 'Deniz mahsullü makarna kulağa harika geliyor. Onu alacağım.',
          altAccepted: ['Ich nehme die Meeresfrüchte-Pasta', 'Die Pasta klingt gut die nehme ich'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'take_lamb', intentionTr: 'Kuzuyu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ich probiere das Lamm, bitte.',
          translation: 'Kuzuyu deneyeceğim, lütfen.',
          altAccepted: ['Ich nehme das Lamm', 'Das Lamm bitte'],
          next: 'sides' }
      ]
    },
    allergy_answer: {
      id: 'allergy_answer', speakerId: 'elena', emotion: 'concerned',
      text: 'Danke, dass Sie es sagen. Die Pasta ist nussfrei, aber ich frage sicherheitshalber noch einmal in der Küche nach. Möchten Sie sie?',
      translation: 'Söylediğiniz için teşekkürler. Makarnada fındık/fıstık yok ama emin olmak için mutfağa tekrar sorayım. İster misiniz?',
      choices: [
        { id: 'yes_pasta', intentionTr: 'Evet, makarnayı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, gerne, wenn die Küche bestätigt, dass es sicher ist.',
          translation: 'Evet, lütfen, mutfak güvenli olduğunu onaylarsa.',
          altAccepted: ['Ja wenn es sicher ist', 'Gerne wenn die Küche es bestätigt'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'something_else', intentionTr: 'Güvenli başka bir şey iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Um sicherzugehen — könnte ich stattdessen das gegrillte Hähnchen haben?',
          translation: 'Güvenli olmak için, onun yerine ızgara tavuk alabilir miyim?',
          altAccepted: ['Ich nehme lieber das gegrillte Hähnchen', 'Kann ich stattdessen das Hähnchen haben'],
          next: 'sides' }
      ]
    },
    sides: {
      id: 'sides', speakerId: 'elena', emotion: 'friendly',
      text: 'Gute Wahl. Möchten Sie etwas dazu trinken?',
      translation: 'Harika seçim. Yanında içecek bir şey ister misiniz?',
      choices: [
        { id: 'water', intentionTr: 'Su iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Nur eine Flasche stilles Wasser, danke.',
          translation: 'Sadece bir şişe sade su, teşekkürler.',
          altAccepted: ['Eine Flasche Wasser bitte', 'Nur stilles Wasser danke'],
          next: 'end_ordered' },
        { id: 'wine', intentionTr: 'Şarap önerisi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Könnten Sie ein Glas Wein dazu empfehlen?',
          translation: 'Yanına uygun bir kadeh şarap önerebilir misiniz?',
          altAccepted: ['Welcher Wein passt dazu', 'Können Sie einen Wein empfehlen'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    },
    back_later: {
      id: 'back_later', speakerId: 'elena', emotion: 'friendly',
      text: 'Natürlich, lassen Sie sich Zeit. Ich bin gleich zurück. (Eine Minute später) Sind Sie jetzt so weit?',
      translation: 'Tabii, acele etmeyin. Hemen dönerim. (Bir dakika sonra) Şimdi hazır mısınız?',
      next: 'recommendation'
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Bestellung aufgegeben', titleTr: 'Sipariş verildi',
      text: 'Du hast dein Essen und dein Getränk klar und höflich bestellt. Guten Appetit!',
      translation: 'Yemeğini ve içeceğini net ve kibar biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Wrong order / complaint (B1) ────────────────────────────────────────────
export const wrongOrder = createScenario({
  id: 'wrong-order',
  title: 'Das habe ich nicht bestellt',
  titleTr: 'Bu sipariş ettiğim şey değil',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'B1',
  goal: 'Kläre eine falsche Bestellung höflich und ohne Aufregung.',
  goalTr: 'Yanlış siparişi kibarca, sorun çıkarmadan düzelt.',
  npcIds: ['elena', 'marco'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'happy',
      text: 'Bitte sehr — einmal Rindfleisch-Burger. Guten Appetit!',
      translation: 'Buyurun — bir dana burger. Afiyet olsun!',
      choices: [
        { id: 'polite_correct', intentionTr: 'Kibarca yanlış olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Entschuldigung, aber ich glaube, da ist ein Fehler — ich hatte den Veggie-Burger bestellt.',
          translation: 'Pardon ama sanırım bir hata var — sebzeli burger sipariş etmiştim.',
          altAccepted: ['Ich hatte den Veggie-Burger bestellt nicht das', 'Ich glaube das ist falsch ich wollte den Veggie-Burger'],
          next: 'apology' },
        { id: 'direct_correct', intentionTr: 'Doğrudan yanlış olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Das habe ich nicht bestellt. Ich hatte den Veggie-Burger bestellt.',
          translation: 'Bu sipariş ettiğim şey değil. Sebzeli burger istemiştim.',
          altAccepted: ['Das ist die falsche Bestellung ich wollte den Veggie-Burger', 'Das habe ich nicht bestellt ich wollte den Veggie-Burger'],
          next: 'apology' }
      ]
    },
    apology: {
      id: 'apology', speakerId: 'elena', emotion: 'apologetic',
      text: 'Oh nein, das tut mir sehr leid! Mein Fehler. Ich bringe sofort den Veggie-Burger. Kann ich Ihnen in der Zwischenzeit etwas bringen?',
      translation: 'Ah hayır, çok özür dilerim! Benim hatam. Sebzeli burgeri hemen getireceğim. Beklerken size bir şey getirebilir miyim?',
      choices: [
        { id: 'no_worries', intentionTr: 'Sorun olmadığını söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Kein Problem, so was passiert. Nur etwas Wasser, danke.',
          translation: 'Sorun değil, olur böyle şeyler. Sadece biraz su, teşekkürler.',
          altAccepted: ['Ist okay nur etwas Wasser danke', 'Kein Problem Wasser wäre schön'],
          next: 'end_gracious', relationshipEffect: 2 },
        { id: 'ask_speed', intentionTr: 'Acele olduğunu söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Schon gut, aber könnte es schnell gehen? Ich bin etwas in Eile.',
          translation: 'Sorun değil ama çabuk olabilir mi? Biraz acelem var.',
          altAccepted: ['Könnten Sie sich etwas beeilen ich bin in Eile', 'Geht es schnell ich bin in Eile'],
          next: 'manager' }
      ]
    },
    manager: {
      id: 'manager', speakerId: 'marco', emotion: 'apologetic',
      text: 'Ich bin der Geschäftsführer — ich habe von der Verwechslung gehört. Ihre richtige Bestellung kommt sofort und geht aufs Haus. Nochmals Entschuldigung.',
      translation: 'Ben müdürüm — bir karışıklık olduğunu duydum. Doğru siparişiniz hızlandırılıyor ve ikramımız. Tekrar özür dilerim.',
      choices: [
        { id: 'thank_manager', intentionTr: 'Teşekkür et ve nazik ol', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Das ist sehr freundlich von Ihnen. Danke, dass Sie es so schnell geklärt haben.',
          translation: 'Çok naziksiniz. Bu kadar hızlı çözdüğünüz için teşekkürler.',
          altAccepted: ['Danke dass Sie es so schnell geklärt haben', 'Sehr freundlich danke fürs schnelle Lösen'],
          next: 'end_comped', relationshipEffect: 2 },
        { id: 'decline_free', intentionTr: 'Ücretsiz olmasına gerek yok de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Danke, aber das müssen Sie wirklich nicht. Ich zahle gern.',
          translation: 'Teşekkürler ama gerçekten gerek yok. Ödemekten memnuniyet duyarım.',
          altAccepted: ['Das müssen Sie nicht ich zahle gern', 'Das ist nicht nötig ich bezahle es'],
          next: 'end_generous', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_gracious: { id: 'end_gracious', kind: 'relationship', title: 'Mit Anstand gelöst', titleTr: 'Nazikçe halledildi',
      text: 'Du hast die Bestellung freundlich korrigiert und Elena beruhigt. Ein kleiner Moment — gemeistert wie ein Muttersprachler.',
      translation: 'Siparişi nazikçe düzelttin ve Elena’yı rahatlattın. Küçük bir an, ana dili gibi halledildi.',
      relationshipEffect: 1, coins: 12 },
    end_comped: { id: 'end_comped', kind: 'problem-solved', title: 'Gratis-Essen, kein Drama', titleTr: 'Ücretsiz yemek, sorunsuz',
      text: 'Du hast klar gesagt, dass du in Eile bist, bist höflich geblieben, und der Chef hat dein Essen übernommen. Gut verhandelt.',
      translation: 'Acelen olduğunu net söyledin, kibar kaldın ve müdür yemeğini ikram etti. İyi bir pazarlık.',
      relationshipEffect: 1, coins: 16 },
    end_generous: { id: 'end_generous', kind: 'relationship', title: 'Ein großzügiger Gast', titleTr: 'Cömert bir misafir',
      text: 'Du hast das Gratis-Essen freundlich abgelehnt. Der Chef bestand trotzdem darauf — und das ganze Restaurant mag dich jetzt.',
      translation: 'Ücretsiz yemeği nezaketle geri çevirdin. Müdür yine de ısrar etti — ve tüm restoranı kendine dost ettin.',
      relationshipEffect: 2, coins: 14 }
  }
});
