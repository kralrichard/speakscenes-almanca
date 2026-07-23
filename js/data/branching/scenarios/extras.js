import { createScenario } from '../scenarioSchema.js?v=6';

// Extra scenarios that add depth to existing environments (hotel, airport,
// restaurant) so each place has more than one thing to do.

// ── Hotel: asking for amenities (A1) ────────────────────────────────────────
export const hotelAmenities = createScenario({
  id: 'hotel-amenities',
  title: 'WLAN, Handtücher und Frühstück',
  titleTr: 'Wi-Fi, havlu ve kahvaltı',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A1',
  goal: 'Bitte die Rezeption um die kleinen Dinge, die du brauchst.',
  goalTr: 'Resepsiyondan ihtiyacın olan küçük şeyleri iste.',
  npcIds: ['grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Hallo nochmal! Ist mit Ihrem Zimmer alles in Ordnung?',
      translation: 'Tekrar merhaba! Odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'wifi', intentionTr: 'Wi-Fi şifresini sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, danke. Könnte ich das WLAN-Passwort haben?',
          translation: 'Evet, teşekkürler. Wi-Fi şifresini alabilir miyim?',
          altAccepted: ['Wie ist das WLAN-Passwort', 'Kann ich das WLAN-Passwort bekommen'],
          next: 'anything_else' },
        { id: 'towels', intentionTr: 'Fazladan havlu iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Könnte ich bitte ein paar extra Handtücher bekommen?',
          translation: 'Biraz fazladan havlu alabilir miyim, lütfen?',
          altAccepted: ['Kann ich extra Handtücher haben', 'Noch ein paar Handtücher bitte'],
          next: 'anything_else' },
        { id: 'breakfast_time', intentionTr: 'Kahvaltı saatini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Um wie viel Uhr gibt es morgens Frühstück?',
          translation: 'Sabah kahvaltı saat kaçta veriliyor?',
          altAccepted: ['Wann wird das Frühstück serviert', 'Um wie viel Uhr beginnt das Frühstück'],
          next: 'anything_else' }
      ]
    },
    anything_else: {
      id: 'anything_else', speakerId: 'grace', emotion: 'happy',
      text: 'Natürlich, das erledige ich sofort. Brauchen Sie sonst noch etwas?',
      translation: 'Tabii, hemen hallederim. Başka bir ihtiyacınız var mı?',
      choices: [
        { id: 'no_thanks', intentionTr: 'Hayır, teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Nein, das ist alles. Vielen Dank!',
          translation: 'Hayır, hepsi bu. Çok teşekkürler!',
          altAccepted: ['Das ist alles danke', 'Nein danke das war alles'],
          next: 'end_helped', relationshipEffect: 1 },
        { id: 'ask_taxi', intentionTr: 'Taksi çağırmalarını iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Eigentlich ja — könnten Sie mir für acht Uhr ein Taxi rufen?',
          translation: 'Aslında, saat sekiz için bana bir taksi çağırır mısınız?',
          altAccepted: ['Könnten Sie ein Taxi für acht Uhr rufen', 'Können Sie mir ein Taxi für acht bestellen'],
          next: 'end_helped', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'Alles geregelt', titleTr: 'Her şey ayarlandı',
      text: 'Du hast höflich und klar um das gebeten, was du brauchst. Die Rezeption hilft gern.',
      translation: 'İhtiyacını kibar ve net biçimde istedin. Resepsiyon yardımcı olmaktan memnun.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Airport: passport control (B1) ──────────────────────────────────────────
export const passportControl = createScenario({
  id: 'passport-control',
  title: 'Passkontrolle',
  titleTr: 'Pasaport kontrolü',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Beantworte die Fragen des Beamten klar und ruhig.',
  goalTr: 'Memurun sorularını net ve sakin yanıtla.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'formal',
      text: 'Den Pass, bitte. Was ist der Zweck Ihrer Reise?',
      translation: 'Pasaport, lütfen. Ziyaretinizin amacı nedir?',
      choices: [
        { id: 'tourism', intentionTr: 'Turizm için geldiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich bin für zwei Wochen im Urlaub hier.',
          translation: 'İki haftalığına tatil için buradayım.',
          altAccepted: ['Ich mache hier zwei Wochen Urlaub', 'Im Urlaub für zwei Wochen'],
          next: 'where_staying' },
        { id: 'business', intentionTr: 'İş için geldiğini söyle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Ich bin geschäftlich hier — eine dreitägige Konferenz.',
          translation: 'İş için buradayım — üç günlük bir konferans.',
          altAccepted: ['Ich bin für eine Geschäftskonferenz hier', 'Geschäftlich eine dreitägige Konferenz'],
          next: 'where_staying' }
      ]
    },
    where_staying: {
      id: 'where_staying', speakerId: 'omar', emotion: 'neutral',
      text: 'Und wo werden Sie wohnen?',
      translation: 'Peki nerede kalacaksınız?',
      choices: [
        { id: 'hotel', intentionTr: 'Otelde kalacağını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Im Hotel Sunrise, im Stadtzentrum.',
          translation: 'Şehir merkezindeki Sunrise Otel’de.',
          altAccepted: ['Im Hotel Sunrise in der Innenstadt', 'Im Sunrise Hotel Stadtzentrum'],
          next: 'end_through' },
        { id: 'friend', intentionTr: 'Bir arkadaşında kalacağını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich wohne bei einem Freund, der hier lebt.',
          translation: 'Burada yaşayan bir arkadaşımda kalacağım.',
          altAccepted: ['Bei einem Freund der hier wohnt', 'Ich bleibe bei einem Freund'],
          next: 'end_through' }
      ]
    }
  },
  endings: {
    end_through: { id: 'end_through', kind: 'success', title: 'Willkommen im Land', titleTr: 'Ülkeye hoş geldin',
      text: 'Du hast klar und ruhig geantwortet und bist durch. Die Passkontrolle ist leicht, wenn man es einfach hält.',
      translation: 'Net ve sakin yanıt verdin ve geçtin. Basit tutunca pasaport kontrolü kolaydır.',
      coins: 12 }
  }
});

// ── Restaurant: asking for the bill (A2) ────────────────────────────────────
export const restaurantBill = createScenario({
  id: 'restaurant-bill',
  title: 'Die Rechnung bekommen',
  titleTr: 'Hesabı istemek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Beende dein Essen und bezahle so, wie du möchtest.',
  goalTr: 'Yemeğini bitir ve istediğin şekilde öde.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'Wie war alles? Kann ich Ihnen noch etwas bringen?',
      translation: 'Her şey nasıldı? Başka bir şey getirebilir miyim?',
      choices: [
        { id: 'bill', intentionTr: 'Hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Es war köstlich, danke. Könnten wir bitte die Rechnung haben?',
          translation: 'Çok güzeldi, teşekkürler. Hesabı alabilir miyiz, lütfen?',
          altAccepted: ['Können wir die Rechnung haben bitte', 'Die Rechnung bitte'],
          next: 'pay_how' },
        { id: 'dessert', intentionTr: 'Tatlı menüsünü sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Alles war großartig! Könnte ich die Dessertkarte sehen?',
          translation: 'Her şey harikaydı! Tatlı menüsünü görebilir miyim?',
          altAccepted: ['Kann ich die Dessertkarte sehen', 'Haben Sie eine Dessertkarte'],
          next: 'dessert_node' }
      ]
    },
    dessert_node: {
      id: 'dessert_node', speakerId: 'elena', emotion: 'happy',
      text: 'Natürlich! Der Schokoladenkuchen ist fantastisch. Soll ich einen bringen?',
      translation: 'Tabii! Çikolatalı kek muhteşem. Bir tane getireyim mi?',
      choices: [
        { id: 'yes_cake', intentionTr: 'Keki iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Ja, der Schokoladenkuchen klingt perfekt!',
          translation: 'Evet, çikolatalı kek harika olur!',
          altAccepted: ['Ja bitte den Schokoladenkuchen', 'Ich nehme den Schokoladenkuchen'],
          next: 'pay_how', relationshipEffect: 1 },
        { id: 'just_bill', intentionTr: 'Yok, sadece hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Vielleicht nächstes Mal — nur die Rechnung, bitte.',
          translation: 'Belki bir dahaki sefere — sadece hesap, lütfen.',
          altAccepted: ['Nur die Rechnung bitte', 'Nein danke nur die Rechnung'],
          next: 'pay_how' }
      ]
    },
    pay_how: {
      id: 'pay_how', speakerId: 'elena', emotion: 'neutral',
      text: 'Bitte sehr. Zahlen Sie mit Karte oder bar?',
      translation: 'Buyurun. Kartla mı yoksa nakit mi ödeyeceksiniz?',
      choices: [
        { id: 'card', intentionTr: 'Kartla öde', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Mit Karte, bitte. Und könnte ich eine Quittung bekommen?',
          translation: 'Kartla, lütfen. Bir de fiş alabilir miyim?',
          altAccepted: ['Mit Karte und eine Quittung bitte', 'Karte bitte mit Quittung'],
          next: 'end_paid' },
        { id: 'cash_tip', intentionTr: 'Nakit öde ve bahşiş bırak', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Bar, bitte. Der Rest ist für Sie — der Service war großartig.',
          translation: 'Nakit, lütfen. Üstü kalsın — hizmet harikaydı.',
          altAccepted: ['Bar der Rest ist für Sie', 'Ich zahle bar stimmt so'],
          next: 'end_paid', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_paid: { id: 'end_paid', kind: 'success', title: 'Bezahlt und fertig', titleTr: 'Ödendi, bitti',
      text: 'Du hast dein Essen beendet und reibungslos bezahlt. Ein komplettes Restauranterlebnis auf Deutsch!',
      translation: 'Yemeğini bitirdin ve sorunsuz ödedin. Almanca ile eksiksiz bir restoran deneyimi!',
      relationshipEffect: 1, coins: 10 }
  }
});
