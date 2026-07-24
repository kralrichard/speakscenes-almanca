// ============================================================================
// Shorts sentence bank — GERMAN. Deterministic frame expansion over the
// hand-checked banks. Sentence-first: A0 is short exclamations, everything
// above is full sentences — including attributive adjectives with correct
// endings (ein großer Hund / einen großen Hund), Perfekt past, werden-future,
// seit-durations, and a hand-written DAILY set of real everyday sentences.
// Sorted A0 -> C2.
// ============================================================================

import { NOUNS, GOODS, PLACES, OWNABLE, ADJECTIVES, VERBS, OPINIONS, REQUESTS, ACTIVITIES, DURATIONS, DAILY } from './wordBanks.js?v=7';

export const LEVEL_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelRank = (c) => LEVEL_ORDER.indexOf(c);

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Turkish yes/no question particle with vowel harmony ("kedi mi", "at mı").
function trQ(word) {
  const v = (word.toLowerCase().match(/[aeıioöuü]/g) || ['e']).pop();
  return { a: 'mı', ı: 'mı', e: 'mi', i: 'mi', o: 'mu', u: 'mu', ö: 'mü', ü: 'mü' }[v] || 'mi';
}

// --- German attributive adjective endings, derived from the noun's gender ---
// (nominative: ein großER Hund / eine großE Katze / ein großES Pferd;
//  accusative: einen großEN Hund / eine großE Katze / ein großES Pferd)
const gOf = (n) => n.def === 'der' ? 'm' : n.def === 'die' ? 'f' : 'n';
const stem = (a) => a.w === 'teuer' ? 'teur' : a.w;
const nomAttr = (a, n) => stem(a) + ({ m: 'er', f: 'e', n: 'es' })[gOf(n)];
const accAttr = (a, n) => stem(a) + ({ m: 'en', f: 'e', n: 'es' })[gOf(n)];

function frame(level, topic, capN, slots, make) {
  return { level, topic, capN, slots, make };
}

function expandFrame(f, seedBase) {
  const sizes = f.slots.map(s => s.length);
  const total = sizes.reduce((a, b) => a * b, 1);
  const rnd = mulberry32(seedBase);
  let picks;
  if (total <= f.capN) {
    picks = Array.from({ length: total }, (_, i) => i);
  } else {
    const seen = new Set(); picks = [];
    let guard = f.capN * 40;
    while (picks.length < f.capN && guard-- > 0) {
      const idx = Math.floor(rnd() * total);
      if (!seen.has(idx)) { seen.add(idx); picks.push(idx); }
    }
  }
  const out = [];
  for (const flat of picks) {
    let rem = flat;
    const items = [];
    for (let s = f.slots.length - 1; s >= 0; s--) {
      const sz = sizes[s];
      items[s] = f.slots[s][rem % sz];
      rem = Math.floor(rem / sz);
    }
    const { en, tr } = f.make(items);
    out.push({ en, tr, level: f.level, topic: f.topic, words: en.split(/\s+/).length });
  }
  return out;
}

const A = ADJECTIVES, V = VERBS;

