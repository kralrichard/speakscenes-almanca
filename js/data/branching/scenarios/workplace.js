import { createScenario } from '../scenarioSchema.js?v=6';

// ── Job interview (B2) ──────────────────────────────────────────────────────
export const jobInterview = createScenario({
  id: 'job-interview',
  title: 'Das Vorstellungsgespräch',
  titleTr: 'İş görüşmesi',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B2',
  goal: 'Hinterlasse einen starken Eindruck und meistere schwierige Fragen.',
  goalTr: 'Güçlü bir izlenim bırak ve zor soruları yönet.',
  npcIds: ['carter'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'carter', emotion: 'formal',
      text: 'Danke, dass Sie gekommen sind. Erzählen Sie mir zum Einstieg ein wenig über sich?',
      translation: 'Geldiğiniz için teşekkürler. Başlangıç olarak, kendinizden biraz bahseder misiniz?',
      choices: [
        { id: 'professional', intentionTr: 'Deneyimine odaklanarak profesyonel yanıt ver', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Gern. Ich habe drei Jahre Erfahrung im Marketing und möchte gern mehr Verantwortung übernehmen.',
          translation: 'Tabii. Pazarlamada üç yıllık deneyimim var ve daha fazla sorumluluk almaya istekliyim.',
          altAccepted: ['Ich habe drei Jahre Marketing-Erfahrung und will mehr Verantwortung', 'Ich arbeite seit drei Jahren im Marketing und bin bereit für mehr Verantwortung'],
          next: 'strengths', relationshipEffect: 1 },
        { id: 'personal', intentionTr: 'Daha kişisel ve tutkulu bir yanıt ver', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Natürlich. Ich bin ein neugieriger Mensch, der gern Probleme löst und Neues lernt.',
          translation: 'Elbette. Sorun çözmeyi ve yeni beceriler öğrenmeyi seven meraklı bir insanım.',
          altAccepted: ['Ich bin neugierig und löse gern Probleme', 'Ich lerne gern Neues und löse gern Probleme'],
          next: 'strengths' }
      ]
    },
    strengths: {
      id: 'strengths', speakerId: 'carter', emotion: 'curious',
      text: 'Gut. Was würden Sie als Ihre größte Stärke bezeichnen, und haben Sie ein Beispiel dafür?',
      translation: 'Güzel. En büyük gücünüz nedir ve bir örnek verebilir misiniz?',
      choices: [
        { id: 'teamwork', intentionTr: 'Takım çalışması gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Ich arbeite gut unter Druck. Letztes Jahr habe ich ein Projekt geleitet, das zwei Wochen früher fertig war.',
          translation: 'Baskı altında iyi çalışırım. Geçen yıl iki hafta erken tamamlanan bir projeyi yönettim.',
          altAccepted: ['Ich kann gut mit Druck umgehen mein Projekt war früher fertig', 'Ich bin gut unter Druck mein letztes Projekt war früh fertig'],
          next: 'weakness' },
        { id: 'communication', intentionTr: 'İletişim gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Kommunikation. Ich erkläre technische Ideen oft so, dass jeder sie verstehen kann.',
          translation: 'İletişim. Teknik fikirleri herkesin anlayabileceği şekilde sık sık açıklarım.',
          altAccepted: ['Ich kommuniziere gut und erkläre technische Dinge klar', 'Kommunikation ich mache komplexe Ideen einfach'],
          next: 'weakness' }
      ]
    },
    weakness: {
      id: 'weakness', speakerId: 'carter', emotion: 'thinking',
      text: 'Und, ehrlich gesagt — an welcher Schwäche arbeiten Sie gerade?',
      translation: 'Peki, dürüstçe, üzerinde çalıştığınız bir zayıflık nedir?',
      choices: [
        { id: 'honest_weakness', intentionTr: 'Dürüst ama olgun bir zayıflık ver', tone: 'formal', difficulty: 'hard', xp: 20,
          sentence: 'Früher habe ich zu viel selbst übernommen, aber ich lerne, mehr zu delegieren.',
          translation: 'Eskiden her şeyi kendim üstlenirdim ama daha fazla yetki devretmeyi öğreniyorum.',
          altAccepted: ['Ich habe zu viel übernommen jetzt lerne ich zu delegieren', 'Ich mache gern alles selbst aber ich werde besser im Delegieren'],
          next: 'questions', relationshipEffect: 1 },
        { id: 'cliche', intentionTr: 'Klişe “çok çalışıyorum” yanıtı ver', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'Ehrlich gesagt glaube ich, ich arbeite manchmal einfach zu viel.',
          translation: 'Açıkçası, sanırım bazen sadece çok fazla çalışıyorum.',
          altAccepted: ['Ich arbeite manchmal zu viel', 'Meine Schwäche ist dass ich zu viel arbeite'],
          next: 'questions_flat' }
      ]
    },
    questions: {
      id: 'questions', speakerId: 'carter', emotion: 'happy',
      text: 'Das ist eine durchdachte Antwort. Haben Sie Fragen an mich?',
      translation: 'Bu düşünceli bir cevap. Bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'ask_team', intentionTr: 'Ekip hakkında bir soru sor', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Ja — wie sieht Erfolg in dieser Position in den ersten sechs Monaten aus?',
          translation: 'Evet — bu rolde ilk altı ayda başarı neye benzer?',
          altAccepted: ['Wie sieht Erfolg in den ersten sechs Monaten aus', 'Woran messen Sie Erfolg in dieser Rolle am Anfang'],
          next: 'end_strong', relationshipEffect: 2 },
        { id: 'no_questions', intentionTr: 'Sorunun olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Nein, ich glaube, Sie haben alles erklärt. Vielen Dank.',
          translation: 'Hayır, sanırım her şeyi anlattınız. Teşekkürler.',
          altAccepted: ['Nein Sie haben alles erklärt danke', 'Ich habe keine Fragen vielen Dank'],
          next: 'end_solid' }
      ]
    },
    questions_flat: {
      id: 'questions_flat', speakerId: 'carter', emotion: 'neutral',
      text: 'Hmm, das hört man oft. Nun — haben Sie Fragen an mich?',
      translation: 'Hmm, bu yaygın bir cevap. Peki — bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'recover', intentionTr: 'Güçlü bir soruyla toparla', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Ja — wie würden Sie das Team beschreiben, mit dem ich arbeiten würde?',
          translation: 'Evet — birlikte çalışacağım ekibi nasıl tanımlarsınız?',
          altAccepted: ['Wie würden Sie das Team beschreiben', 'Wie ist das Team in das ich käme'],
          next: 'end_solid', relationshipEffect: 1 },
        { id: 'no_q2', intentionTr: 'Soru sorma', tone: 'polite', difficulty: 'easy', xp: 8,
          sentence: 'Nein, im Moment nicht. Danke für Ihre Zeit.',
          translation: 'Hayır, şimdilik yok. Zaman ayırdığınız için teşekkürler.',
          altAccepted: ['Keine Fragen danke für Ihre Zeit', 'Gerade nicht vielen Dank'],
          next: 'end_neutral' }
      ]
    }
  },
  endings: {
    end_strong: { id: 'end_strong', kind: 'excellent', title: 'Ein herausragendes Gespräch', titleTr: 'Öne çıkan bir görüşme',
      text: 'Strukturierte Antworten, eine ehrliche Schwäche und eine kluge Abschlussfrage. Frau Carter ist beeindruckt.',
      translation: 'Düzenli cevaplar, dürüst bir zayıflık ve keskin bir kapanış sorusu. Ms. Carter etkilendi.',
      relationshipEffect: 2, coins: 20 },
    end_solid: { id: 'end_solid', kind: 'success', title: 'Ein solides Gespräch', titleTr: 'Sağlam bir görüşme',
      text: 'Du hast die Fragen gut gemeistert und kompetent gewirkt. Ein starker Auftritt.',
      translation: 'Soruları iyi yönettin ve yetenekli göründün. Güçlü bir performans.',
      relationshipEffect: 1, coins: 12 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'Ein ordentliches Gespräch', titleTr: 'İyi bir görüşme',
      text: 'Du bist durchgekommen, aber einige Antworten waren etwas vorsichtig. Stell nächstes Mal eine starke Abschlussfrage — spiel es noch einmal!',
      translation: 'Atlattın ama birkaç cevap biraz temkinliydi. Bir dahaki sefere güçlü bir kapanış sorusu sor — tekrar oyna ve dene!',
      coins: 6 }
  }
});

