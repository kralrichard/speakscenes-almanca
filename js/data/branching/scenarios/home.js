import { createScenario } from '../scenarioSchema.js?v=7';

// ── Home: a morning at home (A1) ────────────────────────────────────────────
export const homeMorning = createScenario({
  id: 'home-morning',
  title: 'Ein Morgen zu Hause',
  titleTr: 'Evde bir sabah',
  environmentId: 'home', sceneType: 'home', level: 'A1',
  goal: 'Plaudere beim Frühstück mit deiner Schwester.',
  goalTr: 'Kahvaltıda kız kardeşinle sohbet et.',
  npcIds: ['emma'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'emma', emotion: 'happy',
      text: 'Guten Morgen! Du bist früh wach. Hast du gut geschlafen?',
      translation: 'Günaydın! Erken kalkmışsın. İyi uyudun mu?',
      choices: [
        { id: 'slept_well', intentionTr: 'İyi uyuduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Guten Morgen! Ja, ich habe richtig gut geschlafen, danke.',
          translation: 'Günaydın! Evet, çok iyi uyudum, teşekkürler.',
          altAccepted: ['Ja ich habe gut geschlafen danke', 'Morgen ich habe super geschlafen'],
          next: 'breakfast' },
        { id: 'tired', intentionTr: 'Hâlâ yorgun olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Morgen. Nicht wirklich, ich bin noch etwas müde.',
          translation: 'Günaydın. Pek sayılmaz — hâlâ biraz yorgunum.',
          altAccepted: ['Nicht wirklich ich bin noch müde', 'Ich bin noch ein bisschen müde'],
          next: 'breakfast' }
      ]
    },
    breakfast: {
      id: 'breakfast', speakerId: 'emma', emotion: 'friendly',
      text: 'Ich mache Eier. Willst du auch welche, oder nur Kaffee?',
      translation: 'Yumurta yapıyorum. Sen de ister misin, yoksa sadece kahve mi?',
      choices: [
        { id: 'eggs', intentionTr: 'Yumurta iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Eier klingen super, ja bitte!',
          translation: 'Yumurta harika olur, evet lütfen!',
          altAccepted: ['Ja bitte Eier klingen gut', 'Ich hätte gern Eier'],
          next: 'plans' },
        { id: 'just_coffee', intentionTr: 'Sadece kahve iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Für mich nur Kaffee, danke.',
          translation: 'Bana sadece kahve, teşekkürler.',
          altAccepted: ['Nur Kaffee bitte', 'Nur einen Kaffee danke'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'emma', emotion: 'curious',
      text: 'Und was hast du heute vor? Irgendwas Schönes?',
      translation: 'Peki bugün planların ne? Eğlenceli bir şey var mı?',
      choices: [
        { id: 'busy', intentionTr: 'Meşgul olduğunu söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Ich habe viel zu tun, erst Arbeit und dann Fitnessstudio.',
          translation: 'Oldukça meşgulüm — işim var, sonra da spor salonu.',
          altAccepted: ['Ich habe Arbeit und dann Fitnessstudio', 'Viel zu tun Arbeit und dann Sport'],
          next: 'end_day' },
        { id: 'invite', intentionTr: 'Kız kardeşini bir şeye davet et', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Nicht viel! Willst du später zusammen zum Markt gehen?',
          translation: 'Pek bir şey yok! Sonra birlikte pazara gitmek ister misin?',
          altAccepted: ['Willst du zusammen zum Markt gehen', 'Gehen wir später zusammen zum Markt'],
          next: 'end_together', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_day: { id: 'end_day', kind: 'success', title: 'Ab in einen vollen Tag', titleTr: 'Yoğun bir güne',
      text: 'Ein schönes, natürliches Morgengespräch. Du hast deiner Schwester deinen Tag klar erklärt.',
      translation: 'Hoş, doğal bir sabah sohbeti. Gününü kız kardeşine net biçimde anlattın.',
      coins: 8 },
    end_together: { id: 'end_together', kind: 'relationship', title: 'Gemeinsame Pläne', titleTr: 'Birlikte plan',
      text: 'Du hast deine Schwester eingeladen und einen Plan gemacht. Kleine Gespräche wie dieses sind echtes Alltagsdeutsch.',
      translation: 'Kız kardeşini dışarı davet edip plan yaptın. Bunun gibi küçük sohbetler gerçek, günlük Almancadır.',
      relationshipEffect: 1, coins: 12 }
  }
});
