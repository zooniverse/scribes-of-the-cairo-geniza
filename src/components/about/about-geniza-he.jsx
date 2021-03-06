import React from 'react';
import { config } from '../../config';

function Content() {
  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <div>
      <span>
        גניזת קהיר היא אוסף של יותר מ-300,000 קרעי כתבי יד, כתובים על קלף או נייר. עד סוף המאה ה-19 נשמרו קטעי גניזה אלה בעליית הגג של בית הכנסת בן-עזרא שבקהיר העתיקה. 'גניזה' היא מקום אכסונם של כתבי קודש שהתבלו וספרות אחרת הכתובה עברית. על פי המסורת היהודית אין להשליכם, והם נאספים במקום אכסון זמני ומאוחר ויתר נקברים בבית הקברות. מסיבות לא ידועות, לא קברו יהודי קהיר את כתבי היד הבלויים שלהם. הם חרגו מהנוהל השכיח גם בכך שלצד ספרות קודש הם אכסנו בגניזה גם כתבים ומסמכים חסרי מעמד דתי. כך, שמורים סידורים, דפי תלמוד ומדרש ופרשנות מקרא לצד פרוטוקולים של בית דין, מכתבים ורשימות מקח וממכר. דפי ספרות הקודש שנשמרו בגניזה הם עדות נדירה באשר לספריה היהודית הימי ביינימית. מסמכי הגניזה הקהירית, המתוארכים ברובם למאות 10-13, נחשבים לאחד המקורות המרכזיים לחקר תרבותם של יהודי אגן הים התיכון וחיי הדת, החברה, הכלכלה והפוליטיקה שלהם, לצד אלו של בני תרבויות אחרות סביב הים התיכון בימי הביניים.
      </span>
      <span>
        בפרויקט זה, אנו מבקשים ממתנדבים לתעתק את קטעי הגניזה.
        <a href={`${classifyPath}${c.phaseOne}`} target="_blank" rel="noopener noreferrer">שלב הראשון</a>
        מסווגים הקטעים על מנת להקל על זיהויים והעתקתם. תעתוקם של קטעים אלה הוא חיוני למחקר, משום שטמון בהם הפוטנציאל לכתוב מחדש את ההיסטוריה והספרות של המזרח התיכון הימי ביניימי וקשריו עם האוקיינוס ההודי והתפוצה היהודית ברחבי העולם, כפי שהאירו קטעי הגניזה את עיניהם של כל החוקרים שעסקו בהם עד עתה.
      </span>
    </div>
  );
}

export default Content;
