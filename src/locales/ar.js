export default {
  toolbar: {
    title: 'شريط الأدوات',
    addTranscription: 'بدء النسخ',
    pan: 'نقل القطعة',
    zoomIn: 'تكبير حجم الصورة',
    zoomOut: 'تصغير حجم الصورة',
    rotate: 'تدوير الصورة',
    invertColors: 'عكس الألوان',
    showHints: 'Show Keyword Hints',
    hideHints: 'Hide Keyword Hints',
    resetImage: 'إعادة تعيين الصورة',
    addFavorites: 'إضافة إلى المفضلة',
    addCollection: 'إضافة إلى مجموعة'
  },
  infoBox: {
    subjectInfo: 'معلومات الموضوع',
    name: 'اسم',
    attribution: 'مصدر',
    libraryCatalog: 'صفحة فهرس المكتبة',
    collapseName: 'إخفاء اسم و مصدر',
    expandName: 'إظهار اسم ومصدر',
    showCrib: 'إظهار ورقة مرجعية',
    hideCrib: 'إخفاء ورقة مرجعية',
    transcribeReverse: 'نسخ عكس الصفحة',
    transcribeFront: 'نسخ جبهة الصفحة',
    showGuide: 'إظهار معلومات إضافية',
    hideGuide: 'إخفاء معلومات إضافية',
    showTutorial: 'إظهار الدرس التعليمي ',
    hideTutorial: 'إخفاء الدرس التعليمي',
    saveProgress: 'حفظ التقدم',
    finished: 'تم الانتهاء'
  },
  transcribeBox: {
    title: 'نسخ',
    instructions: '.تتم قراءة اللغة العبرية من اليمين إلى اليسار، فبدأ على اليمين',
    instructions2: '.ستحقق أمثلة مختلفة من الأبجديات في الورقة المرجعية',
    textArea: 'محتوى مربع الكتابة',
    openKeyboard: 'إظهار لوحة المفاتيح',
    closeKeyboard: 'إخفاء لوحة المفاتيح',
    cancel: 'إلغاء',
    done: 'منجز'
  },
  collection: {
    title: 'إضافة إلى مجموعة',
    addTo: 'إضافة إلى مجموعة موجودة',
    search: 'أكتب لبحث المجموعات',
    add: 'إضافة',
    create: 'أو إنشاء مجموعة جديدة',
    name: 'اسم المجموعة',
    private: 'خاص'
  },
  topNav: {
    title: 'فوق - الملاحة',
    site: 'كتبة الجنيزا بالقاهرة',
    about: 'نبذة',
    transcribe: 'نسخ',
    talk: 'لوحة الرسائل',
    collect: 'تجميع'
  },
  scriptReferences: {
    title: 'ورقة مرجعية لخطوط',
    scriptTypes: 'أنواع الخط العبري',
    yourSheet: 'الورقة المرجعية الخاصة بكم',
    types: {
      orientalne: 'عراقي وإيراني',
      orientalsw: 'مصري وفلسطيني',
      maghrebi: 'مغربي',
      sephardi: 'سفاردي',
      yemenite: 'يمني',
      byzantine: 'بيزنطي',
      ashkenazi: 'أشكنازي',
      italian: 'إيطالي',
      square: 'مربع',
      miniscule: 'ضئيل',
      cursive: 'بالحروف المتصلة'
    },
    sendScript: 'إرسال الحروف إلى لوحة المفاتيح',
    currentScript: 'نوع الخط الحالي',
    back: 'الرجوع إلى لوحة المفاتيح',
    changeScript: 'تبديل الخط',
    changeInstructions: `
      تغيير نوع الخط لرؤية اختلافات في تشكيل حرف بناء على الموقع والفترة الزمنية
    `,
    filterBy: 'Filter Scripts By',
    cursive: 'بالحروف المتصلة',
    miniscule: 'ضئيل',
    square: 'مربع'
  },
  cribSheet: {
    title: 'ورقة مرجعية',
    instructions: `
      Use this crib sheet to save snippets for your personal reference.
      If you're signed in, the images will be saved throughout your time on
      this project.
    `,
    instructions2: ' ',
    addImage: 'إضافة صورة',
    clickAdd: 'انقر هنا لإضافة صورة أخرى',
    delete: 'حذف',
    edit: 'تصحيح',
    save: 'حذف',
    deletePrompt: '?هل تريد حذف هذا المقتطف',
    deletePrompt2: '.لا يمكن التراجع عن هذا الإجراء',
    cancel: 'لا، إلغاء ذلك',
    confirm: 'نعم، حذف',
    deny: 'No, continue transcribing'
  },
  helpers: {
    getStarted: 'تبدأ بالنقر على "إضافة النسخ"',
    click: 'انقر في بداية ونهاية سطر من النص لإضافة النسخ',
    draw: 'ارسم مربع حول جزء الصورة التي تريد حفظها'
  },
  fieldGuide: {
    title: 'المعلومات الإضافية'
  },
  finished: {
    title: 'تم الإنتهاء',
    allTranscribed: 'هل تم نسخ كل شيء؟',
    instructions: `
      هل تم نسخ كل سطر في هذه الوثيقة؟ لا تقلق إذا بقيت بعض السطور، نحن نشكرك لمساهمتك
    `,
    whenReady: `
      عندما تكون مستعداً، انقر على "تمام وتكلم" لمناقشة هذه الوثيقة مع فريق البحث للجنيزا بالقاهرة وزملائك المتطوعين، أو انقر على
      ."تمام" لإنتقال إلى الوثيقة التالية
    `,
    allComplete: 'نعم، جميع السطور كاملة',
    notFinished: 'لا، لم يتم نسخ بعض السطور',
    cancel: 'إلغاء',
    done: 'منجز',
    doneAndTalk: 'منجز و انتقل إلى لوحة الرسائل'
  },
  bios: {
    Laurie: {
      name: 'Laurie Allen',
      description: '.لوري ألين (Laurie Allen) مديرة الدراسات الرقمية بمكتبات جامعة بنسلفانيا'
    },
    Samantha: {
      name: 'Samantha Blickhan',
      description: `
        سامانثا بليكهان (Samantha Blickhan) زميلة ما بعد الدكتوراه في زونيفيرز (Zooniverse) وتبحث
        .أفضل الممارسات في النسخ بتعهيد جماعي
      `
    },
    Laura: {
      name: 'Laura Newman Eckstein',
      description: `
        لورا نومان إكستاين (Laura Newman Eckstein) منسّقة العلوم الإنسانية الرقمية للدراسات اليهودية
        .بالمكتبات لجامعة بنسلفانيا
      `
    },
    Doug: {
      name: 'Doug Emery',
      description: `
        دوغ إيمري (Doug Emery) مبرمج المحتوى الرقمي للمجموعات الخاصة في مركز كيسلاك (Kislak)
        .لمجموعات خاصة و الكتب و المخطوطات النادرة بجامعة بنسلفانيا
      `
    },
    Mitch: {
      name: 'Mitch Fraas',
      description: `
        ميتش فراس (Mitch Fraas) أمين المجموعات الخاصة في مركز كيسلاك (Kislak) لمجموعات خاصة و
        .الكتب و المخطوطات النادرة بجامعة بنسلفانيا
      `
    },
    Arthur: {
      name: 'Arthur Kiron',
      description: `
        آرثور كيران (Arthur Kiron) منسق مجموعات اليهودية ورئيس المكتبة في مركز هربرت د. كاتز (
        .Herbert D. Katz) للدراسات اليهودية المتقدمة، وأستاذ مساعد للتاريخ في جامعة بنسلفانيا
      `
    },
    Moshe: {
      name: 'Moshe Lavee',
      description: `
        موشيه لافي (Moshe Lavee) المدير المشارك لمختبر ليجا الإلكتروني للحصول على التعهيد الجماعي
        في الدراسات اليهودية، وبرنامج البكالوريوس في العلوم الإنسانية الرقمية ومركز متعدد التخصصات
        للبحوث جنيزا في جامعة حيفا. يدرّص موشيه التلمود و ميدراش في قسم التاريخ اليهودي في جامعة حيفا
        .وهو متخصص بميدراش من الجنيزا
      `
    },
    Eve: {
      name: 'Eve Krakowski',
      description: `
        إيف كراكوسكي (Eve Krakowski) أستاذة مساعدة لدراسات الشرق الأدنى في جامعة برينستون و
        .متخصصة بالجنيزا الوثائقية
      `
    },
    William: {
      name: 'William Noel',
      description: `
        ويليام نويل (William Noel) مدير مركز كيسلاك (Kislak) للمجموعات الخاصة والمخطوطات النادرة
        .ومعهد شونبرغ (Schoenberg) لدراسات المخطوطات في جامعة بنسلفانيا
      `
    },
    Vered: {
      name: 'Vered Raziel Kretzmer',
      description: `
        فيريد رازيئيل كريتزمر(Vered Raziel Kretzmer) منسقة مبادرة التعهيد الجماعي لجنيزا في مختبر
        ليجا الإلكتروني للحصول على التعهيد الجماعي في الدراسات اليهودية في جامعة حيفا. هي متخصصة
        .بالليتورجيا من الجنيزا
      `
    },
    Raha: {
      name: 'Raha Rafii',
      description: `
        رها رفيعي طالبة دكتوراه في قسم اللغات والحضارات في الشرق الأدنى بجامعة بنسلفانيا. هي متخصصة
        .في التاريخ والقانون الإسلامي في العصور الوسطى
      `
    },
    Becky: {
      name: 'Becky Rother',
      description: `
        بيكي روثر(Becky Rother) هي مصممة زونيقيرز(Zooniverse)، وتعمل مع فريق البحث
        .والمطورين زونيقيرز لخلق أفضل تجربة النسخ الممكنة
      `
    },
    Marina: {
      name: 'Marina Rustow',
      description: `
        مارينا روستو (Marina Rustow) هي أستاذة خدوري أ. زيلخا (Khedouri A. Zilkha) للحضارة
        اليهودية في الشرق الأوسط، أستاذة دراسات الشرق الأدنى والتاريخ في جامعة برينستون، ومتخصصة
        .بالجنيزا الوثائقية
      `
    }
  },
  specialThanks: {
    main: `
      بالإضافة إلى ذلك، شكر خاص وفضل للدكتورة جين باور، هال بلاكبورن، جسيكا دومر، تيموثي دانغيت،
      سكوت إندرلي، الذكورة جيسيكا غولدبرغ، ربيكا هيل، امي هاتشينز،  الدكتور ديفيد كريمر، الدكتورة نيتا
      كريفانس، كتي لينش، غاياتري ب. أوروغانتي، الدكتور بن أوثوايت، الدكتور كريغ بيري، بصان رضوان،
      .ياسمين شينوهارا، الدكتورة سمدار شتول، إيما ستانفورد، والدكتور أوديد زينغر لمساهمتهم
    `,
    additional: `
      وعلاوة على ذلك، شكراً للمؤسسات التالية لتقديم صور إضافية لهذا المشروع: مكتبة ولاية برلين، مكتبات
      .بودليان في جامعة أكسفورد، المكتبة البريطانية ، والمكتبة الوطنية في إسرائيل
    `
  },
  textModifiers: {
    insertion: '‏إضافة',
    deletion: 'حذف',
    damaged: 'عطل',
    drawing: '‏رسمة',
    grid: 'شبكة'
  }
};
