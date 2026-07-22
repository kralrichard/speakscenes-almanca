// ============================================================================
// Shorts sentence bank — GERMAN. Same deterministic frame-expansion approach
// as the English original: ~35 grammatically-safe frames × the hand-checked
// word banks produce thousands of correct, natural German sentences with
// Turkish translations, sorted A0 -> C2 so the baby avatar grows into the
// language sentence by sentence.
//
// A "Short" = { id, en, tr, level, topic, words }   (`en` = the TARGET-language
// sentence; the field keeps its original name so the feed UI works unchanged.)
// ============================================================================

import { NOUNS, GOODS, PLACES, ADJECTIVES, VERBS, OPINIONS, REQUESTS } from './wordBanks.js';

export const LEVEL_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelRank = (c) => LEVEL_ORDER.indexOf(c);

// --- tiny deterministic RNG (mulberry32) ------------------------------------
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
  // ---------------- A0 : first words -------------------------------------
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `${n.w}.`, tr: `${cap(n.tr)}.` })),
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `${cap(n.ei)} ${n.w}.`, tr: `Bir ${n.tr}.` })),

  // ---------------- A1 : simple sentences --------------------------------
  frame('A1', 'naming', 999, [NOUNS], ([n]) => ({ en: `Das ist ${n.ei} ${n.w}.`, tr: `Bu bir ${n.tr}.` })),
  frame('A1', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Schau, ${n.ei} ${n.w}!`, tr: `Bak, bir ${n.tr}!` })),
  frame('A1', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Hier ist ${n.ei} ${n.w}.`, tr: `İşte bir ${n.tr}.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `Wo ist ${n.def} ${n.w}?`, tr: `${cap(n.tr)} nerede?` })),
  frame('A1', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ich sehe ${n.acc} ${n.w}.`, tr: `Bir ${n.tr} görüyorum.` })),
  frame('A1', 'having', 999, [NOUNS], ([n]) => ({ en: `Ich habe ${n.acc} ${n.w}.`, tr: `Bende bir ${n.tr} var.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `Ist das ${n.ei} ${n.w}?`, tr: `Bu bir ${n.tr} ${trQ(n.tr)}?` })),
  frame('A1', 'describing', 650, [NOUNS, A], ([n, a]) => ({ en: `${cap(n.def)} ${n.w} ist ${a.w}.`, tr: `${cap(n.tr)} ${a.tr}.` })),
  frame('A1', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `${cap(n.def)} ${n.w} ist nicht ${a.w}.`, tr: `${cap(n.tr)} ${a.tr} değil.` })),
  frame('A1', 'routines', 999, [V], ([v]) => ({ en: `Ich ${v.ich} jeden Tag.`, tr: `Her gün ${v.tr1}.` })),
  frame('A1', 'likes', 999, [V], ([v]) => ({ en: `Ich ${v.ich} gern.`, tr: `${cap(v.trGer)} severim.` })),

  // ---------------- A2 : a bigger world ----------------------------------
  frame('A2', 'requests', 999, [GOODS], ([n]) => ({ en: `Kann ich ${n.acc} ${n.w} haben, bitte?`, tr: `Bir ${n.tr} alabilir miyim, lütfen?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Wie viel kostet ${n.def} ${n.w}?`, tr: `${cap(n.tr)} ne kadar?` })),
  frame('A2', 'questions', 999, [GOODS], ([n]) => ({ en: `Haben Sie ${n.acc} ${n.w}?`, tr: `Sizde ${n.tr} var mı?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Ich suche ${n.acc} ${n.w}.`, tr: `Bir ${n.tr} arıyorum.` })),
  frame('A2', 'negatives', 999, [NOUNS], ([n]) => ({ en: `Ich habe k${n.acc} ${n.w}.`, tr: `Bende ${n.tr} yok.` })),
  frame('A2', 'needs', 999, [NOUNS], ([n]) => ({ en: `Ich brauche ${n.acc} ${n.w}.`, tr: `Bana bir ${n.tr} lazım.` })),
  frame('A2', 'location', 999, [NOUNS], ([n]) => ({ en: `Es gibt hier ${n.acc} ${n.w}.`, tr: `Burada bir ${n.tr} var.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Ich möchte heute ${v.inf}.`, tr: `Bugün ${v.trInf} istiyorum.` })),
  frame('A2', 'negatives', 999, [V], ([v]) => ({ en: `Ich will jetzt nicht ${v.inf}.`, tr: `Şimdi ${v.trInf} istemiyorum.` })),
  frame('A2', 'obligation', 999, [V], ([v]) => ({ en: `Ich muss jetzt ${v.inf}.`, tr: `Şimdi ${v.trInf} zorundayım.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Möchtest du ${v.inf}?`, tr: `${cap(v.trInf)} ister misin?` })),

  // ---------------- B1 : more independence -------------------------------
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Könnten Sie bitte ${r.r}?`, tr: `Acaba ${r.tr}?` })),
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Würden Sie bitte ${r.r}?`, tr: `Lütfen, ${r.tr}?` })),
  frame('B1', 'directions', 999, [PLACES], ([n]) => ({ en: `Wissen Sie, wo ${n.def} ${n.w} ist?`, tr: `${cap(n.tr)} nerede, biliyor musunuz?` })),
  frame('B1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich denke, ${o.c}.`, tr: `Bence ${o.tr}.` })),
  frame('B1', 'plans', 999, [V], ([v]) => ({ en: `Ich möchte ${v.inf} lernen.`, tr: `${cap(v.trInf)} öğrenmek istiyorum.` })),

  // ---------------- B2 : complex social & professional -------------------
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich finde, ${o.c}.`, tr: `Bana göre ${o.tr}.` })),
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ehrlich gesagt: ${cap(o.c)}.`, tr: `Dürüst olmak gerekirse, ${o.tr}.` })),
  frame('B2', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Es wäre nett, wenn Sie ${r.r} könnten.`, tr: `Acaba ${r.tr}? Çok memnun olurum.` })),

  // ---------------- C1 : advanced ----------------------------------------
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Ich bin überzeugt: ${cap(o.c)}.`, tr: `Bana kalırsa ${o.tr}.` })),
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Eines ist klar: ${cap(o.c)}.`, tr: `Şu açık: ${o.tr}.` })),

  // ---------------- C2 : confident, precise ------------------------------
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `Ganz ehrlich: ${cap(o.c)}.`, tr: `Tamamen dürüst olmam gerekirse, ${o.tr}.` })),
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `Man muss zugeben: ${cap(o.c)}.`, tr: `Kabul etmek gerek: ${o.tr}.` }))
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
