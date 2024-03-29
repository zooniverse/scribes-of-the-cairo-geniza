import React from 'react';

import imgPhase1Workflow from '../../images/about-phase-1-workflow-ar.png';

function Content() {
  return (
    <div className="content">
      <nav>
        <ul>
          <li><a href="#geniza">حول جنيزا</a></li>
          <li><a href="#partners">حول شركاء الأبحاث</a></li>
          <li><a href="#provenance">مصدر</a></li>
          <li><a href="#team">حول الفريق</a></li>
        </ul>
      </nav>
      <p className="big text">
        مشروع Scribes of the Cairo Geniza هو مشروع هدفه النهائي نسخ قطع جنيزا القاهرة. بفضل منحة عينية من زونيفرس (Zooniverse) وهي أكبر منصة لحشد المصادر في العالم بالإضافة إلى مؤسسات شريكة وشركاء في الصور من مكتبات جامعة بنسلفانيا ومختبر برنستن للجنيزا ومختبر ليجا الإلكتروني ومركز البحوث متعددة الإختصاصات لجنيزا القاهرة في جامعة حيفا ومكتبة كلية اللاهوت اليهودية ووحدة بحث الجنيزا في مكتبة جامعة كامبردج ومكتبة جامعة مانشستر نحن نسخّر قوة التكنولوجيا لفك رموز أكثر القطع صعوبة للقراءة في العالم.
      </p>
      <p className="text">
        قبل أن نطلب من متطوعينا القيام بالنسخ كنّا نحتاج إلى أكثر معلومات حول القطع في حد ذاتها ولهذا الغرض بدأنا المرحلة I لتجميع المعلومات. في هذه المرحلة طلبنا من جمهور المتطوعين الإنسانيين والمؤرخين فرز قطع جنيزا القاهرة ضمن مجموعات استنادا على ما إذا كانت مكتوبة بخط عبري أو عربي أو كليهما. كما طلبنا أن نعرف ما إذا كانت هذه الخطوط مكتوبة بأسلوب رسمي أو غير رسمي علاوة على بعض الخصائص البصرية التي تشير إلى ما إذا كانت القطع ذات طابع ديني أم لا.
      </p>
      <div className="diagram">
        <img src={imgPhase1Workflow} />
        <span className="caption">تصنيف سير العمل</span>
      </div>
      <p className="text">الآن نحن في مرحلة النسخ أو المرحلة الثانية والهدف منها هو:</p>
      <ol className="text">
        <li>توفير الفرص لامجموعة المتطوعة من الإنسانيين والمؤرخين للاطلاع ولفك رموز قطع جنيزا القاهرة</li>
        <li>المساهمة في تصنيف القطع حسب نوع الخط والمحتوى</li>
        <li>إنتاج نسخ من المواد مما سيسهل عمل المؤرخين واللغويين وغيرهم من الباحثين في هذا المجال. هذه المادة ستصبح متوفرة في المستقبل عبر OPenn وفي شكل بيانات مفتوحة عبر مصادر أخرى.</li>
      </ol>
      <p className="text">ملحوظة عن لوحات المفاتيح. تبدو لوحات المفاتيح في النسخ العربية والعبرية مختلفة جدا. يعود هذا الأمر إلى أنه يمكننا أن نصنف نمط الخط العبري بطريقة غير ممكنة مع الخطوط العربية. بالإضافة إلى ذلك الحروف المزدوجة (أو الطريقة التي تتصل فيها الحروف ببعض في الخط العربي) يجعل من الصعب أن نميز بين حرف وآخر في كلمة خاصة عندما تكون مكتوبة بخط غير رسمي. عندما أخذنا هذه العوامل بعين الإعتبار لم يعد من المجدي توفير لوحة مفاتيح تعمل بنفس النمط المتبع في الخطوط العبرية. عوضا عن ذلك كيّفنا لوحة المفاتيح الشمال إفريقية بإضافة الألف واللام كحرف ضمن لوحة المفاتيح الموحدة بالإضافة إلى حرف ب ت ث بدون نقاط نظرا لأنه قد يكون من الصعب التفريق بين هذه الحروف. لقد كيّفنا لوحة المفاتيح التي ترون على الشاشة انطلاقا من لوحة مفاتيح آلة كاتبة مصرية تعود إلى العشرينات وقد قدرنا بالخصوص الطريقة التي تعرض بها الأشكال المختلفة لكل حرف (منفصل وفي الأول وفي الوسط وفي الآخر).</p>
      <p className="small text">Cohen, Mark R. "Geniza for Islamicists, Islamic Geniza, and the ‘New Cairo Geniza.’" Harvard Middle Eastern and Islamic Review 7 (2006): 129-45. Accessed December 5, 2017. <a href="http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza" target="_blank" rel="noopener noreferrer">http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza</a></p>
    </div>
  );
};

export default Content;
