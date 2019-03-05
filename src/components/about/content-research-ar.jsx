import React from 'react';

import ImgElijah from '../../images/partners/elijah.png';
import GenizahCentre from '../../images/partners/genizah-centre.png';
import ImgPenn from '../../images/partners/penn.png';
import ImgPrinceton from '../../images/partners/princeton.png';
import ImgZooniverse from '../../images/partners/zooniverse-word-black.png';

function Content() {
  return (
    <div className="content">
      <div className="item">
        <div className="right-column">
          <img alt="Penn" src={ImgPenn} />
        </div>
        <h3>جامعة بنسلفانيا</h3>
        <p className="text">
        تخدم مكتبات جامعة بنسلفانيا أعضاء هيئات التدريس ذوي المكانة العالمية والطلاب في كلياتها الاثنتي عشرة. تتضمن مجموعاتها أكثر
        من 7 ملايين مجلد وأكثر من 100,000 مجلة وحوالي مليوني صورة رقمية بالإضافة إلى مواد جد نادرة وفريدة توثق الخبرة الفكرية والثقافية للحضارات القديمة والحديثة. من خلال علاقاتنا التعاونية ندعم المجموعات المحلية الرائعة للجامعة بالنفاذ المادي إلى مركز
المكتبات البحثية (حوالي 5 ملايين عنصر) والحيازات المشتركة لمؤسسات إيفي (أكثر من 70 مليون

بالإضافة إلى (HathiTrust)والنفاذ الإلكتروني الحصري إلى حوالي مليونين من العناوين في المجال العام ل
اليوم تلعب المكتبات دوراً أساسياً في تطوير التكنولوجيات الحديثة لكشف المعلومة ونشرها وهي معروفة بعملها الرائد في التصميم الرقمي. لمعرفة المزيد عن مكتبات جامعة بنسلفانيا، قم بزيارة:
        <a href="http://www.library.upenn.edu" rel="noopener noreferrer" target="_blank">http://www.library.upenn.edu.</a></p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="Princeton" src={ImgPrinceton} />
        </div>
        <h3>Princeton</h3>
        <p className="text">
          إن مختبر برينستون للجنيزا هو مساحة تعاونية مكرسة لجعل النصوص الوثائقية لجنيزا القاهرة من رسائل ووثائق قانونية وقوائم وحسابات وغيرها متاحة للعلماء والجمهورالعريض. نجمع فرقا من طلاب المرحلة الأولى ومرحلة الدراسات العليا وما بعد الدكتوراه وأعضاء هيئات التدريس والباحثين الدوليين لوصف ونسخ وترجمة الوثائق ولإدارة ورشات العمل والمؤتمرات والاجتماعات قصدا لمناقشة التاريخ الوثائقي في جميع أنحاء أوراسيا (Eurasia) والعلوم الإنسانية الرقمية والتعلم في إطار مختبري في مجال العلوم الإنسانية والتاريخ الوسيط للشرق الأوسط. قاعدة بياناتنا الرئيسية على الانترنت تحمل اسم مشروع برينستون للجنيزا
          <a href="http://geniza.princeton.edu/newpgp/princetongenizaproject" rel="noopener noreferrer" target="_blank">http://geniza.princeton.edu/newpgp/princetongenizaproject</a>
        </p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="The e-Lijah Lab at the University of Haifa" src={ImgElijah} />
          <img alt="The Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa" src={GenizahCentre} />
        </div>
        <h3>e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa</h3>
        <p className="text">
          مختبر ليجا الإلكتروني (e-Lijah) ومركز البحوث متعدد الإختصاصات في جنيزا القاهرة بجامعة حيفا
          e-Lijah (التعلم الإلكتروني في مجال الدراسات اليهودية بحيفا) هو مختبر إلكتروني للعلوم الإنسانية يهدف إلى تطوير وتنفيذ مشاريع العلوم المواطنية والتعهيد الجماعي في العلوم الإنسانية. يغطي المختبر الفترة الزمنية الممتدة من العصور القديمة إلى العصر الحديث ويشتمل على وسائل واختصاصات متنوعة تشمل المصادر التاريخية والمكانية والنصية والأدبية والبصرية.
          يتبع المختبر نموذج ثلاثي العناصر للعلوم المواطنية. كل مشروع في المختبر ملتزم بتطوير منصة إلكترونية وإنشاء نشاط تربوي أو غيره من الأنشطة العامة لضمان تواجد حيوي لمجموعة من المتبرعين ولإنجاز بحوث انطلاقا من المساهمات العامة للجمهور.
        </p>
        <p className="text">
          أسس المختبر كتوسعة لمركز حيفا لبحوث الجنيزا وخصص للبحوث متعددة الإختصاصات في مجال الجنيزا ولتطبيق لبحوث الجنيزا على نطاق أوسع بمعنى الوصول إلى دوائر جديدة من مستخدمي الجنيزا كالباحثين في المجلات ذات الصلة وفروع التعليم المختلفة والجمهور العريض ككل. زوروا موقعنا الألكتروني:
          <a href="http://genizah.haifa.ac.il/index.php?lang=en" rel="noopener noreferrer" target="_blank">http://genizah.haifa.ac.il/index.php?lang=en</a>
        </p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="The Zooniverse" src={ImgZooniverse} />
        </div>
        <h3>The Zooniverse</h3>
        <p className="text">
          الزونيفرس هي أكبر وأشهر منصة للبحث المدعوم من الجمهور. في سنة 2016 تحصل زونيفرس على منحة وطنية للقيادة من أجل تمويل مشروع "تحويل المكتبات والأرشيف عن طريق التعهيد الجماعي" وهو عبارة عن شراكة بين أعضاء فريق زونيفرس المتواجدين في القبة الفلكية أدلر في شيكاغو وفي جامعة أكسفورد. هذا المجهود سيدعم قدرات المكتبات والأرشيف في جميع أنحاء البلد على استعمال تقنيات التعهيد الجماعي   للتفاعل مع الجمهور ولتحسين الوصول إلى المجموعات الرقمية عبر زونيفرس. للمزيد من المعلومات عن مشروع البحث يرجى اتباع هذا
          <a href="http://www.dlib.org/dlib/may17/vanhyning/05vanhyning.html" target="_blank" rel="noopener noreferrer">الرابط.</a>
           ولمزيد من المعلومات عن زونيفرس يرجى النقر هنا
          <a href="https://www.zooniverse.org/about" target="_blank" rel="noopener noreferrer">الرابط.</a>
        </p>
      </div>
    </div>
  );
}

export default Content;