// ── Workplace misunderstanding (B1) ─────────────────────────────────────────
export const workplaceMisunderstanding = createScenario({
  id: 'workplace-misunderstanding',
  title: 'Ein Missverständnis klären',
  titleTr: 'Bir yanlış anlaşılmayı gidermek',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B1',
  goal: 'Kläre ein Missverständnis mit einem Kollegen, ohne es schlimmer zu machen.',
  goalTr: 'Bir iş arkadaşıyla yaşanan karışıklığı daha kötüye götürmeden çöz.',
  npcIds: ['raj'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'raj', emotion: 'concerned',
      text: 'Hey, ich dachte, du schickst dem Kunden gestern den Bericht. Sie haben gerade gemailt und gefragt, wo er bleibt.',
      translation: 'Selam, raporu dün müşteriye göndereceğini sanıyordum. Az önce nerede olduğunu sorarak e-posta attılar.',
      choices: [
        { id: 'clarify', intentionTr: 'Kibarca yanlış anlaşıldığını açıkla', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Oh, ich glaube, da gab es ein Missverständnis — ich hatte verstanden, dass du ihn schickst.',
          translation: 'Ah, sanırım bir karışıklık olmuş — onu senin göndereceğini anlamıştım.',
          altAccepted: ['Ich dachte du schickst ihn', 'Da ist ein Missverständnis ich dachte du sendest ihn'],
          next: 'check_email' },
        { id: 'defensive', intentionTr: 'Savunmaya geç', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'Das war nicht meine Aufgabe. Niemand hat mir gesagt, dass ich ihn schicken soll.',
          translation: 'Bu benim işim değildi. Kimse bana göndermemi söylemedi.',
          altAccepted: ['Das war nicht mein Job niemand hat es mir gesagt', 'Das ist nicht meine Aufgabe keiner hat mich gefragt'],
          next: 'tension' }
      ]
    },
    check_email: {
      id: 'check_email', speakerId: 'raj', emotion: 'thinking',
      text: 'Wirklich? Ich schaue mal in den Verlauf… Ah, du hast recht, die Nachricht war nicht eindeutig. Mein Fehler. Was machen wir jetzt?',
      translation: 'Gerçekten mi? Yazışmaya bakayım… Ah, haklısın, mesaj net değildi. Benim hatam. Şimdi ne yapmalıyız?',
      choices: [
        { id: 'take_action', intentionTr: 'Hemen çözüm öner', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'Kein Problem. Ich schicke ihn sofort und entschuldige mich beim Kunden für die Verzögerung.',
          translation: 'Sorun değil. Hemen gönderip gecikme için müşteriden özür dilerim.',
          altAccepted: ['Ich schicke ihn jetzt und entschuldige mich für die Verzögerung', 'Ich sende ihn sofort und sage dem Kunden sorry'],
          next: 'end_teamwork', relationshipEffect: 2 },
        { id: 'share_blame', intentionTr: 'Birlikte hallederiz de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'So was passiert. Lass uns beide antworten, damit der Kunde weiß, dass wir dran sind.',
          translation: 'Olur böyle şeyler. İkimiz de yanıt verelim ki müşteri ilgilendiğimizi bilsin.',
          altAccepted: ['Antworten wir beide dem Kunden', 'Passiert lass uns beide antworten damit sie es wissen'],
          next: 'end_teamwork', relationshipEffect: 2 }
      ]
    },
    tension: {
      id: 'tension', speakerId: 'raj', emotion: 'concerned',
      text: 'Okay, kein Grund, gleich so zu reagieren. Ich beschuldige dich nicht — ich will es nur lösen. Kriegen wir das zusammen hin?',
      translation: 'Tamam, ters çıkmana gerek yok. Seni suçlamıyorum — sadece düzeltmek istiyorum. Bunu birlikte çözebilir miyiz?',
      choices: [
        { id: 'apologize', intentionTr: 'Ters çıktığın için özür dile', tone: 'polite', difficulty: 'medium', xp: 16,
          sentence: 'Du hast recht, entschuldige — ich war etwas gestresst. Ja, lösen wir es zusammen.',
          translation: 'Haklısın, özür dilerim — biraz stresliydim. Evet, birlikte çözelim.',
          altAccepted: ['Sorry ich war gestresst lösen wir es zusammen', 'Du hast recht tut mir leid klären wir das'],
          next: 'end_recovered', relationshipEffect: 1 },
        { id: 'stay_cold', intentionTr: 'Soğuk kal ama işi yap', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Gut. Ich schicke den Bericht jetzt.',
          translation: 'Tamam. Raporu şimdi göndereyim.',
          altAccepted: ['Okay ich schicke ihn jetzt', 'Gut wird sofort gesendet'],
          next: 'end_cold' }
      ]
    }
  },
  endings: {
    end_teamwork: { id: 'end_teamwork', kind: 'problem-solved', title: 'Im Team gelöst', titleTr: 'Ekip olarak çözüldü',
      text: 'Du bist ruhig geblieben, hast das Missverständnis geklärt und eine Lösung angeboten. Raj arbeitet gern mit dir.',
      translation: 'Sakin kaldın, karışıklığı giderdin ve bir çözüm önerdin. Raj seninle çalışmaktan memnun.',
      relationshipEffect: 1, coins: 16 },
    end_recovered: { id: 'end_recovered', kind: 'relationship', title: 'Gut aufgefangen', titleTr: 'İyi toparlandı',
      text: 'Du hast erst defensiv reagiert, dich dann aber entschuldigt und die Kurve gekriegt. Einen Moment reparieren zu können ist echtes Können.',
      translation: 'Önce savunmaya geçtin ama özür dileyip durumu düzelttin. Bir anı onarmayı bilmek gerçek bir beceri.',
      relationshipEffect: 1, coins: 12 },
    end_cold: { id: 'end_cold', kind: 'neutral', title: 'Die Arbeit wurde erledigt', titleTr: 'İş halledildi',
      text: 'Der Bericht ging raus, aber die Stimmung blieb kühl. Versuch nächstes Mal, die Luft zu klären — spiel es noch einmal und sieh den Unterschied.',
      translation: 'Rapor gönderildi ama hava soğuk kaldı. Bir dahaki sefere ortamı yumuşatmayı dene — tekrar oyna ve farkı gör.',
      coins: 5 }
  }
});
