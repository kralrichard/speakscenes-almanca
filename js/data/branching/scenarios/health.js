import { createScenario } from '../scenarioSchema.js?v=6';

// NOTE: These are fictional language-learning conversations. They never give
// real medical advice or diagnoses — the NPC always defers to real care.

// ── Hospital visit (A2) ─────────────────────────────────────────────────────
export const hospitalVisit = createScenario({
  id: 'hospital-visit',
  title: 'Ein Besuch beim Arzt',
  titleTr: 'Doktora bir ziyaret',
  environmentId: 'hospital', sceneType: 'hospital', level: 'A2',
  goal: 'Beschreibe, wie du dich fühlst, und verstehe die nächsten Schritte.',
  goalTr: 'Nasıl hissettiğini anlat ve sonraki adımları anla.',
  npcIds: ['bennett'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'bennett', emotion: 'friendly',
      text: 'Hallo, kommen Sie herein und nehmen Sie Platz. Was führt Sie heute zu mir?',
      translation: 'Merhaba, içeri gelin ve oturun. Bugün sorun nedir?',
      choices: [
        { id: 'headache', intentionTr: 'Baş ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ich habe seit zwei Tagen starke Kopfschmerzen.',
          translation: 'İki gündür şiddetli bir baş ağrım var.',
          altAccepted: ['Seit zwei Tagen habe ich Kopfschmerzen', 'Mein Kopf tut seit zwei Tagen weh'],
          next: 'when_started' },
        { id: 'stomach', intentionTr: 'Mide ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Mein Magen tut seit gestern weh.',
          translation: 'Dünden beri midem ağrıyor.',
          altAccepted: ['Ich habe seit gestern Magenschmerzen', 'Mir tut seit gestern der Magen weh'],
          next: 'when_started' },
        { id: 'tired', intentionTr: 'Çok yorgun hissettiğini anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich fühle mich sehr müde und kann nicht gut schlafen.',
          translation: 'Çok yorgun hissediyorum ve iyi uyuyamıyorum.',
          altAccepted: ['Ich bin sehr müde und schlafe schlecht', 'Ich bin ständig müde und schlafe nicht gut'],
          next: 'lifestyle' }
      ]
    },
    when_started: {
      id: 'when_started', speakerId: 'bennett', emotion: 'thinking',
      text: 'Verstehe. Und haben Sie schon etwas dagegen genommen, oder behandeln Sie es zum ersten Mal?',
      translation: 'Anlıyorum. Bunun için bir şey aldınız mı, yoksa ilk kez mi tedavi ediyorsunuz?',
      choices: [
        { id: 'took_nothing', intentionTr: 'Hiçbir şey almadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Nein, ich habe noch nichts genommen.',
          translation: 'Hayır, henüz hiçbir şey almadım.',
          altAccepted: ['Ich habe nichts genommen', 'Nein noch nichts'],
          next: 'advice' },
        { id: 'took_painkiller', intentionTr: 'Ağrı kesici aldığını ama işe yaramadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe eine Schmerztablette genommen, aber sie hat nicht wirklich geholfen.',
          translation: 'Bir ağrı kesici aldım ama pek yardımcı olmadı.',
          altAccepted: ['Ich habe eine Schmerztablette genommen aber sie half nicht', 'Eine Schmerztablette hat nicht geholfen'],
          next: 'advice' }
      ]
    },
    lifestyle: {
      id: 'lifestyle', speakerId: 'bennett', emotion: 'curious',
      text: 'Danke, dass Sie es mir sagen. Wie viel Wasser trinken Sie, und wie ist Ihr Stresslevel in letzter Zeit?',
      translation: 'Söylediğiniz için teşekkürler. Ne kadar su içiyorsunuz ve son zamanlarda stres seviyeniz nasıl?',
      choices: [
        { id: 'stressed', intentionTr: 'Çok stresli olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich hatte in letzter Zeit sehr viel Stress auf der Arbeit.',
          translation: 'Son zamanlarda işte çok stres altındaydım.',
          altAccepted: ['Ich habe viel Stress auf der Arbeit', 'Die Arbeit war zuletzt sehr stressig'],
          next: 'advice' },
        { id: 'fine_otherwise', intentionTr: 'Bunun dışında iyi olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Sonst fühle ich mich gut, nur die ganze Zeit müde.',
          translation: 'Bunun dışında iyiyim, sadece sürekli yorgunum.',
          altAccepted: ['Sonst geht es mir gut', 'Abgesehen davon geht es mir gut nur müde'],
          next: 'advice' }
      ]
    },
    advice: {
      id: 'advice', speakerId: 'bennett', emotion: 'friendly',
      text: 'Nichts hier macht mir ernsthafte Sorgen. Ich schreibe Ihnen ein paar einfache Schritte auf. Haben Sie noch Fragen, bevor Sie gehen?',
      translation: 'Burada beni ciddi anlamda endişelendiren bir şey yok. Size basit adımlar içeren bir not yazacağım. Gitmeden önce sorunuz var mı?',
      choices: [
        { id: 'ask_followup', intentionTr: 'Ne zaman geri dönmen gerektiğini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Wann sollte ich wiederkommen, wenn es nicht besser wird?',
          translation: 'Eğer düzelmezse ne zaman geri gelmeliyim?',
          altAccepted: ['Wann soll ich wiederkommen wenn es so bleibt', 'Soll ich wiederkommen wenn es nicht besser wird'],
          next: 'followup_answer', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et ve ayrıl', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Nein, das ist klar. Vielen Dank, Frau Doktor.',
          translation: 'Hayır, açık. Çok teşekkür ederim, doktor.',
          altAccepted: ['Alles klar vielen Dank Frau Doktor', 'Keine Fragen danke sehr'],
          next: 'end_clear' }
      ]
    },
    followup_answer: {
      id: 'followup_answer', speakerId: 'bennett', emotion: 'happy',
      text: 'Gute Frage. Wenn es in drei Tagen nicht besser ist, machen Sie einen neuen Termin. Passen Sie auf sich auf.',
      translation: 'İyi soru. Üç günde iyileşme olmazsa yeni bir randevu alın. Kendinize iyi bakın.',
      next: 'end_thorough'
    }
  },
  endings: {
    end_clear: { id: 'end_clear', kind: 'success', title: 'Klar erklärt', titleTr: 'Açıkça anlatıldı',
      text: 'Du hast deine Beschwerden klar beschrieben und den Rat verstanden. Ein ruhiger, erfolgreicher Besuch.',
      translation: 'Belirtilerini net anlattın ve tavsiyeyi anladın. Sakin, başarılı bir ziyaret.',
      coins: 10 },
    end_thorough: { id: 'end_thorough', kind: 'excellent', title: 'Ein gründlicher Besuch', titleTr: 'Kapsamlı bir ziyaret',
      text: 'Du hast dich nicht nur erklärt, sondern auch eine kluge Nachfrage gestellt. Genau so meistert man einen Arztbesuch auf Deutsch.',
      translation: 'Sadece kendini anlatmadın, akıllıca bir takip sorusu da sordun. Bir doktor ziyaretini Almancada tam da böyle halledersin.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Pharmacy visit (A2) ─────────────────────────────────────────────────────
export const pharmacyVisit = createScenario({
  id: 'pharmacy-visit',
  title: 'In der Apotheke',
  titleTr: 'Eczanede',
  environmentId: 'pharmacy', sceneType: 'retail', level: 'A2',
  goal: 'Besorge etwas gegen eine Erkältung und lerne, wie man es einnimmt.',
  goalTr: 'Soğuk algınlığı için bir şey al ve nasıl kullanacağını öğren.',
  npcIds: ['fatima'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'fatima', emotion: 'friendly',
      text: 'Hallo! Wie kann ich Ihnen heute helfen?',
      translation: 'Merhaba! Bugün size nasıl yardımcı olabilirim?',
      choices: [
        { id: 'cold', intentionTr: 'Soğuk algınlığı için bir şey iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hallo, ich bin erkältet. Könnten Sie etwas empfehlen?',
          translation: 'Merhaba, üşüttüm. Bir şey önerebilir misiniz?',
          altAccepted: ['Ich bin erkältet können Sie etwas empfehlen', 'Haben Sie etwas gegen Erkältung'],
          next: 'symptoms' },
        { id: 'prescription', intentionTr: 'Reçeteni vermek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe ein Rezept, das ich gern einlösen möchte, bitte.',
          translation: 'Doldurtmak istediğim bir reçetem var, lütfen.',
          altAccepted: ['Ich möchte dieses Rezept einlösen', 'Können Sie dieses Rezept einlösen'],
          next: 'prescription_node' }
      ]
    },
    symptoms: {
      id: 'symptoms', speakerId: 'fatima', emotion: 'curious',
      text: 'Das tut mir leid. Haben Sie hauptsächlich Halsschmerzen, Husten oder eine verstopfte Nase?',
      translation: 'Duyduğuma üzüldüm. Daha çok boğaz ağrınız mı, öksürüğünüz mü yoksa burun tıkanıklığınız mı var?',
      choices: [
        { id: 'throat', intentionTr: 'Boğazının ağrıdığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Vor allem Halsschmerzen und ein bisschen Husten.',
          translation: 'Çoğunlukla boğaz ağrısı ve biraz öksürük.',
          altAccepted: ['Halsschmerzen und etwas Husten', 'Hauptsächlich tut mein Hals weh und ich huste etwas'],
          next: 'recommend' },
        { id: 'nose', intentionTr: 'Burnunun tıkalı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Meine Nase ist total verstopft und ich muss ständig niesen.',
          translation: 'Burnum çok tıkalı ve sürekli hapşırıyorum.',
          altAccepted: ['Meine Nase ist verstopft und ich niese viel', 'Eine sehr verstopfte Nase und viel Niesen'],
          next: 'recommend' }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'fatima', emotion: 'friendly',
      text: 'Dieser Sirup sollte helfen. Nehmen Sie dreimal täglich einen Löffel, nach dem Essen. Haben Sie Allergien, von denen ich wissen sollte?',
      translation: 'Bu şurup yardımcı olmalı. Günde üç kez, yemeklerden sonra bir kaşık alın. Bilmem gereken bir alerjiniz var mı?',
      choices: [
        { id: 'no_allergy', intentionTr: 'Alerjin olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Keine Allergien. Soll ich ihn mit Wasser nehmen?',
          translation: 'Alerjim yok. Suyla mı almalıyım?',
          altAccepted: ['Keine Allergien nehme ich ihn mit Wasser', 'Nein keine mit Wasser'],
          next: 'instructions', relationshipEffect: 1 },
        { id: 'ask_drowsy', intentionTr: 'Uyku yapıp yapmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Keine Allergien. Macht das müde? Ich muss noch Auto fahren.',
          translation: 'Alerjim yok. Bu beni uyuşuk yapar mı? Araç kullanmam gerekiyor.',
          altAccepted: ['Macht das müde ich muss fahren', 'Verursacht das Müdigkeit'],
          next: 'drowsy_answer', relationshipEffect: 1 }
      ]
    },
    prescription_node: {
      id: 'prescription_node', speakerId: 'fatima', emotion: 'neutral',
      text: 'Danke. Die Vorbereitung dauert etwa zehn Minuten. Möchten Sie warten oder später wiederkommen?',
      translation: 'Teşekkürler. Hazırlaması yaklaşık on dakika sürer. Beklemek mi istersiniz yoksa sonra mı gelirsiniz?',
      choices: [
        { id: 'wait', intentionTr: 'Beklemeyi tercih et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ich warte, danke.',
          translation: 'Beklerim, teşekkürler.',
          altAccepted: ['Ich warte hier danke', 'Ich kann warten'],
          next: 'end_prescription' },
        { id: 'come_back', intentionTr: 'Sonra geleceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ich komme in zwanzig Minuten wieder, danke.',
          translation: 'Yirmi dakikaya geri gelirim, teşekkürler.',
          altAccepted: ['Ich komme später wieder', 'Ich bin in zwanzig Minuten zurück'],
          next: 'end_prescription' }
      ]
    },
    instructions: {
      id: 'instructions', speakerId: 'fatima', emotion: 'happy',
      text: 'Wasser ist gut. Nehmen Sie die ganze Flasche, auch wenn Sie sich besser fühlen. Gute Besserung!',
      translation: 'Su uygun. Kendinizi iyi hissetseniz bile şişeyi bitirin. Geçmiş olsun!',
      next: 'end_helped'
    },
    drowsy_answer: {
      id: 'drowsy_answer', speakerId: 'fatima', emotion: 'concerned',
      text: 'Gut, dass Sie fragen — dieser kann müde machen. Nehmen Sie stattdessen die Variante ohne Müdigkeit, eine Tablette am Morgen.',
      translation: 'Sorman iyi oldu — bu uyku yapabilir. Onun yerine uyku yapmayan türü al, sabah bir tablet.',
      next: 'end_careful'
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'Erledigt', titleTr: 'Halledildi',
      text: 'Du hast deine Beschwerden erklärt und verstanden, wie man das Medikament einnimmt. Einfach und klar.',
      translation: 'Belirtilerini anlattın ve ilacı nasıl alacağını anladın. Basit ve net.',
      coins: 10 },
    end_careful: { id: 'end_careful', kind: 'excellent', title: 'Eine kluge Frage', titleTr: 'Akıllı bir soru',
      text: 'Mit deiner Frage nach Nebenwirkungen hast du ein Problem vor dem Autofahren vermieden. Genau das fragt man eine Apothekerin.',
      translation: 'Yan etkileri sorarak araç kullanmadan önce bir sorunu önledin. Bir eczacıya sorulacak tam da doğru şey.',
      relationshipEffect: 1, coins: 14 },
    end_prescription: { id: 'end_prescription', kind: 'success', title: 'Rezept eingelöst', titleTr: 'Reçete hazırlandı',
      text: 'Du hast das Rezept höflich und klar geregelt. Alles erledigt.',
      translation: 'Reçeteyi kibar ve net biçimde hallettin. Her şey tamam.',
      coins: 8 }
  }
});
