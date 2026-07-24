import { createScenario } from '../scenarioSchema.js?v=7';

// ── Supermarket: finding items (A2) ─────────────────────────────────────────
export const supermarketHelp = createScenario({
  id: 'supermarket-help',
  title: 'Finden, was du brauchst',
  titleTr: 'Aradığını bulmak',
  environmentId: 'supermarket', sceneType: 'retail', level: 'A2',
  goal: 'Bitte einen Mitarbeiter, dir beim Finden von Produkten zu helfen.',
  goalTr: 'Ürünleri bulmak için görevliden yardım iste.',
  npcIds: ['tom'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'tom', emotion: 'friendly',
      text: 'Hallo, finden Sie alles?',
      translation: 'Merhaba, her şeyi bulabiliyor musunuz?',
      choices: [
        { id: 'ask_milk', intentionTr: 'Sütün nerede olduğunu sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ehrlich gesagt, nein. Können Sie mir sagen, wo die Milch ist?',
          translation: 'Aslında hayır. Sütün nerede olduğunu söyler misiniz?',
          altAccepted: ['Wo ist die Milch', 'Können Sie mir sagen wo die Milch steht'],
          next: 'milk_dir' },
        { id: 'ask_glutenfree', intentionTr: 'Glutensiz ürün olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Haben Sie glutenfreies Brot? Ich kann es nicht finden.',
          translation: 'Glutensiz ekmeğiniz var mı? Bulamıyorum.',
          altAccepted: ['Verkaufen Sie glutenfreies Brot', 'Wo ist das glutenfreie Brot'],
          next: 'gf_dir' }
      ]
    },
    milk_dir: {
      id: 'milk_dir', speakerId: 'tom', emotion: 'helpful',
      text: 'Natürlich — Gang vier, ganz hinten, in den Kühlschränken. Noch etwas?',
      translation: 'Tabii — dördüncü koridorda, arkada, buzdolaplarında. Başka bir şey?',
      choices: [
        { id: 'also_eggs', intentionTr: 'Yumurta da sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ja, wo finde ich denn auch die Eier?',
          translation: 'Evet, yumurtaları da nerede bulabilirim?',
          altAccepted: ['Wo sind die Eier', 'Wo finde ich auch Eier'],
          next: 'eggs_dir', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Das ist alles, danke für Ihre Hilfe!',
          translation: 'Hepsi bu, yardımın için teşekkürler!',
          altAccepted: ['Das war alles danke', 'Danke das ist alles'],
          next: 'end_found' }
      ]
    },
    gf_dir: {
      id: 'gf_dir', speakerId: 'tom', emotion: 'friendly',
      text: 'Haben wir! In der Reformabteilung, Gang sieben. Da gibt es eine gute Auswahl.',
      translation: 'Var! Sağlıklı gıda bölümünde, yedinci koridorda. Orada güzel bir seçenek var.',
      choices: [
        { id: 'thank_gf', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfekt, vielen Dank!',
          translation: 'Mükemmel, çok teşekkürler!',
          altAccepted: ['Danke sehr', 'Super danke'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_more', intentionTr: 'Başka glutensiz ürün var mı sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Super. Haben Sie in der Abteilung auch glutenfreie Nudeln?',
          translation: 'Harika. O bölümde glutensiz makarna da var mı?',
          altAccepted: ['Gibt es dort auch glutenfreie Nudeln', 'Haben Sie auch glutenfreie Pasta'],
          next: 'eggs_dir' }
      ]
    },
    eggs_dir: {
      id: 'eggs_dir', speakerId: 'tom', emotion: 'happy',
      text: 'Direkt neben der Milch, gleicher Gang. Dann haben Sie alles — schönen Tag noch!',
      translation: 'Tam sütün yanında, aynı koridorda. Hepsi tamam — iyi günler!',
      next: 'end_found'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'Alles gefunden', titleTr: 'Her şey bulundu',
      text: 'Du hast klar um Hilfe gebeten und gefunden, was du brauchst. Einfach und freundlich.',
      translation: 'Net biçimde yardım istedin ve aradığını buldun. Basit ve dostça.',
      coins: 10 }
  }
});

