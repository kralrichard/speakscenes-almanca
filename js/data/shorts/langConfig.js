// ============================================================================
// Language configuration — GERMAN (de-DE).
// Everything language-specific that the speech pipeline needs lives here:
// the ASR/TTS locale and the word classes the scorer uses to weigh errors.
// The scorer folds diacritics (ä->a, ß->ss) on BOTH the expected sentence and
// the transcript, so these lists can be written naturally.
// ============================================================================

export const LOCALE = 'de-DE';
export const APP_LANG = 'Almanca';

// Closed-class words: missing one is a small error (forgiven at relaxed/normal).
export const FUNCTION_WORDS = [
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer',
  'und', 'oder', 'aber', 'zu', 'in', 'an', 'auf', 'mit', 'von', 'für', 'aus', 'bei',
  'ist', 'bin', 'sind', 'war', 'bitte', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr',
  'mir', 'mich', 'dir', 'dich', 'uns', 'euch', 'jetzt', 'heute', 'hier', 'da',
  'ja', 'auch', 'noch', 'schon', 'mal', 'doch', 'denn', 'dass', 'wenn', 'wo'
];

// Dropping/adding one of these always rejects — meaning inverts.
export const NEGATION_WORDS = [
  'nicht', 'kein', 'keine', 'keinen', 'keinem', 'keiner', 'nie', 'niemals', 'nichts', 'niemand'
];

// Substituting one number for another always rejects.
export const NUMBER_WORDS = [
  'null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
  'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn',
  'neunzehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig',
  'neunzig', 'hundert', 'tausend'
];

// Hesitations: stripped, never penalized.
export const FILLER_WORDS = ['äh', 'ähm', 'ehm', 'hm', 'hmm'];

// Digits from the recognizer -> words used in content.
export const DIGIT_WORDS = {
  '0': 'null', '1': 'eins', '2': 'zwei', '3': 'drei', '4': 'vier', '5': 'fünf', '6': 'sechs',
  '7': 'sieben', '8': 'acht', '9': 'neun', '10': 'zehn', '11': 'elf', '12': 'zwölf',
  '20': 'zwanzig', '100': 'hundert', '1000': 'tausend'
};

// Regex expansions applied to both sides before comparing (none needed for German).
export const CONTRACTIONS = [];

// Single-word equivalences the recognizer commonly produces.
export const ASR_EQUIVALENTS = [['ok', 'okay']];
