const KEYBOARD_TYPES = {
  CURSIVE: 'cursive',
  MINISCULE: 'miniscule',
  SQUARE: 'square'
};

const KeyboardOptions = [
  {
    name: 'Ashkenazi Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/ashkenazi-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Ashkenazi Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/ashkenazi-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Ashkenazi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/ashkenazi-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/byzantine-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/byzantine-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/byzantine-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/italian-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/italian-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/italian-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Maghrebi Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/maghrebi-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Maghrebi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/maghrebi-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental NE Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/oriental-ne-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental NE Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/oriental-ne-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental SW Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/oriental-sw-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental SW Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/oriental-sw-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Sephardi Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/sephardi-cursive.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Sephardi Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/sephardi-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Sephardi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/sephardi-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/yemenite-miniscule.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/yemenite-square.jpg',
    letters: [
      'alef', 'alef2', 'alefLamed', 'elongatedAlef', 'bet', 'bet2', 'gimmel', 'dalet',
      'elongatedDalet', 'hey', 'hey2', 'elongatedHey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'khafSofit2', 'lamed', 'elongatedLamed',
      'mem', 'mem2', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'quf2', 'resh', 'elongatedResh',
      'shin', 'shin2', 'tav', 'elongatedTav'
    ]
  }
];

export { KEYBOARD_TYPES, KeyboardOptions };