const FRAMES = [
  // ---------------- A0 : first mini-sentences ----------------------------
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `${cap(n.ei)} ${n.w}!`, tr: `Bir ${n.tr}!` })),
  frame('A0', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Schau, ${n.ei} ${n.w}!`, tr: `Bak, bir ${n.tr}!` })),
  frame('A0', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Da ist ${n.ei} ${n.w}!`, tr: `İşte orada bir ${n.tr}!` })),
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `Noch ${n.ei} ${n.w}!`, tr: `Bir ${n.tr} daha!` })),
  frame('A0', 'location', 999, [NOUNS], ([n]) => ({ en: `${cap(n.def)} ${n.w} ist da!`, tr: `${cap(n.tr)} burada!` })),
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `Oh, ${n.ei} ${n.w}!`, tr: `Oo, bir ${n.tr}!` })),
  frame('A0', 'first-words', 260, [NOUNS, NOUNS], ([a, b]) => ({ en: `${cap(a.ei)} ${a.w} und ${b.ei} ${b.w}!`, tr: `Bir ${a.tr} ve bir ${b.tr}!` })),

  // ---------------- A1 : simple full sentences ---------------------------
  frame('A1', 'naming', 999, [NOUNS], ([n]) => ({ en: `Das ist ${n.ei} ${n.w}.`, tr: `Bu bir ${n.tr}.` })),
  frame('A1', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Hier ist ${n.ei} ${n.w}.`, tr: `İşte bir ${n.tr}.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `Wo ist ${n.def} ${n.w}?`, tr: `${cap(n.tr)} nerede?` })),
  frame('A1', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ich sehe ${n.acc} ${n.w}.`, tr: `Bir ${n.tr} görüyorum.` })),
  frame('A1', 'having', 999, [NOUNS], ([n]) => ({ en: `Ich habe ${n.acc} ${n.w}.`, tr: `Bende bir ${n.tr} var.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `Ist das ${n.ei} ${n.w}?`, tr: `Bu bir ${n.tr} ${trQ(n.tr)}?` })),
  frame('A1', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ich habe ${n.acc} ${n.w} gefunden.`, tr: `Bir ${n.tr} buldum.` })),
  frame('A1', 'questions', 999, [OWNABLE], ([n]) => ({ en: `${cap(n.def)} ${n.w} ist weg!`, tr: `${cap(n.tr)} kayıp!` })),
  frame('A1', 'describing', 999, [NOUNS, A], ([n, a]) => ({ en: `${cap(n.def)} ${n.w} ist ${a.w}.`, tr: `${cap(n.tr)} ${a.tr}.` })),
  frame('A1', 'describing', 500, [NOUNS, A], ([n, a]) => ({ en: `${cap(n.def)} ${n.w} ist nicht ${a.w}.`, tr: `${cap(n.tr)} ${a.tr} değil.` })),
  frame('A1', 'describing', 800, [NOUNS, A], ([n, a]) => ({ en: `Das ist ${n.ei} ${nomAttr(a, n)} ${n.w}.`, tr: `Bu ${a.tr} bir ${n.tr}.` })),
  frame('A1', 'routines', 999, [V], ([v]) => ({ en: `Ich ${v.ich} jeden Tag.`, tr: `Her gün ${v.tr1}.` })),
  frame('A1', 'likes', 999, [V], ([v]) => ({ en: `Ich ${v.ich} gern.`, tr: `${cap(v.trGer)} severim.` })),

  // ---------------- A2 : a bigger world ----------------------------------
  frame('A2', 'requests', 999, [GOODS], ([n]) => ({ en: `Kann ich ${n.acc} ${n.w} haben, bitte?`, tr: `Bir ${n.tr} alabilir miyim, lütfen?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Wie viel kostet ${n.def} ${n.w}?`, tr: `${cap(n.tr)} ne kadar?` })),
  frame('A2', 'questions', 999, [GOODS], ([n]) => ({ en: `Haben Sie ${n.acc} ${n.w}?`, tr: `Sizde ${n.tr} var mı?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Ich suche ${n.acc} ${n.w}.`, tr: `Bir ${n.tr} arıyorum.` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Ich möchte ${n.acc} ${n.w} kaufen.`, tr: `Bir ${n.tr} almak istiyorum.` })),
  frame('A2', 'negatives', 999, [NOUNS], ([n]) => ({ en: `Ich habe k${n.acc} ${n.w}.`, tr: `Bende ${n.tr} yok.` })),
  frame('A2', 'negatives', 999, [NOUNS], ([n]) => ({ en: `Ich brauche k${n.acc} ${n.w}.`, tr: `Bana ${n.tr} gerekmiyor.` })),
  frame('A2', 'needs', 999, [NOUNS], ([n]) => ({ en: `Ich brauche ${n.acc} ${n.w}.`, tr: `Bana bir ${n.tr} lazım.` })),
  frame('A2', 'location', 999, [NOUNS], ([n]) => ({ en: `Es gibt hier ${n.acc} ${n.w}.`, tr: `Burada bir ${n.tr} var.` })),
  frame('A2', 'location', 999, [NOUNS], ([n]) => ({ en: `Gibt es hier in der Nähe ${n.acc} ${n.w}?`, tr: `Yakınlarda bir ${n.tr} var mı?` })),
  frame('A2', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ich habe ${n.acc} ${n.w} gesehen.`, tr: `Bir ${n.tr} gördüm.` })),
  frame('A2', 'shopping', 620, [GOODS, A], ([n, a]) => ({ en: `Sie hat ${n.acc} ${accAttr(a, n)} ${n.w} gekauft.`, tr: `${cap(a.tr)} bir ${n.tr} aldı.` })),
  frame('A2', 'describing', 700, [OWNABLE, A], ([n, a]) => ({ en: `Ich habe ${n.acc} ${accAttr(a, n)} ${n.w}.`, tr: `Bende ${a.tr} bir ${n.tr} var.` })),
  frame('A2', 'exclaim', 600, [NOUNS, A], ([n, a]) => ({ en: `Was für ${n.ei} ${nomAttr(a, n)} ${n.w}!`, tr: `Ne ${a.tr} bir ${n.tr}!` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Ich möchte heute ${v.inf}.`, tr: `Bugün ${v.trInf} istiyorum.` })),
  frame('A2', 'negatives', 999, [V], ([v]) => ({ en: `Ich will jetzt nicht ${v.inf}.`, tr: `Şimdi ${v.trInf} istemiyorum.` })),
  frame('A2', 'obligation', 999, [V], ([v]) => ({ en: `Ich muss jetzt ${v.inf}.`, tr: `Şimdi ${v.trInf} zorundayım.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Möchtest du ${v.inf}?`, tr: `${cap(v.trInf)} ister misin?` })),
  frame('A2', 'routines', 999, [V], ([v]) => ({ en: `Am Wochenende ${v.ich} ich gern.`, tr: `Hafta sonları ${v.trGer} severim.` })),
  frame('A2', 'routines', 999, [V], ([v]) => ({ en: `Gestern ${v.aux} ich viel ${v.part}.`, tr: `Dün çok ${v.trPast}.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Morgen werde ich ${v.inf}.`, tr: `Yarın ${v.trFut}.` })),

  // ---------------- B1 : more independence -------------------------------
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Könnten Sie bitte ${r.r}?`, tr: `Acaba ${r.tr}?` })),
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Würden Sie bitte ${r.r}?`, tr: `Lütfen, ${r.tr}?` })),
  frame('B1', 'directions', 999, [PLACES], ([n]) => ({ en: `Wissen Sie, wo ${n.def} ${n.w} ist?`, tr: `${cap(n.tr)} nerede, biliyor musunuz?` })),
  frame('B1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich denke, ${o.c}.`, tr: `Bence ${o.tr}.` })),
  frame('B1', 'plans', 999, [V], ([v]) => ({ en: `Ich möchte ${v.inf} lernen.`, tr: `${cap(v.trInf)} öğrenmek istiyorum.` })),
  frame('B1', 'experience', 999, [ACTIVITIES, DURATIONS], ([a, d]) => ({ en: `${a.t} ${d.t}.`, tr: `${cap(d.tr)} ${a.tr}.` })),
  frame('B1', 'describing', 700, [OWNABLE, A], ([n, a]) => ({ en: `Ich habe noch nie so ${n.acc} ${accAttr(a, n)} ${n.w} gesehen.`, tr: `Daha önce hiç bu kadar ${a.tr} bir ${n.tr} görmedim.` })),
  frame('B1', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Ich frage mich, ob ${n.def} ${n.w} wirklich so ${a.w} ist.`, tr: `${cap(n.tr)} gerçekten bu kadar ${a.tr} mı, merak ediyorum.` })),
  frame('B1', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Findest du nicht, dass ${n.def} ${n.w} zu ${a.w} ist?`, tr: `Sence de ${n.tr} fazla ${a.tr} değil mi?` })),

  // ---------------- B2 : complex social & professional -------------------
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich finde, ${o.c}.`, tr: `Bana göre ${o.tr}.` })),
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ehrlich gesagt: ${cap(o.c)}.`, tr: `Dürüst olmak gerekirse, ${o.tr}.` })),
  frame('B2', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Es wäre nett, wenn Sie ${r.r} könnten.`, tr: `Acaba ${r.tr}? Çok memnun olurum.` })),
  frame('B2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Ehrlich gesagt hätte ich nicht gedacht, dass ${n.def} ${n.w} so ${a.w} sein würde.`, tr: `Açıkçası ${n.tr} bu kadar ${a.tr} olur diye düşünmemiştim.` })),
  frame('B2', 'describing', 500, [NOUNS, A], ([n, a]) => ({ en: `Es kommt darauf an, wie ${a.w} ${n.def} ${n.w} tatsächlich ist.`, tr: `${cap(n.tr)} gerçekte ne kadar ${a.tr}, ona bağlı.` })),
  frame('B2', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Meiner Erfahrung nach ist ${n.def} ${n.w} selten so ${a.w}.`, tr: `Tecrübeme göre ${n.tr} nadiren bu kadar ${a.tr} olur.` })),
  frame('B2', 'plans', 999, [V], ([v]) => ({ en: `Ich hätte nie gedacht, dass ich einmal ${v.inf} würde.`, tr: `Bir gün ${v.trInf} aklıma gelmezdi.` })),
  frame('B2', 'advice', 999, [V], ([v]) => ({ en: `Es fällt mir schwer, regelmäßig zu ${v.inf}.`, tr: `Düzenli olarak ${v.trInf} bana zor geliyor.` })),

  // ---------------- C1 : advanced ----------------------------------------
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich bin überzeugt: ${cap(o.c)}.`, tr: `Bana kalırsa ${o.tr}.` })),
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Eines ist klar: ${cap(o.c)}.`, tr: `Şu açık: ${o.tr}.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Es überrascht mich, wie ${a.w} ${n.def} ${n.w} tatsächlich ist.`, tr: `${cap(n.tr)} gerçekte ne kadar ${a.tr}, bu beni şaşırtıyor.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Man sollte nicht davon ausgehen, dass ${n.def} ${n.w} immer so ${a.w} ist.`, tr: `${cap(n.tr)} her zaman bu kadar ${a.tr} olur diye varsaymamak gerek.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Ob ${n.def} ${n.w} wirklich so ${a.w} ist, bleibt fraglich.`, tr: `${cap(n.tr)} gerçekten bu kadar ${a.tr} mı, şüpheli.` })),
  frame('C1', 'advice', 999, [V], ([v]) => ({ en: `Es wäre durchaus sinnvoll, regelmäßig zu ${v.inf}.`, tr: `Düzenli olarak ${v.trInf} gerçekten mantıklı olurdu.` })),
  frame('C1', 'advice', 999, [V], ([v]) => ({ en: `Mir ist bewusst, dass ich öfter ${v.inf} sollte.`, tr: `Daha sık ${v.trInf} gerektiğinin farkındayım.` })),

  // ---------------- C2 : confident, precise ------------------------------
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `Ganz ehrlich: ${cap(o.c)}.`, tr: `Tamamen dürüst olmam gerekirse, ${o.tr}.` })),
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `Man muss zugeben: ${cap(o.c)}.`, tr: `Kabul etmek gerek: ${o.tr}.` })),
  frame('C2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Man könnte kaum behaupten, dass ${n.def} ${n.w} besonders ${a.w} wäre.`, tr: `${cap(n.tr)} özellikle ${a.tr} denemez pek.` })),
  frame('C2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Es lässt sich nicht leugnen, dass ${n.def} ${n.w} bemerkenswert ${a.w} ist.`, tr: `${cap(n.tr)} dikkat çekici derecede ${a.tr}, bu inkar edilemez.` })),
  frame('C2', 'describing', 500, [OWNABLE, A], ([n, a]) => ({ en: `Selten habe ich ${n.acc} so ${accAttr(a, n)} ${n.w} gesehen.`, tr: `Nadiren bu kadar ${a.tr} bir ${n.tr} gördüm.` })),
  frame('C2', 'plans', 999, [V], ([v]) => ({ en: `Rückblickend hätte ich viel öfter ${v.inf} sollen.`, tr: `Geriye dönüp bakınca çok daha sık ${v.trInf} gerekirmiş.` }))
];

