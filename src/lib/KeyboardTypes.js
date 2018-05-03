import imgAshkenaziCursive from '../images/keyboards/ashkenazi-cursive.jpg';
import imgAshkenaziMiniscule from '../images/keyboards/ashkenazi-miniscule.jpg';
import imgAshkenaziSquare from '../images/keyboards/ashkenazi-square.jpg';
import imgByzantineCursive from '../images/keyboards/byzantine-cursive.jpg';
import imgByzantineMiniscule from '../images/keyboards/byzantine-miniscule.jpg';
import imgByzantineSquare from '../images/keyboards/byzantine-square.jpg';
import imgItalianCursive from '../images/keyboards/italian-cursive.jpg';
import imgItalianMiniscule from '../images/keyboards/italian-miniscule.jpg';
import imgItalianSquare from '../images/keyboards/italian-square.jpg';
import imgMaghrebiCursive from '../images/keyboards/maghrebi-cursive.jpg';
import imgMaghrebiSquare from '../images/keyboards/maghrebi-square.jpg';
import imgOrientalNEMiniscule from '../images/keyboards/oriental-ne-miniscule.jpg';
import imgOrientalNESquare from '../images/keyboards/oriental-ne-square.jpg';
import imgOrientalSWCursive from '../images/keyboards/oriental-sw-cursive.jpg';
import imgOrientalSWSquare from '../images/keyboards/oriental-sw-square.jpg';
import imgSephardiCursive from '../images/keyboards/sephardi-cursive.jpg';
import imgSephardiMiniscule from '../images/keyboards/sephardi-miniscule.jpg';
import imgSephardiSquare from '../images/keyboards/sephardi-square.jpg';
import imgYemeniteMiniscule from '../images/keyboards/yemenite-miniscule.jpg';
import imgYemeniteSquare from '../images/keyboards/yemenite-square.jpg';

const KEYBOARD_TYPES = {
  CURSIVE: 'Cursive',
  MINISCULE: 'Miniscule',
  SQUARE: 'Square'
};

const KeyboardOptions = [
  {
    name: 'Ashkenazi',
    class: 'ashkenaziCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgAshkenaziCursive,
    letters: [
      'alef', 'bet', 'betTwo', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi',
    class: 'ashkenaziMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgAshkenaziMiniscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi',
    class: 'ashkenaziSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgAshkenaziSquare,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey',
      'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed',
      'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgByzantineCursive,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit',
      'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgByzantineMiniscule,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit',
      'lamed', 'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh',
      'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgByzantineSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgItalianCursive,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgItalianMiniscule,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgItalianSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Maghrebi',
    class: 'maghrebiCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgMaghrebiCursive,
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'khafSofitTwo', 'lamed',
      'mem', 'memSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Maghrebi',
    class: 'maghrebiSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgMaghrebiSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey', 'elongatedHey',
      'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem',
      'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental NE',
    class: 'orientalNeMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgOrientalNEMiniscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental NE',
    class: 'orientalNeSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgOrientalNESquare,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental SW',
    class: 'orientalSwCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgOrientalSWCursive,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Oriental SW',
    class: 'orientalSwSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgOrientalSWSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgSephardiCursive,
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memTwo',
      'memSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi',
      'tsadiSofit', 'quf', 'qufTwo', 'resh', 'shin', 'shinTwo', 'tav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgSephardiMiniscule,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'elongatedLamed', 'mem', 'memSofit',
      'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgSephardiSquare,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'lamed',
      'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite',
    class: 'yemeniteMiniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: imgYemeniteMiniscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf',
      'khafSofit', 'lamed', 'elongatedLamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin', 'peh', 'pehSofit', 'tsadi',
      'tsadiSofit', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite',
    class: 'yemeniteSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgYemeniteSquare,
    letters: [
      'alef', 'alefLamed', 'elongatedAlef', 'bet', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'lamed', 'elongatedLamed',
      'mem', 'memSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh', 'shin', 'tav'
    ]
  }
];

export { KEYBOARD_TYPES, KeyboardOptions };