// ── Clothing store: returning an item (B1) ──────────────────────────────────
export const clothingReturn = createScenario({
  id: 'clothing-return',
  title: 'Eine Jacke zurückgeben',
  titleTr: 'Bir ceketi iade etmek',
  environmentId: 'clothing', sceneType: 'retail', level: 'B1',
  goal: 'Gib etwas zurück, das nicht passt, und kläre Rückerstattung oder Umtausch.',
  goalTr: 'Olmayan bir ürünü iade et, para iadesi ya da değişim ayarla.',
  npcIds: ['zoe'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'zoe', emotion: 'friendly',
      text: 'Hallo! Wie kann ich Ihnen heute helfen?',
      translation: 'Merhaba! Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'return_size', intentionTr: 'Beden olmadığı için iade etmek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Hallo, ich möchte diese Jacke zurückgeben. Sie passt mir nicht.',
          translation: 'Merhaba, bu ceketi iade etmek istiyorum. Bana olmadı.',
          altAccepted: ['Ich will diese Jacke zurückgeben sie passt nicht', 'Ich möchte das zurückgeben falsche Größe'],
          next: 'receipt' },
        { id: 'return_faulty', intentionTr: 'Kusurlu olduğu için iade etmek istediğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Ich muss diese Jacke zurückgeben, der Reißverschluss ist kaputt.',
          translation: 'Bu ceketi iade etmem gerekiyor — fermuarı bozuk.',
          altAccepted: ['Der Reißverschluss ist kaputt ich will sie zurückgeben', 'Die Jacke hat einen kaputten Reißverschluss'],
          next: 'faulty' }
      ]
    },
    receipt: {
      id: 'receipt', speakerId: 'zoe', emotion: 'neutral',
      text: 'Überhaupt kein Problem. Haben Sie den Kassenbon dabei?',
      translation: 'Hiç sorun değil. Fişiniz yanınızda mı?',
      choices: [
        { id: 'yes_receipt', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ja, hier ist er. Ich habe sie am Montag gekauft.',
          translation: 'Evet, buyurun. Pazartesi almıştım.',
          altAccepted: ['Hier ist der Bon ich habe sie Montag gekauft', 'Ja ich habe ihn hier'],
          next: 'refund_or_exchange' },
        { id: 'no_receipt', intentionTr: 'Fişin olmadığını söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Ich fürchte, ich habe den Bon verloren, aber ich habe mit Karte gezahlt.',
          translation: 'Korkarım fişi kaybettim ama kartla ödemiştim.',
          altAccepted: ['Ich habe den Bon verloren aber mit Karte gezahlt', 'Kein Bon aber ich habe die Kartenzahlung'],
          next: 'card_lookup' }
      ]
    },
    faulty: {
      id: 'faulty', speakerId: 'zoe', emotion: 'apologetic',
      text: 'Oh, das tut mir leid! Ein defekter Artikel — Ihnen steht die volle Rückerstattung zu. Bon oder die Karte, mit der Sie gezahlt haben?',
      translation: 'Ah, çok üzgünüm! Kusurlu ürün — tam para iadesine hakkınız var. Fiş mi yoksa ödediğiniz kart mı var?',
      choices: [
        { id: 'card_faulty', intentionTr: 'Kartla ödediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe mit Karte gezahlt, hier ist sie.',
          translation: 'Kartla ödemiştim — işte burada.',
          altAccepted: ['Mit Karte hier', 'Mit Karte hier ist sie'],
          next: 'refund_done', relationshipEffect: 1 },
        { id: 'receipt_faulty', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ich habe den Bon gleich hier.',
          translation: 'Fiş tam burada.',
          altAccepted: ['Hier ist der Bon', 'Ich habe den Bon dabei'],
          next: 'refund_done' }
      ]
    },
    card_lookup: {
      id: 'card_lookup', speakerId: 'zoe', emotion: 'friendly',
      text: 'Das geht in Ordnung — ich kann den Kauf über Ihre Karte finden. Möchten Sie eine Rückerstattung oder einen Umtausch?',
      translation: 'Sorun değil — alışverişi kartınızla bulabilirim. Para iadesi mi yoksa değişim mi istersiniz?',
      next: 'refund_or_exchange'
    },
    refund_or_exchange: {
      id: 'refund_or_exchange', speakerId: 'zoe', emotion: 'friendly',
      text: 'Prima. Also, möchten Sie lieber eine Rückerstattung oder die Jacke in einer anderen Größe umtauschen?',
      translation: 'Harika. Peki, para iadesi mi tercih edersiniz yoksa farklı bir bedenle değişim mi?',
      choices: [
        { id: 'exchange', intentionTr: 'Farklı bedenle değiştir', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Ich möchte sie gern gegen eine größere Größe umtauschen, bitte.',
          translation: 'Daha büyük bir bedenle değiştirmek istiyorum, lütfen.',
          altAccepted: ['Kann ich sie gegen eine größere Größe tauschen', 'Ich hätte gern eine Nummer größer'],
          next: 'end_exchange', relationshipEffect: 1 },
        { id: 'refund', intentionTr: 'Para iadesi iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Eine Rückerstattung wäre besser, danke.',
          translation: 'Para iadesi daha iyi olur, teşekkürler.',
          altAccepted: ['Ich hätte lieber die Rückerstattung', 'Nur die Rückerstattung bitte'],
          next: 'refund_done' }
      ]
    },
    refund_done: {
      id: 'refund_done', speakerId: 'zoe', emotion: 'happy',
      text: 'Alles erledigt — das Geld ist in ein paar Tagen wieder auf Ihrer Karte. Danke für Ihre Geduld!',
      translation: 'Tamamdır — para birkaç gün içinde kartınıza geri yansır. Sabrınız için teşekkürler!',
      next: 'end_refund'
    }
  },
  endings: {
    end_exchange: { id: 'end_exchange', kind: 'problem-solved', title: 'Gegen die richtige Größe getauscht', titleTr: 'Doğru bedenle değişti',
      text: 'Du hast das Problem erklärt und bist mit einer Jacke rausgegangen, die wirklich passt. Gut gemacht.',
      translation: 'Sorunu anlattın ve sana gerçekten olan bir ceketle çıktın. Güzel iş.',
      relationshipEffect: 1, coins: 12 },
    end_refund: { id: 'end_refund', kind: 'success', title: 'Rückerstattung geregelt', titleTr: 'İade halledildi',
      text: 'Du hast die Rückgabe ruhig abgewickelt und dein Geld zurückbekommen. Durchgehend klar und höflich.',
      translation: 'İadeyi sakince hallettin ve paranı geri aldın. Baştan sona net ve kibar.',
      coins: 10 }
  }
});
