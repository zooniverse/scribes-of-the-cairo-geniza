// const HEBREW_CHARACTERS = {
//   alef: {
//     code: 84,
//     character: 'א'
//   },
//   alef2: {
//     code: 84,
//     character: 'א'
//   },
//   alefLamed: {
//     code: 84,
//     character: 'א'
//   },
//   alefElongated: {
//     code: 84,
//     character: 'א'
//   },
//   bet: {
//     code: 67,
//     character: 'ב'
//   },
//   bet2: {
//     code: 67,
//     character: 'ב'
//   },
//   gimmel: {
//     code: 68,
//     character: 'ג'
//   },
//   dalet: {
//     code: 83,
//     character: 'ד'
//   },
//   daletElongated: {
//     code: 83,
//     character: 'ד'
//   },
//   hey: {
//     code: 86,
//     character: 'ה'
//   },
//   hey2: {
//     code: 86,
//     character: 'ה'
//   },
//   heyElongated: {
//     code: 86,
//     character: 'ה'
//   },
//   vav: {
//     code: 85,
//     character: 'ו'
//   },
//   zaylin: {
//     code:
//     character:
//   },
//   het: {
//     code:
//     character:
//   },
//   tet: {
//     code:
//     character:
//   },
//   yud: {
//     code:
//     character:
//   },
//   kaf: {
//     code:
//     character:
//   },
//   kafElongated: {
//     code:
//     character:
//   },
//   khafSofit: {
//     code:
//     character:
//   },
//   khatSofit2: {
//     code:
//     character:
//   },
//   lamed: {
//     code:
//     character:
//   },
//   lamedElongated: {
//     code:
//     character:
//   },
//   mem: {
//     code:
//     character:
//   },
//   mem2: {
//     code:
//     character:
//   },
//   memSofit: {
//     code:
//     character:
//   },
//   memSofitElongated: {
//     code:
//     character:
//   },
//   nun: {
//     code:
//     character:
//   },
//   nunSofit: {
//     code:
//     character:
//   },
//   samekh: {
//     code:
//     character:
//   },
//   ayin: {
//     code:
//     character:
//   },
//   ayinElongated: {
//     code:
//     character:
//   },
//   peh: {
//     code:
//     character:
//   },
//   phehSofit: {
//     code:
//     character:
//   },
//   tsadi: {
//     code:
//     character:
//   },
//   tsadiSofit: {
//     code:
//     character:
//   },
//   quf: {
//     code:
//     character:
//   },
//   quf2: {
//     code:
//     character:
//   },
//   resh: {
//     code:
//     character:
//   },
//   reshElongated: {
//     code:
//     character:
//   },
//   shin: {
//     code:
//     character:
//   },
//   shin2: {
//     code:
//     character:
//   },
//   tav: {
//     code:
//     character:
//   },
//   tavElongated: {
//     code:
//     character:
//   }
// };
//

const MODERN_HEBREW = [
  {
    character: 'ק',
    characterID: 1,
    name: 'qof',
    unicode: '\u05E7'
  },
  {
    character: 'ר',
    characterID: 2,
    name: 'resh',
    unicode: '\u05E8'
  },
  {
    character: 'א',
    characterID: 3,
    name: 'alef',
    unicode: '\u05D0'
  },
  {
    character: 'ט',
    characterID: 4,
    name: 'tet',
    unicode: '\u05D8'
  },
  {
    character: 'ו',
    characterID: 5,
    name: 'vav',
    unicode: '\u05D5'
  },
  {
    character: 'ן',
    characterID: 6,
    name: 'nunSofit',
    unicode: '\u05DF'
  },
  {
    character: 'ם',
    characterID: 7,
    name: 'memSofit',
    unicode: '\u05DD'
  },
  {
    character: 'פ',
    characterID: 8,
    name: 'pey',
    unicode: '\u05E4'
  },
  {
    character: 'ש',
    characterID: 9,
    name: 'shin',
    unicode: '\u05E9'
  },
  {
    character: 'ד',
    characterID: 10,
    name: 'dalet',
    unicode: '\u05D3'
  },
  {
    character: 'ג',
    characterID: 11,
    name: 'gimel',
    unicode: '\u05D2'
  },
  {
    character: 'כ',
    characterID: 12,
    name: 'kaf',
    unicode: '\u05DB'
  },
  {
    character: 'ע',
    characterID: 13,
    name: 'ayin',
    unicode: '\u05E2'
  },
  {
    character: 'י',
    characterID: 14,
    name: 'yod',
    unicode: '\u05D9'
  },
  {
    character: 'ח',
    characterID: 15,
    name: 'het',
    unicode: '\u05D7'
  },
  {
    character: 'ל',
    characterID: 16,
    name: 'lamed',
    unicode: '\u05DC'
  },
  {
    character: 'ך',
    characterID: 17,
    name: 'kafSofit',
    unicode: '\u05DA'
  },
  {
    character: 'ף',
    characterID: 18,
    name: 'peySofit',
    unicode: '\u05E3'
  },
  {
    character: 'ז',
    characterID: 19,
    name: 'zayin',
    unicode: '\u05D6'
  },
  {
    character: 'ס',
    characterID: 20,
    name: 'samech',
    unicode: '\u05E1'
  },
  {
    character: 'ב',
    characterID: 21,
    name: 'bet',
    unicode: '\u05D1'
  },
  {
    character: 'ה',
    characterID: 22,
    name: 'hey',
    unicode: '\u05D4'
  },
  {
    character: 'נ',
    characterID: 23,
    name: 'nun',
    unicode: '\u05E0'
  },
  {
    character: 'מ',
    characterID: 24,
    name: 'mem',
    unicode: '\u05DE'
  },
  {
    character: 'צ',
    characterID: 25,
    name: 'tsadi',
    unicode: '\u05E6'
  },
  {
    character: 'ת',
    characterID: 26,
    name: 'tav',
    unicode: '\u05EA'
  },
  {
    character: 'ץ',
    characterID: 27,
    name: 'tsadiSofit',
    unicode: '\u05E5'
  }
];

export default MODERN_HEBREW;
