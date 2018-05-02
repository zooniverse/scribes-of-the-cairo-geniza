import React from 'react';

const imgPhase1Workflow = require('../../images/about-phase-1-workflow-he.png');

function Content() {
  return (
    <div className="content">
      <nav>
        <ul>
          <li><a href="#geniza">About the Geniza</a></li>
          <li><a href="#partners">About the Research Partners</a></li>
          <li><a href="#provenance">Provenance</a></li>
          <li><a href="#team">About the Team</a></li>
        </ul>
      </nav>
      <p className="big text">פרויקט Scribes of the Cairo Geniza שואף ליצירת תעתיקים של קטעי גניזת קהיר, לשם יצירת זמינות מלאה של הטקסטים הללו. זהו פרי שיתוף הפעולה של זוניברס (Zooniverse), פלטפורמת שיתוף ההמונים הגדולה בעולם, יחד עם ספריות אוניברסיטת פנסילבניה, מעבדת הגניזה של פרינסטון, מעבדת אליהו והמרכז לחקר הגניזה באוניברסיטת חיפה, וכן ספריית בית המדרש לרבנים בניו יורק, יחידת חקר הגניזה שבספריית אוניברסיטת קיימברידג' וספריית אוניברסיטת מנצ'סטר. יחד אנו רותמים את הטכנולוגיה לשם פענוחם של כתבי יד מהמאתגרים ביותר לקריאה.</p>
      <p className="text">בשלב הראשון של הפרויקט, ביקשנו את עזרת הציבור בסיווגם הראשוני של קטעי הגניזה. התבקשתם לציין האם הקטע כתוב בכתב עברי, ערבי, או שניהם יחד. כמו כן התבקשתם לציין האם סגנון הכתיבה פורמלי או לא פורמלי, ולאתר מספר מאפיינים המרמזים על הסוגה הספרותית אליה השתייכו הקטעים, קודש או חול.</p>
      <div className="diagram">
        <img src={imgPhase1Workflow} />
        <span className="caption">Phase One Workflow</span>
      </div>
      <p className="text">עתה הגענו לשלב השני של הפרויקט, שלב ההעתקות. מטרות השלב השני הן:</p>
      <ol className="text">
        <li>חשיפת קטעי הגניזה לציבור הרחב ויצירת פלטפורמה המאפשרת למתנדבים לעיין בהם ולפענחם</li>
        <li>סיווגם של קטעי הגניזה על פי תוכנם וסוג כתב היד שלהם</li>
        <li>יצירת תעתיקים של כתבי הגניזה, שיקדמו את מחקריהם של חוקרי מדעי היהדות, היסטוריונים, ושאר חוקרי הגניזה. תוצרי הפרויקט יהיו נגישים לציבור דרך OPenn  ודרך ערוצים אחרים בעתיד.</li>
      </ol>
      <p className="text">והערה לגבי מקלדות סוגי הכתב. ממשקי המקלדות לתעתוק כתב עברי ולתעתוק כתב ערבי שונים מאוד זה מזה. הידע שבידינו מאפשר טיפולוגיה מפותחת לכתב העברי, מה שאין כן לכתב הערבי. בנוסף, הליגטורות (חיבור האותיות זו לזו) האופייניות לכתב הערבי מקשות על האבחנה בין האותיות במילה, במיוחד בקטעים הכתובים בסגנון לא פורמלי. לכן החלטנו לוותר על טיפולוגיות סוגי הכתב כפי שעשינו בכתב העברי, ותחת זאת בחרנו במקלדת של כתב צפון אפריקאי מודרני, בתוספת הליגטורה לאם-אליף והאפשרות לסמן את האותיות ت ب ث ללא הניקוד הדיאקריטי, במקרים בהם איננו ברור. המקלדת שעל המסך מציגה גופן מצרי משנות העשרים, שנבחר בזכות האופן בו הוא מציג את ארבע גרסאות הכתיבה של כל אות (מבודדת, תחילית, אמצעית וסופית).</p>
      <p className="small text">Cohen, Mark R. "Geniza for Islamicists, Islamic Geniza, and the ‘New Cairo Geniza.’" Harvard Middle Eastern and Islamic Review 7 (2006): 129-45. Accessed December 5, 2017. <a href="http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza" target="_blank">http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza</a></p>
    </div>
  );
};

export default Content;