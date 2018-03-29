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
  }
};
