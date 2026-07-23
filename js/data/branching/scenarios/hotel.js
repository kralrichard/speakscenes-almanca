import { createScenario } from '../scenarioSchema.js?v=6';

// ── Hotel check-in (A2) — the flagship: 4 decision points, 4 endings ────────
export const hotelCheckin = createScenario({
  id: 'hotel-checkin',
  title: 'Check-in im Hotel Sunrise',
  titleTr: 'Sunrise Otel’e giriş yapmak',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A2',
  goal: 'Checke in dein Zimmer ein und kläre kleine Probleme.',
  goalTr: 'Odana giriş yap ve küçük sorunları çöz.',
  npcIds: ['grace', 'daniel'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Guten Abend und willkommen im Hotel Sunrise. Haben Sie eine Reservierung bei uns?',
      translation: 'İyi akşamlar, Sunrise Otel’e hoş geldiniz. Bizde bir rezervasyonunuz var mı?',
      choices: [
        { id: 'confirm', intentionTr: 'Rezervasyonun olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, ich habe eine Reservierung auf den Namen Alex.',
          translation: 'Evet, Alex adına bir rezervasyonum var.',
          altAccepted: ['Ich habe eine Reservierung auf Alex', 'Ja die Reservierung ist auf den Namen Alex'],
          next: 'find_reservation', relationshipEffect: 1 },
        { id: 'no_reservation', intentionTr: 'Rezervasyonun olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Nein, habe ich nicht. Haben Sie heute Nacht noch Zimmer frei?',
          translation: 'Hayır, yok. Bu gece boş odanız var mı?',
          altAccepted: ['Nein haben Sie noch Zimmer frei', 'Ich habe keine gibt es heute noch freie Zimmer'],
          next: 'walk_in' },
        { id: 'wrong_hotel', intentionTr: 'Yanlış otelde olabileceğini fark et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Ich glaube, ich bin vielleicht im falschen Hotel.',
          translation: 'Aslında sanırım yanlış oteldeyim.',
          altAccepted: ['Ich glaube ich bin im falschen Hotel', 'Entschuldigung ich glaube das ist das falsche Hotel'],
          next: 'wrong_hotel_node' }
      ]
    },
    find_reservation: {
      id: 'find_reservation', speakerId: 'grace', emotion: 'thinking',
      text: 'Einen Moment… Alex, ja! Zwei Nächte im Doppelzimmer. Wie möchten Sie bezahlen?',
      translation: 'Bakayım… Alex, evet! İki gece, çift kişilik oda. Nasıl ödemek istediğinizi söyler misiniz?',
      choices: [
        { id: 'pay_card', intentionTr: 'Kartla ödeyeceğini söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ich möchte gern mit Karte zahlen, bitte.',
          translation: 'Kartla ödemek istiyorum, lütfen.',
          altAccepted: ['Ich zahle mit Karte', 'Mit Karte bitte', 'Kann ich mit Karte zahlen'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_breakfast', intentionTr: 'Kahvaltının dahil olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Vorher noch — ist das Frühstück im Preis inbegriffen?',
          translation: 'Ondan önce, kahvaltı fiyata dahil mi?',
          altAccepted: ['Ist das Frühstück inbegriffen', 'Ist Frühstück im Preis enthalten'],
          next: 'breakfast_info' }
      ]
    },
    breakfast_info: {
      id: 'breakfast_info', speakerId: 'grace', emotion: 'happy',
      text: 'Ja, ein komplettes Frühstück ist inbegriffen, serviert von sieben bis zehn im großen Saal. Soll ich Sie jetzt einchecken?',
      translation: 'Evet, tam kahvaltı dahil, ana salonda yedi ile on arası servis ediliyor. Şimdi girişinizi yapayım mı?',
      choices: [
        { id: 'yes_checkin', intentionTr: 'Evet, girişi yap', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, bitte. Ich zahle mit Karte.',
          translation: 'Evet, lütfen. Kartla ödeyeceğim.',
          altAccepted: ['Ja bitte ich zahle mit Karte', 'Gerne mit Karte bitte'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_late', intentionTr: 'Geç çıkış isteyip istemediğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Noch eine Sache — wäre ein später Check-out möglich?',
          translation: 'Bir şey daha — geç çıkış mümkün olur mu?',
          altAccepted: ['Ist ein später Check-out möglich', 'Könnte ich später auschecken'],
          next: 'late_checkout' }
      ]
    },
    late_checkout: {
      id: 'late_checkout', speakerId: 'grace', emotion: 'friendly',
      text: 'Natürlich. Ich kann Ihnen Check-out bis ein Uhr ohne Aufpreis anbieten. Sie sind in Zimmer 214 — hier ist Ihr Schlüssel.',
      translation: 'Tabii ki. Ekstra ücret olmadan saat bire kadar çıkış verebilirim. Oda 214’tesiniz — anahtarınız.',
      next: 'end_excellent'
    },
    room_ready: {
      id: 'room_ready', speakerId: 'grace', emotion: 'happy',
      text: 'Wunderbar. Alles erledigt — Zimmer 214 im zweiten Stock. Hier ist Ihre Schlüsselkarte. Schönen Aufenthalt!',
      translation: 'Harika. Her şey hazır — ikinci katta oda 214. Anahtar kartınız burada. İyi konaklamalar!',
      next: 'end_success'
    },
    walk_in: {
      id: 'walk_in', speakerId: 'grace', emotion: 'thinking',
      text: 'Mal sehen… wir haben noch ein Standardzimmer für neunzig Euro pro Nacht. Möchten Sie es?',
      translation: 'Bir bakayım… gecesi doksan euro olan tek bir standart odamız kaldı. İster misiniz?',
      choices: [
        { id: 'take_room', intentionTr: 'Odayı kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Das klingt gut. Ich nehme es für eine Nacht.',
          translation: 'Kulağa güzel geliyor. Bir geceliğine alıyorum.',
          altAccepted: ['Ich nehme es für eine Nacht', 'Ja ich nehme das Zimmer für heute Nacht'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'too_expensive', intentionTr: 'Çok pahalı olduğunu kibarca söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Das ist etwas mehr, als ich ausgeben wollte. Gibt es etwas Günstigeres?',
          translation: 'Umduğumdan biraz fazla. Daha ucuz bir şey var mı?',
          altAccepted: ['Haben Sie etwas Günstigeres', 'Gibt es ein günstigeres Zimmer'],
          next: 'cheaper' }
      ]
    },
    cheaper: {
      id: 'cheaper', speakerId: 'daniel', emotion: 'friendly',
      text: 'Hallo, ich bin der diensthabende Manager. Den Zimmerpreis kann ich nicht senken, aber ich kann ein kostenloses Frühstück dazugeben. Einverstanden?',
      translation: 'Merhaba, ben nöbetçi müdürüm. Oda fiyatını düşüremem ama ücretsiz kahvaltı ekleyebilirim. Olur mu?',
      choices: [
        { id: 'accept_deal', intentionTr: 'Teklifi kabul et', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Das ist sehr nett — ja, ich nehme das Zimmer mit Frühstück.',
          translation: 'Çok naziksiniz — evet, odayı kahvaltıyla alıyorum.',
          altAccepted: ['Ja ich nehme es mit Frühstück', 'Das passt ich nehme das Zimmer'],
          next: 'room_ready', relationshipEffect: 2 },
        { id: 'decline', intentionTr: 'Kibarca reddet ve ayrıl', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Danke, aber ich glaube, ich schaue mich heute Nacht woanders um.',
          translation: 'Teşekkürler ama sanırım bu gece başka bir yere bakacağım.',
          altAccepted: ['Danke aber ich schaue woanders', 'Danke ich versuche es woanders'],
          next: 'end_neutral' }
      ]
    },
    wrong_hotel_node: {
      id: 'wrong_hotel_node', speakerId: 'grace', emotion: 'surprised',
      text: 'Oh! Welches Hotel suchen Sie denn? Vielleicht kann ich Ihnen den Weg zeigen.',
      translation: 'Aa! Hangi oteli arıyorsunuz? Belki sizi doğru yöne yönlendirebilirim.',
      choices: [
        { id: 'ask_directions', intentionTr: 'Yol tarifi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich suche das Hotel Moonlight. Können Sie mir sagen, wie ich dorthin komme?',
          translation: 'Moonlight Otel’i arıyorum. Oraya nasıl gideceğimi söyler misiniz?',
          altAccepted: ['Wie komme ich zum Hotel Moonlight', 'Können Sie mir den Weg zum Hotel Moonlight sagen'],
          next: 'directions_given', relationshipEffect: 1 },
        { id: 'stay_anyway', intentionTr: 'Aslında burada kalmaya karar ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Wissen Sie was, Ihr Hotel sieht wirklich schön aus. Haben Sie heute Nacht ein Zimmer?',
          translation: 'Aslına bakarsanız oteliniz çok hoş görünüyor. Bu gece odanız var mı?',
          altAccepted: ['Haben Sie heute Nacht ein Zimmer', 'Ihr Hotel sieht schön aus ist ein Zimmer frei'],
          next: 'walk_in' }
      ]
    },
    directions_given: {
      id: 'directions_given', speakerId: 'grace', emotion: 'friendly',
      text: 'Es ist nur zwei Straßen weiter, auf der linken Seite, neben der Apotheke. Sie können es nicht verfehlen!',
      translation: 'Sadece iki sokak aşağıda, solunuzda, eczanenin yanında. Kaçırmanız imkânsız!',
      next: 'end_helpful'
    }
  },
  endings: {
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Perfekter Check-in', titleTr: 'Kusursuz giriş',
      text: 'Zimmer, Frühstück und später Check-out — du hast jeden Schritt höflich und klar gemeistert. Grace freut sich sehr über dich.',
      translation: 'Oda, kahvaltı ve geç çıkış — her adımı kibar ve net biçimde hallettin. Grace seni ağırlamaktan çok memnun.',
      relationshipEffect: 2, coins: 15 },
    end_success: { id: 'end_success', kind: 'success', title: 'Eingecheckt', titleTr: 'Giriş yapıldı',
      text: 'Du bist eingecheckt und auf dem Weg zu Zimmer 214. Reibungslos und freundlich.',
      translation: 'Girişini yaptın ve 214 numaralı odaya doğru yola çıktın. Sorunsuz ve dostça.',
      relationshipEffect: 1, coins: 10 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'Weiter zum nächsten Hotel', titleTr: 'Başka yere bakmaya',
      text: 'Du hast das Angebot höflich abgelehnt. Kein Zimmer heute Nacht, aber du hast einen guten Eindruck hinterlassen — du kannst jederzeit wiederkommen.',
      translation: 'Teklifi kibarca geri çevirdin. Bu gece oda yok ama iyi bir izlenim bıraktın — her zaman geri dönebilirsin.',
      coins: 5 },
    end_helpful: { id: 'end_helpful', kind: 'problem-solved', title: 'Wieder auf Kurs', titleTr: 'Yeniden yolda',
      text: 'Du hast gemerkt, dass du im falschen Hotel warst, und eine klare Wegbeschreibung zum richtigen bekommen. Problem gelöst!',
      translation: 'Yanlış otelde olduğunu fark ettin ve doğru otele net bir yol tarifi aldın. Sorun çözüldü!',
      coins: 8 }
  }
});

// ── Hotel room problem (B1) — 3 decision points, 3 endings ──────────────────
export const hotelRoomProblem = createScenario({
  id: 'hotel-room-problem',
  title: 'Ein Problem mit deinem Zimmer',
  titleTr: 'Odanla ilgili bir sorun',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'B1',
  goal: 'Melde ein Problem mit deinem Zimmer und lass es lösen.',
  goalTr: 'Odandaki sorunu bildir ve çözdür.',
  npcIds: ['daniel', 'grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'daniel', emotion: 'friendly',
      text: 'Guten Abend. Sie wirken etwas verärgert — ist mit Ihrem Zimmer alles in Ordnung?',
      translation: 'İyi akşamlar. Biraz sinirli görünüyorsunuz — odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'dirty', intentionTr: 'Odanın temiz olmadığını söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Ehrlich gesagt, nein. Mein Zimmer wurde nicht richtig geputzt.',
          translation: 'Aslında hayır. Odam düzgün temizlenmemiş.',
          altAccepted: ['Mein Zimmer ist nicht sauber', 'Das Zimmer wurde nicht richtig gereinigt'],
          next: 'apologize_clean' },
        { id: 'noise', intentionTr: 'Çok gürültülü olduğundan şikâyet et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Das Zimmer neben mir ist sehr laut, und ich kann nicht schlafen.',
          translation: 'Yan odam çok gürültülü ve uyuyamıyorum.',
          altAccepted: ['Das Nachbarzimmer ist zu laut', 'Nebenan ist es sehr laut und ich kann nicht schlafen'],
          next: 'apologize_noise' },
        { id: 'ac', intentionTr: 'Klimanın çalışmadığını söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Die Klimaanlage in meinem Zimmer funktioniert überhaupt nicht.',
          translation: 'Odamdaki klima hiç çalışmıyor.',
          altAccepted: ['Die Klimaanlage funktioniert nicht', 'Meine Klimaanlage geht nicht'],
          next: 'apologize_ac' }
      ]
    },
    apologize_clean: {
      id: 'apologize_clean', speakerId: 'daniel', emotion: 'apologetic',
      text: 'Das tut mir sehr leid. Soll ich sofort den Reinigungsdienst schicken, oder möchten Sie lieber in ein frisches Zimmer umziehen?',
      translation: 'Bunun için çok üzgünüm. Hemen kat görevlisi mi göndereyim, yoksa sizi temiz bir odaya mı taşıyayım?',
      choices: [
        { id: 'move', intentionTr: 'Başka odaya taşınmayı iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich würde lieber in ein anderes Zimmer umziehen, wenn das möglich ist.',
          translation: 'Mümkünse başka bir odaya taşınmayı tercih ederim.',
          altAccepted: ['Können Sie mich in ein anderes Zimmer verlegen', 'Ich hätte lieber ein anderes Zimmer'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'clean_now', intentionTr: 'Hemen temizlenmesini iste', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Schicken Sie bitte einfach jetzt jemanden zum Putzen.',
          translation: 'Lütfen sadece hemen temizlemesi için birini gönderin.',
          altAccepted: ['Schicken Sie jetzt jemanden zum Putzen', 'Bitte lassen Sie es sofort reinigen'],
          next: 'resolved_clean' }
      ]
    },
    apologize_noise: {
      id: 'apologize_noise', speakerId: 'daniel', emotion: 'apologetic',
      text: 'Das geht um diese Uhrzeit gar nicht. Ich kann Sie in ein ruhiges Zimmer nach hinten verlegen — würde das helfen?',
      translation: 'Bu saatte kabul edilemez. Sizi arkadaki sessiz bir odaya taşıyabilirim — bu yardımcı olur mu?',
      choices: [
        { id: 'yes_move', intentionTr: 'Evet, taşınmayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, ein ruhiges Zimmer wäre perfekt. Danke.',
          translation: 'Evet, sessiz bir oda harika olur. Teşekkürler.',
          altAccepted: ['Ja bitte ein ruhiges Zimmer wäre toll', 'Das wäre perfekt danke'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'compensation', intentionTr: 'Bir tür telafi iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Das weiß ich zu schätzen, aber ich würde für die Umstände auch eine Entschädigung erwarten.',
          translation: 'Bunu takdir ediyorum ama bu zahmet için bir telafi de beklerdim.',
          altAccepted: ['Ich würde auch eine Entschädigung erwarten', 'Ich finde eine Entschädigung wäre fair'],
          next: 'offer_compensation' }
      ]
    },
    apologize_ac: {
      id: 'apologize_ac', speakerId: 'daniel', emotion: 'concerned',
      text: 'Ich bitte um Entschuldigung. Unser Techniker ist für heute weg, die schnellste Lösung ist also ein neues Zimmer. Ist das in Ordnung?',
      translation: 'Özür dilerim. Teknisyenimiz bu gece ayrıldı, en hızlı çözüm yeni bir oda. Uygun mu?',
      choices: [
        { id: 'accept_new', intentionTr: 'Yeni odayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Das ist in Ordnung. Ein neues Zimmer passt mir.',
          translation: 'Sorun değil. Yeni bir oda benim için uygun.',
          altAccepted: ['Ein neues Zimmer ist okay', 'Das passt mir'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'insist_tech', intentionTr: 'Yine de teknisyende ısrar et', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Ich würde wirklich lieber in meinem Zimmer bleiben. Könnte morgen früh gleich ein Techniker kommen?',
          translation: 'Gerçekten kendi odamda kalmayı tercih ederim. Teknisyen yarın ilk iş gelebilir mi?',
          altAccepted: ['Kann morgen früh ein Techniker kommen', 'Ich behalte lieber mein Zimmer und es wird morgen repariert'],
          next: 'offer_compensation' }
      ]
    },
    offer_compensation: {
      id: 'offer_compensation', speakerId: 'daniel', emotion: 'friendly',
      text: 'Das ist fair. Ich ziehe zwanzig Prozent vom heutigen Preis ab und lasse Ihnen Frühstück aufs Zimmer bringen. Abgemacht?',
      translation: 'Bu makul. Bu geceki ücretten yüzde yirmi indirim yapıp odanıza kahvaltı göndereceğim. Anlaştık mı?',
      next: 'resolved_deal'
    },
    resolved_move: {
      id: 'resolved_move', speakerId: 'daniel', emotion: 'happy',
      text: 'Erledigt. Sie sind jetzt in Zimmer 302 — viel besser. Ich lasse Ihr Gepäck hochbringen. Erholsame Nacht!',
      translation: 'Tamamdır. Artık 302 numaralı odadasınız — çok daha iyi. Bavullarınızı yukarı getirteceğim. Rahat bir gece geçirin.',
      next: 'end_moved'
    },
    resolved_clean: {
      id: 'resolved_clean', speakerId: 'daniel', emotion: 'friendly',
      text: 'Der Reinigungsdienst ist unterwegs und in fünf Minuten da. Danke für Ihre Geduld.',
      translation: 'Kat görevlisi yolda ve beş dakikaya orada olacak. Sabrınız için teşekkürler.',
      next: 'end_cleaned'
    },
    resolved_deal: {
      id: 'resolved_deal', speakerId: 'daniel', emotion: 'happy',
      text: 'Ausgezeichnet. Alles ist arrangiert. Nochmals Entschuldigung für die Umstände — danke für Ihr Verständnis.',
      translation: 'Mükemmel. Her şey ayarlandı. Zahmet için tekrar özür dilerim — bu kadar anlayışlı olduğunuz için teşekkürler.',
      next: 'end_deal'
    }
  },
  endings: {
    end_moved: { id: 'end_moved', kind: 'problem-solved', title: 'Umgezogen und zufrieden', titleTr: 'Taşındın ve yerleştin',
      text: 'Du hast das Problem klar erklärt und ein besseres Zimmer bekommen. Gut gemacht.',
      translation: 'Sorunu net anlattın ve daha iyi bir oda aldın. İyi hallettin.',
      relationshipEffect: 1, coins: 12 },
    end_cleaned: { id: 'end_cleaned', kind: 'success', title: 'Schnell geregelt', titleTr: 'Hızlıca çözüldü',
      text: 'Eine schnelle, direkte Bitte hat den Reinigungsdienst losgeschickt. Einfach und wirksam.',
      translation: 'Hızlı, doğrudan bir istek kat görevlisini yola çıkardı. Basit ve etkili.',
      coins: 8 },
    end_deal: { id: 'end_deal', kind: 'excellent', title: 'Fairer Deal ausgehandelt', titleTr: 'Adil bir anlaşma',
      text: 'Du hast höflich für dich eingestanden und Rabatt plus Frühstück ausgehandelt. Das ist Deutsch auf hohem Niveau.',
      translation: 'Kibarca hakkını aradın ve indirim artı kahvaltı için pazarlık ettin. İşte ileri seviye Almanca.',
      relationshipEffect: 2, coins: 18 }
  }
});
