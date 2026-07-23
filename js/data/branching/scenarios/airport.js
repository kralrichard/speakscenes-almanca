import { createScenario } from '../scenarioSchema.js?v=6';

// ── Airport check-in (A2) ───────────────────────────────────────────────────
export const airportCheckin = createScenario({
  id: 'airport-checkin',
  title: 'Check-in für deinen Flug',
  titleTr: 'Uçuşun için check-in yapmak',
  environmentId: 'airport', sceneType: 'airport', level: 'A2',
  goal: 'Checke ein, kläre dein Gepäck und hol dir deine Bordkarte.',
  goalTr: 'Check-in yap, bavulunu hallet ve biniş kartını al.',
  npcIds: ['priya'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'priya', emotion: 'friendly',
      text: 'Guten Morgen! Darf ich bitte Ihren Pass und Ihre Buchung sehen?',
      translation: 'Günaydın! Pasaportunuzu ve rezervasyonunuzu görebilir miyim, lütfen?',
      choices: [
        { id: 'give_docs', intentionTr: 'Belgeleri ver', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Bitte sehr — mein Pass und meine Buchung auf dem Handy.',
          translation: 'Buyurun — pasaportum ve telefondaki rezervasyonum.',
          altAccepted: ['Hier sind mein Pass und meine Buchung', 'Bitte Pass und Buchung'],
          next: 'bags', relationshipEffect: 1 },
        { id: 'no_print', intentionTr: 'Dijital biletin geçerli olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe nur eine digitale Buchung. Ist das in Ordnung?',
          translation: 'Sadece dijital rezervasyonum var. Uygun mu?',
          altAccepted: ['Ist eine digitale Buchung okay', 'Ich habe sie nur auf dem Handy geht das'],
          next: 'digital_ok' }
      ]
    },
    digital_ok: {
      id: 'digital_ok', speakerId: 'priya', emotion: 'friendly',
      text: 'Eine digitale Buchung ist völlig in Ordnung. Danke — geben Sie heute Gepäck auf?',
      translation: 'Dijital rezervasyon gayet uygun. Teşekkürler — peki bugün bavul verecek misiniz?',
      next: 'bags'
    },
    bags: {
      id: 'bags', speakerId: 'priya', emotion: 'neutral',
      text: 'Geben Sie Gepäck auf, oder haben Sie heute nur das eine Handgepäck?',
      translation: 'Bavul verecek misiniz, yoksa bugün sadece bir el bagajı mı var?',
      choices: [
        { id: 'one_bag', intentionTr: 'Bir bavul vereceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ich habe einen Koffer zum Aufgeben, bitte.',
          translation: 'Check-in için bir valizim var, lütfen.',
          altAccepted: ['Ich habe eine Tasche zum Aufgeben', 'Nur einen Koffer zum Aufgeben'],
          next: 'overweight' },
        { id: 'carry_only', intentionTr: 'Sadece el bagajı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Nein, nur dieses Handgepäck.',
          translation: 'Hayır, sadece bu el bagajı var.',
          altAccepted: ['Nur Handgepäck', 'Nein nur diese Handtasche'],
          next: 'seat' },
        { id: 'ask_gate', intentionTr: 'Kapının nerede olduğunu sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Nur Handgepäck. Übrigens — können Sie mir sagen, welches Gate ich brauche?',
          translation: 'Sadece el bagajı. Bu arada hangi kapıya gitmem gerektiğini söyler misiniz?',
          altAccepted: ['Welches Gate brauche ich', 'Können Sie mir mein Gate sagen'],
          next: 'gate_info' }
      ]
    },
    overweight: {
      id: 'overweight', speakerId: 'priya', emotion: 'concerned',
      text: 'Wiegen wir ihn… ah, er ist zwei Kilo über dem Limit. Es gibt eine kleine Übergepäckgebühr, oder Sie packen ein paar Sachen ins Handgepäck um.',
      translation: 'Tartalım… ah, limitin iki kilo üzerinde. Küçük bir fazlalık ücreti var ya da birkaç eşyayı el bagajına alabilirsiniz.',
      choices: [
        { id: 'pay_fee', intentionTr: 'Ücreti ödemeyi kabul et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Das ist in Ordnung, ich zahle die Übergepäckgebühr.',
          translation: 'Sorun değil, fazlalık ücretini öderim.',
          altAccepted: ['Ich zahle die Gebühr', 'Schon gut ich zahle den Aufpreis'],
          next: 'seat' },
        { id: 'move_items', intentionTr: 'Eşyaları taşımayı tercih et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Ich packe lieber ein paar Sachen ins Handgepäck um.',
          translation: 'Bunun yerine birkaç şeyi el bagajıma alayım.',
          altAccepted: ['Ich packe ein paar Sachen um', 'Lieber ein paar Sachen ins Handgepäck'],
          next: 'seat', relationshipEffect: 1 }
      ]
    },
    seat: {
      id: 'seat', speakerId: 'priya', emotion: 'friendly',
      text: 'Alles erledigt. Möchten Sie einen Fensterplatz oder einen Gangplatz?',
      translation: 'Her şey hazır. Cam kenarı mı yoksa koridor tarafı mı istersiniz?',
      choices: [
        { id: 'window', intentionTr: 'Cam kenarı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Einen Fensterplatz, bitte. Ich liebe die Aussicht.',
          translation: 'Cam kenarı, lütfen. Manzarayı severim.',
          altAccepted: ['Fensterplatz bitte', 'Ich hätte gern einen Fensterplatz'],
          next: 'done' },
        { id: 'aisle', intentionTr: 'Koridor tarafı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ein Gangplatz wäre besser, danke.',
          translation: 'Koridor tarafı daha iyi olur, teşekkürler.',
          altAccepted: ['Gangplatz bitte', 'Ich hätte lieber einen Gangplatz'],
          next: 'done' }
      ]
    },
    gate_info: {
      id: 'gate_info', speakerId: 'priya', emotion: 'helpful',
      text: 'Natürlich — Sie steigen an Gate B12 ein. Es sind zehn Minuten zu Fuß, planen Sie etwas Zeit ein. Also, Fenster oder Gang?',
      translation: 'Tabii — B12 kapısından bineceksiniz. On dakikalık yürüyüş, biraz zaman bırakın. Şimdi, cam kenarı mı koridor mu?',
      next: 'seat'
    },
    done: {
      id: 'done', speakerId: 'priya', emotion: 'happy',
      text: 'Hier ist Ihre Bordkarte. Gate B12, Boarding um 10:40 Uhr. Einen wunderbaren Flug!',
      translation: 'Biniş kartınız burada. B12 kapısı, 10:40’ta biniş. İyi uçuşlar!',
      next: 'end_success'
    }
  },
  endings: {
    end_success: { id: 'end_success', kind: 'success', title: 'Eingecheckt und startklar', titleTr: 'Check-in tamam, hazırsın',
      text: 'Pass, Gepäck und Sitzplatz — alles klar geregelt. Bordkarte in der Hand.',
      translation: 'Pasaport, bavul ve koltuk — hepsi net biçimde halledildi. Biniş kartı elinde.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Missing your flight (B1) ────────────────────────────────────────────────
export const missingFlight = createScenario({
  id: 'missing-flight',
  title: 'Du verpasst gleich deinen Flug',
  titleTr: 'Uçuşunu kaçırmak üzeresin',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Erkläre die Lage ruhig und finde die beste Option.',
  goalTr: 'Durumu sakince anlat ve en iyi seçeneği bul.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'concerned',
      text: 'Es tut mir leid, das Gate für Flug 208 ist gerade geschlossen worden. Was kann ich für Sie tun?',
      translation: 'Üzgünüm, 208 sefer sayılı uçuşun kapısı az önce kapandı. Sizin için ne yapabilirim?',
      choices: [
        { id: 'explain', intentionTr: 'Sakince ne olduğunu anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Mein Anschlussflug hatte Verspätung, deshalb konnte ich nicht rechtzeitig hier sein.',
          translation: 'Aktarma uçuşum rötar yaptı, bu yüzden zamanında gelemedim.',
          altAccepted: ['Mein Anschluss hatte Verspätung', 'Ich war spät weil mein anderer Flug Verspätung hatte'],
          next: 'next_flight' },
        { id: 'panic', intentionTr: 'Panikle bir sonraki uçağa binmek istediğini söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Bitte, ich muss wirklich in den nächsten Flug nach Rom.',
          translation: 'Lütfen, Roma’ya bir sonraki uçağa gerçekten binmem gerekiyor.',
          altAccepted: ['Ich brauche den nächsten Flug nach Rom', 'Können Sie mich in den nächsten Flug nach Rom setzen'],
          next: 'next_flight' }
      ]
    },
    next_flight: {
      id: 'next_flight', speakerId: 'omar', emotion: 'thinking',
      text: 'Moment… Es gibt einen Flug in drei Stunden, aber der ist fast voll. Oder einen Abendflug mit freien Plätzen. Was ist Ihnen lieber?',
      translation: 'Bakayım… Üç saat sonra başka bir uçuş var ama neredeyse dolu. Ya da boş koltukları olan bir akşam uçuşu. Hangisini tercih edersiniz?',
      choices: [
        { id: 'sooner', intentionTr: 'Erken uçuşu iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Mir wäre der frühere lieber, auch wenn ich am Gate warten muss.',
          translation: 'Kapıda beklemek zorunda kalsam bile erken olanı tercih ederim.',
          altAccepted: ['Ich hätte lieber den früheren Flug', 'Den früheren Flug bitte'],
          next: 'fee_question' },
        { id: 'evening', intentionTr: 'Rahat olan akşam uçuşunu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Der Abendflug ist okay. Ein garantierter Platz ist mir lieber.',
          translation: 'Akşam uçuşu uygun. Garantili bir koltuğu tercih ederim.',
          altAccepted: ['Ich nehme den Abendflug', 'Der Abendflug ist gut'],
          next: 'rebooked_free' }
      ]
    },
    fee_question: {
      id: 'fee_question', speakerId: 'omar', emotion: 'neutral',
      text: 'Da die Verspätung die Schuld der Airline war, kostet die Umbuchung nichts. Aber in dem Flug ist nur noch ein Mittelplatz frei. Wollen Sie ihn trotzdem?',
      translation: 'Rötar havayolunun hatası olduğundan yeniden rezervasyon ücreti yok. Ama o uçuşta sadece orta koltuk kaldı. Yine de ister misiniz?',
      choices: [
        { id: 'take_middle', intentionTr: 'Orta koltuğu kabul et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ein Mittelplatz ist okay — ich will einfach nur ankommen.',
          translation: 'Orta koltuk uygun — sadece oraya varmak istiyorum.',
          altAccepted: ['Mittelplatz ist okay', 'Ich nehme den Mittelplatz'],
          next: 'rebooked_sooner' },
        { id: 'ask_lounge', intentionTr: 'Bekleme için bir şey iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Ich nehme ihn. Angesichts der Verspätung — könnte ich für die Wartezeit einen Lounge-Pass bekommen?',
          translation: 'Alıyorum. Rötar göz önüne alınırsa, beklerken bir lounge kartı alabilir miyim?',
          altAccepted: ['Könnte ich einen Lounge-Pass bekommen', 'Bekomme ich Lounge-Zugang für die Wartezeit'],
          next: 'lounge_granted' }
      ]
    },
    rebooked_sooner: {
      id: 'rebooked_sooner', speakerId: 'omar', emotion: 'friendly',
      text: 'Erledigt — Sie sind für den Drei-Uhr-Flug bestätigt, Gate C4. Nochmals Entschuldigung für die Verspätung.',
      translation: 'Tamam — saat üç uçuşuna onaylandınız, kapı C4. Rötar için tekrar özür dilerim.',
      next: 'end_rebooked'
    },
    lounge_granted: {
      id: 'lounge_granted', speakerId: 'omar', emotion: 'happy',
      text: 'Das ist fair. Hier sind ein Lounge-Pass und Ihre neue Bordkarte. Entspannen Sie sich bis drei — das haben Sie sich verdient.',
      translation: 'Bu adil. İşte bir lounge kartı ve yeni biniş kartınız. Saat üçe kadar dinlenin — hak ettiniz.',
      next: 'end_excellent'
    },
    rebooked_free: {
      id: 'rebooked_free', speakerId: 'omar', emotion: 'friendly',
      text: 'Sie sind auf dem Abendflug, Fensterplatz, kostenlos. Eine ruhige Entscheidung — danke für Ihre Geduld.',
      translation: 'Akşam uçuşundasınız, cam kenarı, ücretsiz. Sakin bir tercih — sabrınız için teşekkürler.',
      next: 'end_calm'
    }
  },
  endings: {
    end_rebooked: { id: 'end_rebooked', kind: 'problem-solved', title: 'Wieder auf einem Flug', titleTr: 'Yeniden uçuşta',
      text: 'Du hast die Verspätung ruhig erklärt und bist auf dem allernächsten Flug. Krise gemeistert.',
      translation: 'Rötarı sakince anlattın ve hemen bir sonraki uçağa bindin. Kriz yönetildi.',
      relationshipEffect: 1, coins: 12 },
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Umgebucht mit Extra', titleTr: 'Ekstra ile yeniden rezervasyon',
      text: 'Du bist höflich geblieben, kanntest deine Rechte und hast sogar Lounge-Zugang bekommen. Exzellentes Problemlösen auf Deutsch.',
      translation: 'Kibar kaldın, haklarını bildin ve hatta lounge erişimi aldın. Almancada mükemmel sorun çözme.',
      relationshipEffect: 2, coins: 18 },
    end_calm: { id: 'end_calm', kind: 'success', title: 'Eine entspannte Umbuchung', titleTr: 'Rahat bir yeniden rezervasyon',
      text: 'Du hast Sicherheit statt Tempo gewählt und einen garantierten Fensterplatz bekommen. Vernünftig und stressfrei.',
      translation: 'Hızdan çok kesinliği seçtin ve garantili bir cam kenarı koltuk aldın. Mantıklı ve stressiz.',
      coins: 10 }
  }
});
