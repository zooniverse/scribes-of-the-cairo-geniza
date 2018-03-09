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
      'alef', 'bet', 'betTwo', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/ashkenazi-miniscule.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Ashkenazi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/ashkenazi-square.jpg',
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey',
      'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed',
      'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/byzantine-cursive.jpg',
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit',
      'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Byzantine Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/byzantine-miniscule.jpg',
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit',
      'lamed', 'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh',
      'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Byzantine Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/byzantine-square.jpg',
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Italian Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/italian-cursive.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Italian Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/italian-miniscule.jpg',
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Italian Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/italian-square.jpg',
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Maghrebi Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/maghrebi-cursive.jpg',
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'khafSofitTwo', 'lamed',
      'mem', 'memSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Maghrebi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/maghrebi-square.jpg',
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey', 'elongatedHey',
      'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem',
      'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'elongatedResh',
      'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Oriental NE Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/oriental-ne-miniscule.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit',
      'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental NE Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/oriental-ne-square.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Oriental SW Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/oriental-sw-cursive.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het',
      'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun', 'nunSofit',
      'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh',
      'shin', 'tav'
    ]
  },
  {
    name: 'Oriental SW Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/oriental-sw-square.jpg',
    letters: [
      'alef', 'elongatedAlef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin',
      'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memSofit', 'nun',
      'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf',
      'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi Cursive',
    type: KEYBOARD_TYPES.CURSIVE,
    img: '../images/keyboards/sephardi-cursive.jpg',
    letters: [
      'alef', 'alefTwo', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'heyTwo', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'khafSofit', 'lamed', 'mem', 'memTwo',
      'memSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit', 'tsadi',
      'tsadiSofit', 'quf', 'qufTwo', 'resh', 'shin', 'shinTwo', 'tav'
    ]
  },
  {
    name: 'Sephardi Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/sephardi-miniscule.jpg',
    letters: [
      'alef', 'bet', 'gimmel', 'dalet', 'hey', 'vav', 'zaylin', 'het', 'tet',
      'yud', 'khaf', 'khafSofit', 'lamed', 'elongatedLamed', 'mem', 'memSofit',
      'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin', 'peh', 'pehSofit',
      'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav'
    ]
  },
  {
    name: 'Sephardi Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/sephardi-square.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'hey', 'elongatedHey', 'vav',
      'zaylin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf', 'khafSofit', 'lamed',
      'mem', 'memSofit', 'elongatedMemSofit', 'nun', 'nunSofit', 'samekh', 'ayin',
      'peh', 'pehSofit', 'tsadi', 'tsadiSofit', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite Miniscule',
    type: KEYBOARD_TYPES.MINISCULE,
    img: '../images/keyboards/yemenite-miniscule.jpg',
    letters: [
      'alef', 'alefLamed', 'bet', 'gimmel', 'dalet', 'elongatedDalet', 'hey',
      'elongatedHey', 'vav', 'zaylin', 'het', 'tet', 'yud', 'khaf', 'elongatedKhaf',
      'khafSofit', 'lamed', 'elongatedLamed', 'mem', 'memSofit', 'elongatedMemSofit',
      'nun', 'nunSofit', 'samekh', 'ayin', 'elongatedAyin', 'peh', 'pehSofit', 'tsadi',
      'tsadiSofit', 'quf', 'resh', 'shin', 'tav', 'elongatedTav'
    ]
  },
  {
    name: 'Yemenite Square',
    type: KEYBOARD_TYPES.SQUARE,
    img: '../images/keyboards/yemenite-square.jpg',
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