// ============================================================================
// Build once, deterministically, and cache.
// ============================================================================
let _bank = null;

export function buildShortsBank() {
  if (_bank) return _bank;
  const all = [];
  FRAMES.forEach((f, fi) => {
    const sentences = expandFrame(f, 1000 + fi * 7919);
    sentences.forEach((s, si) => all.push({ ...s, id: `s${fi}_${si}` }));
  });
  // Hand-written everyday sentences join the stream as-is.
  DAILY.forEach((d, i) => all.push({
    en: d.t, tr: d.tr, level: d.level, topic: 'daily',
    words: d.t.split(/\s+/).length, id: `d${i}`
  }));
  const seen = new Set();
  const deduped = all.filter(s => {
    const k = s.en.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  deduped.sort((a, b) => levelRank(a.level) - levelRank(b.level));
  _bank = deduped;
  return _bank;
}

export function levelBands() {
  const bank = buildShortsBank();
  const bands = {};
  LEVEL_ORDER.forEach(lv => { bands[lv] = { start: -1, count: 0 }; });
  bank.forEach((s, i) => {
    if (bands[s.level].start === -1) bands[s.level].start = i;
    bands[s.level].count++;
  });
  return bands;
}

export function levelAtIndex(i) {
  const bank = buildShortsBank();
  const s = bank[Math.max(0, Math.min(bank.length - 1, i))];
  return s ? s.level : 'A0';
}

export function shortsCount() {
  return buildShortsBank().length;
}

let _byLevel = null;
export function sentencesForLevel(level) {
  if (!_byLevel) {
    _byLevel = {};
    LEVEL_ORDER.forEach(lv => { _byLevel[lv] = []; });
    for (const s of buildShortsBank()) _byLevel[s.level].push(s);
  }
  return _byLevel[level] || [];
}

export function shortForLevel(level, cursor) {
  const list = sentencesForLevel(level);
  if (!list.length) return buildShortsBank()[0];
  return list[cursor % list.length];
}
