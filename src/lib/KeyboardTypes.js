import imgAshkenaziCursive from '../images/keyboards/ashkenazi-cursive.jpg';
import imgAshkenaziMinuscule from '../images/keyboards/ashkenazi-minuscule.jpg';
import imgAshkenaziSquare from '../images/keyboards/ashkenazi-square.jpg';
import imgByzantineCursive from '../images/keyboards/byzantine-cursive.jpg';
import imgByzantineMinuscule from '../images/keyboards/byzantine-minuscule.jpg';
import imgByzantineSquare from '../images/keyboards/byzantine-square.jpg';
import imgItalianCursive from '../images/keyboards/italian-cursive.jpg';
import imgItalianMinuscule from '../images/keyboards/italian-minuscule.jpg';
import imgItalianSquare from '../images/keyboards/italian-square.jpg';
import imgMaghrebiCursive from '../images/keyboards/maghrebi-cursive.jpg';
import imgMaghrebiSquare from '../images/keyboards/maghrebi-square.jpg';
import imgOrientalNEMinuscule from '../images/keyboards/oriental-ne-minuscule.jpg';
import imgOrientalNESquare from '../images/keyboards/oriental-ne-square.jpg';
import imgOrientalSWCursive from '../images/keyboards/oriental-sw-cursive.jpg';
import imgOrientalSWSquare from '../images/keyboards/oriental-sw-square.jpg';
import imgSephardiCursive from '../images/keyboards/sephardi-cursive.jpg';
import imgSephardiMinuscule from '../images/keyboards/sephardi-minuscule.jpg';
import imgSephardiSquare from '../images/keyboards/sephardi-square.jpg';
import imgYemeniteMinuscule from '../images/keyboards/yemenite-minuscule.jpg';
import imgYemeniteSquare from '../images/keyboards/yemenite-square.jpg';

const KEYBOARD_TYPES = {
  CURSIVE: 'Cursive',
  MINUSCULE: 'Minuscule',
  SQUARE: 'Square'
};

const KeyboardOptions = [
  {
    name: 'Oriental SW',
    class: 'orientalSwSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgOrientalSWSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin',
      'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun',
      'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental SW',
    class: 'orientalSwCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgOrientalSWCursive,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het',
      'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun', 'finalNun',
      'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Oriental NE',
    class: 'orientalNeSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgOrientalNESquare,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin',
      'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun',
      'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental NE',
    class: 'orientalNeMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgOrientalNEMinuscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het',
      'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'elongatedFinalMem',
      'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgSephardiSquare,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zayiin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf', 'finalKhaf', 'lamed',
      'mem', 'finalMem', 'elongatedFinalMem', 'nun', 'finalNun', 'samekh', 'ayin',
      'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgSephardiMinuscule,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het', 'tet',
      'yud', 'khaf', 'finalKhaf', 'lamed', 'elongatedLamed', 'mem', 'finalMem',
      'elongatedFinalMem', 'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh',
      'tsadi', 'finalTsadi', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi',
    class: 'sephardiCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgSephardiCursive,
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'memTwo',
      'finalMem', 'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi',
      'finalTsadi', 'quf', 'qufTwo', 'resh', 'shin', 'shinTwo', 'tav'
    ]
  },
  {
    name: 'Maghrebi',
    class: 'maghrebiSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgMaghrebiSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey', 'elongatedHey',
      'vav', 'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem',
      'finalMem', 'elongatedFinalMem', 'nun', 'finalNun', 'samekh', 'ayin',
      'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Maghrebi',
    class: 'maghrebiCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgMaghrebiCursive,
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'finalKhafTwo', 'lamed',
      'mem', 'finalMem', 'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh',
      'tsadi', 'finalTsadi', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Yemenite',
    class: 'yemeniteSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgYemeniteSquare,
    letters: [
      'alef', 'alefLamed', 'elongatedAlef', 'bet', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'elongatedHey', 'vav', 'zayiin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'finalKhaf', 'lamed', 'elongatedLamed',
      'mem', 'finalMem', 'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh',
      'tsadi', 'finalTsadi', 'quf', 'resh', 'elongatedResh', 'shin', 'tav'
    ]
  },
  {
    name: 'Yemenite',
    class: 'yemeniteMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgYemeniteMinuscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zayiin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf',
      'finalKhaf', 'lamed', 'elongatedLamed', 'mem', 'finalMem', 'elongatedFinalMem',
      'nun', 'finalNun', 'samekh', 'ayin', 'elongatedAyin', 'peh', 'finalPeh', 'tsadi',
      'finalTsadi', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgByzantineSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het', 'tet',
      'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'elongatedFinalMem',
      'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgByzantineMinuscule,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf',
      'lamed', 'mem', 'finalMem', 'elongatedFinalMem', 'nun', 'finalNun', 'samekh',
      'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine',
    class: 'byzantineCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgByzantineCursive,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav', 'zayiin',
      'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem',
      'elongatedFinalMem', 'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh',
      'tsadi', 'finalTsadi', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgItalianSquare,
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het', 'tet',
      'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun', 'finalNun',
      'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgItalianMinuscule,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin',
      'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun',
      'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi',
      'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian',
    class: 'italianCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgItalianCursive,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het',
      'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun', 'finalNun',
      'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi',
    class: 'ashkenaziSquare',
    type: KEYBOARD_TYPES.SQUARE,
    img: imgAshkenaziSquare,
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey',
      'vav', 'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed',
      'mem', 'finalMem', 'elongatedFinalMem', 'nun', 'finalNun', 'samekh', 'ayin',
      'peh', 'finalPeh', 'tsadi', 'finalTsadi', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Ashkenazi',
    class: 'ashkenaziMinuscule',
    type: KEYBOARD_TYPES.MINUSCULE,
    img: imgAshkenaziMinuscule,
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zayiin', 'het', 'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem',
      'nun', 'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi',
    class: 'ashkenaziCursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: imgAshkenaziCursive,
    letters: [
      'alef', 'bet', 'betTwo', 'gimmel', 'dalet', 'hey', 'vav', 'zayiin', 'het',
      'tet', 'yud', 'khaf', 'finalKhaf', 'lamed', 'mem', 'finalMem', 'nun',
      'finalNun', 'samekh', 'ayin', 'peh', 'finalPeh', 'tsadi', 'finalTsadi',
      'quf', 'resh', 'shin', 'tav'
    ]
  }
];

export { KEYBOARD_TYPES, KeyboardOptions };
