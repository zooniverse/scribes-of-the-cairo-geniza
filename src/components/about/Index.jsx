import React from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Connect from '../Connect';

import ImgBodleian from '../../images/partners/bodleian.png';
import ImgCambridge from '../../images/partners/cambridge.png';
import ImgElijah from '../../images/partners/Elijah.png';
import ImgGenizah from '../../images/partners/genizah.png';
import ImgJTS from '../../images/partners/jts.png';
import ImgManchester from '../../images/partners/manchester.png';
import ImgPenn from '../../images/partners/penn.png';
import ImgPrinceton from '../../images/partners/princeton.png';
import ImgZooniverse from '../../images/partners/zooniverse-word-black.png';

const imgPhase1Workflow_en = require('../../images/about-phase-1-workflow-en.png');
const members = {
  Laurie: require('../../images/team/LaurieAllen.jpg'),
  Samantha: require('../../images/team/SamanthaBlickhan.jpg'),
  Laura: require('../../images/team/LauraNewmanEckstein.jpg'),
  Doug: require('../../images/team/DougEmery.jpg'),
  Mitch: require('../../images/team/MitchFraas.jpg'),
  Arthur: require('../../images/team/ArthurKiron.jpg'),
  Raha: null,
  Moshe: require('../../images/team/MosheLavee.png'),
  Vered: require('../../images/team/VeredKretzmer.png'),
  Eve: require('../../images/team/EveKrakowski.jpg'),
  William: require('../../images/team/WilliamNoel.jpg'),
  Becky: require('../../images/team/BeckyRother.jpg'),
  Marina: require('../../images/team/MarinaRustow.jpg')
};

function AboutLayout({ translate }) {
  return (
    <div className="about-page">
      <section>
        {/*
        Section: Intro
        --------------------------------
        */}
        <div className="about-page__intro">
          <h2>{translate('topNav.about')}</h2>
          <hr className="plum-line" />
          <div className="content">
            <nav>
              <ul>
                <li><a href="#geniza">About the Geniza</a></li>
                <li><a href="#partners">About the Research Partners</a></li>
                <li><a href="#provenance">Provenance</a></li>
                <li><a href="#team">About the Team</a></li>
              </ul>
            </nav>
            <p className="big text">Scribes of the Cairo Geniza is a project with the ultimate goal of transcribing Cairo Geniza fragments. With an in-kind grant from the Zooniverse, the largest crowdsourcing platform in the world, along with institutional and image partners from The University of Pennsylvania Libraries, The Princeton Geniza Lab, The e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa, the Library of the Jewish Theological Seminary, the Genizah Research Unit at Cambridge University Library, and The University of Manchester Library we are harnessing the power of technology to decipher some of the most difficult to read fragments in the world.</p>
            <p className="text">Before we could ask our volunteers to transcribe, we needed more information about the fragments themselves. We created Phase I to gather this information. In the first phase of the project we asked our community of volunteer humanists and historians to sort Cairo Geniza fragments into groups based on whether they were in Hebrew, Arabic, or both types of scripts. We also asked whether the scripts were written in an informal or formal style and about a few other visual characteristics that hinted at whether the fragment was religious or non-religious in genre.</p>
            <div className="diagram">
              <img src={imgPhase1Workflow_en} />
              <span className="caption">Phase One Workflow</span>
            </div>
            <p className="text">Now we are at the point of the transcription phase, or Phase II.The goal of phase II is to:</p>
            <ol className="text">
              <li>Provide our community of volunteer humanists and historians opportunities to view and decipher Cairo Geniza fragments;</li>
              <li>Contribute to the classification of fragments by script-type and content;</li>
              <li>Produce transcriptions of the material that will help in the work of historians, linguists and other scholars of this material. This material will be available in the future through OPenn and as open data through other sources.</li>
            </ol>
            <p className="text">A note about the keyboards: The keyboards in the Arabic and Hebrew transcription interfaces look very different. This is due to the fact that we can typologize Hebrew script in a way we cannot do with Arabic scripts. In addition, the ligatures (the way letters connect to each other in Arabic script) makes it difficult to differentiate one letter from another in a word, particularly when it is written in an informal script. With these factors in mind it didn’t make sense to offer a keyboard with typologies like we did for Hebrew scripts. Instead we adapted a modern North African keyboard, adding the lam alif character as a part of the standard keyboard as well as the  ت ب ث character without the dots, as it may be difficult to tell which letter it is. We adapted the keyboard you see on screen from the keyboard of a 1920s Egyptian typewriter. We particularly appreciated the way it showcases each letter’s different forms (isolated, initial, medial, and final).</p>
            <p className="small text">Cohen, Mark R. "Geniza for Islamicists, Islamic Geniza, and the ‘New Cairo Geniza.’" Harvard Middle Eastern and Islamic Review 7 (2006): 129-45. Accessed December 5, 2017. <a href="http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza" target="_blank">http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza</a></p>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: About the Geniza
        --------------------------------
        */}
        <div className="about-page__geniza subsection">
          <a id="geniza" />
          <h2>About the Geniza</h2>
          <hr className="small plum-line" />
          <div className="content">
            <p className="text">The discarded fragments of pre-modern manuscripts from the Cairo Geniza constitute a rich, still relatively untapped source for the history of the Mediterranean and Islamic world and its Jewish diaspora. This corpus of sacred and everyday texts, including documents such as personal letters and legal contracts, were preserved in an attic chamber of the Ben Ezra synagogue in Fustat, the medieval residential core of which later became part of the the city of Cairo.</p>
            <p className="text">Virtually all scholars who have studied these texts have come away with a transformed sense of the history of the region and the intimate ties that bound together its people. The Geniza corpus, which dates mostly from the 10th-13th centuries CE, is now widely recognized as the most important documentary source for reconstructing the lives of Jews and other inhabitants of the premodern Mediterranean. Thanks to the work of scholars and librarians over the last 120 years, almost one-quarter of the 350,000 items from the cache have been cataloged and nearly all have been digitized. Now that these fragments are digitally available and accessible, we need our community of volunteer humanists and historians like you to help us transcribe them. No matter your language ability, you can help us unlock this immense treasure-trove of fragments -- a task now ready to be scaled up thanks to people-powered research.</p>
            <p className="text">A geniza is a temporary storeroom or repository for old, used, and/or damaged Torah scrolls and other texts regarded as sacred in the Jewish tradition. The practice of not throwing away such documents is based on the sanctity imputed to them because they contain a written form of God’s name in Hebrew characters. Jewish custom dictates that these sacred writings be treated respectfully and buried when no longer in use. For reasons not entirely clear, Jews affiliated with the Ben Ezra synagogue kept their used texts in their Geniza chamber for nearly a millennium rather than burying them. There are similar practices of storing documents among Muslims and Christians across the Islamic world, as exemplified for example in the Sana'a manuscripts rediscovered in the attic of the Great Mosque of Sana'a during a 1972 renovation, but the Cairo Geniza is the largest cache of such stored documents.</p>
            <p className="text">The Cairo Geniza corpus includes both traditional religious, philosophical, and scientific texts (often termed the “literary” Geniza), and a wide range of everyday documents, such as letters, tax rolls, contracts, legal testimonies and other court documents, receipts, accounts and lists, known collectively as the “documentary” geniza. The survival of documents in the Cairo Geniza is of exceptional importance today because of what these fragmentary remains can teach us about the everyday lives of medieval Jews, Christians and Muslims and the relationships among them. The literary and documentary fragments together also offer unexpectedly fine-grained information about the historical context in which most of them were written and circulated: Cairo during the Fatimid and Ayyubid periods, one of the most important cultural and economic centers of its day.</p>
            <p className="text">Beginning in the Renaissance, European diplomats, scholars, and travelers to the Middle East and North Africa generated a vibrant antiquities market as they actively sought and purchased texts and artifacts to bring home with them for study or to add to their personal libraries. During the 19th century, the contents of the Cairo Geniza began to draw attention when assorted fragments began to come up for sale. Orientalists, traders, collectors, and scholars amassed these fragments for their own collections. Today, Cairo Geniza fragments can be found in collections from throughout the world. To learn about the history of the collections the fragments you are transcribing come from, click here or scroll down.</p>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Research Partners
        --------------------------------
        */}
        <div className="about-page__research-partners subsection">
          <h2>About the research partners</h2>
          <hr className="small plum-line" />
          <div className="content">
            <div className="item">
              <div className="right-column">
                <img alt="Penn" src={ImgPenn} />
              </div>
              <h3>Penn</h3>
              <p className="text">The Penn Libraries serve the world-class faculty and students of Penn’s 12 schools. The Libraries’ collections comprise more than 7 million volumes, over 100,000 journals, some 2 million digitized images, and extraordinary rare and unique materials that document the intellectual and cultural experience of ancient and modern civilizations. Through our collaborative relationships, we supplement Penn’s great local collections with physical access to the Center for Research Libraries (approximately 5 million items), the combined holdings of the Ivies (more than 70 million volumes), and exclusive electronic access to some 2 million public domain titles in the HathiTrust. Today, the Libraries play an instrumental role in developing new technologies for information discovery and dissemination and are noted for groundbreaking work in digital library design. To learn more about the Penn Libraries, visit <a href="http://www.library.upenn.edu" target="_blank">http://www.library.upenn.edu.</a></p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="Princeton" src={ImgPrinceton} />
              </div>
              <h3>Princeton</h3>
              <p className="text">The Princeton Geniza Lab is a collaborative space devoted to making the documentary texts of the Cairo Geniza — letters, legal documents, lists, accounts and other ephemera — accessible to scholars and the wider public. We organize teams of undergraduates, graduate students, post-docs, faculty and international researchers to describe, transcribe and translate the documents, and run workshops, conferences and meetings to discuss documentary history across Eurasia, digital humanities, laboratory-style learning in the humanities and the history of the medieval Middle East. Our main online database is the <a href="http://geniza.princeton.edu/newpgp/princetongenizaproject" target="_blank">Princeton Geniza Project.</a></p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa" src={ImgElijah} />
              </div>
              <h3>e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa</h3>
              <p className="text">e-Lijah (eLearning in Jewish studies at Haifa) is a Digital Humanities lab aimed at developing and implementing citizen science and crowdsourcing projects in the Humanities. The lab covers along chronological span from Antiquity to the modern era and a variety of medias and disciplines including historical, spatial, textual, literary and visual sources.</p>
              <p className="text">The lab follows a triple elements model for citizen science. Each project in the lab is committed to the development of a web platform, the establishing of educational or other public activity for assuring a vital community of contributors and exercising research based on the fruits of public contributions.</p>
              <p className="text">The Lab was founded as an extension of the Haifa Genizah Research Center, devoted to multidisciplinary research in field of the Genizah, and to the wider application of Genizah Research, namely outreach for new circles of Genizah users : scholars in adjacent fields, various strands of education and the wider public as a whole. Visit our website: <a href="http://genizah.haifa.ac.il/index.php?lang=en" target="_blank">http://genizah.haifa.ac.il/index.php?lang=en</a></p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="The Zooniverse" src={ImgZooniverse} />
              </div>
              <h3>The Zooniverse</h3>
              <p className="text">The Zooniverse is the world’s largest and most popular platform for people-powered research. In 2016, the Zooniverse received a National Leadership Grant to fund the “Transforming Libraries and Archives through Crowdsourcing” project, a partnership between Zooniverse team members based at the Adler Planetarium in Chicago and at the University of Oxford. This effort will greatly expand the capacity for libraries and archives across the country to use crowdsourcing techniques to engage with audiences and improve access to digital collections through the Zooniverse. For more information about the research project, please click <a href="http://www.dlib.org/dlib/may17/vanhyning/05vanhyning.html">here.</a> For more information about the Zooniverse, please click <a href="https://www.zooniverse.org/about" target="_blank">here.</a></p>
            </div>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Image Partners
        --------------------------------
        */}
        <div className="about-page__image-partners subsection">
          <h2>Image Partners</h2>
          <hr className="small plum-line" />
          <div className="content">
            <div className="item">
              <img alt="Cambridge" src={ImgCambridge} />
            </div>            
            <div className="item">
              <img alt="JTS" src={ImgJTS} />
            </div>
            <div className="item">
              <img alt="Penn" src={ImgPenn} />
            </div>
            <div className="item">
              <img alt="Manchester" src={ImgManchester} />
            </div>
            <div className="item">
              <img alt="Bodleian" src={ImgBodleian} />
            </div>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Provenance
        --------------------------------
        */}
        <div className="about-page__research-partners subsection">
          <h2>About the research partners</h2>
          <hr className="small plum-line" />
          <div className="content">
            <div className="item">
              <div className="right-column">
                <img alt="Penn" src={ImgPenn} />
              </div>
              <h3>Penn</h3>
              <p className="text">The Penn Libraries’ collection of more than 600 medieval manuscript fragments from the Cairo Genizah are based on two sources. The largest part comes from the Library of Dropsie College, the first institution in the world accredited to confer doctoral degrees in Judaic Studies.  According to the internal library records of the College as well as Ben Zion Halper’s Descriptive Catalogue of Genizah Fragments in Philadelphia (1924), the Dropsie holdings derive from gifts made by Cyrus Adler, David W.  Amram, Herbert Friedenwald, Ephraim Lederer, and Mayer Sulzberger, and from a purchase from the widow of Camden M. Cobern, who died in 1920.  Halper classified the fragments into seven subject areas: Bible, Midrash and Talmud, Liturgy, Secular Poetry, Documents and Letters, Philosophy and Kabbalah, and Miscellaneous items.  In 1986, Dropsie was transformed into a post-doctoral research institute called the Annenberg Research Institute (ARI) and later merged with Penn in 1993. In September of 1986, shortly after the establishment of the ARI, an additional small group of fragments were donated to the ARI by Jack Lunzer on behalf of the Board of the Valmadonna Trust.  In 1994, the Dropsie Genizah collection came under the management of the Penn Libraries, joining a second, pre-existing collection of Cairo genizah fragments held at the University of Pennsylvania Libraries’ Rare Book and Manuscript Library, today known as the Kislak Center for Special Collections, Rare Books and Manuscripts. <a href="http://openn.library.upenn.edu/html/genizah_contents.html" target="_blank">http://openn.library.upenn.edu/html/genizah_contents.html</a></p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="JTS" src={ImgJTS} />
              </div>
              <h3>JTS</h3>
              <p className="text">The Library of the Jewish Theological Seminary’s holdings of approximately 43,000 Cairo Genizah fragment leaves mainly derived from the acquisition of the collection of Elkan Nathan Adler in 1923.    Adler, in his description of his Hebrew manuscript collections, states that he obtained them in Cairo on trips he made there between 1888 and 1901. Additional fragments were acquired after his death in 1946. The collection was digitally photographed by Ardon bar-Hama and Dwight Primiano, with the philanthropic support of George Blumenthal and a grant from NEH. The collection is temporarily on loan to Princeton University for study while the Seminary builds a new library at its home in New York City.</p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="Cambridge" src={ImgCambridge} />
              </div>
              <h3>Cambridge</h3>
              <p className="text">In 1896–97 the Cambridge scholar, Dr. Solomon Schechter, with financial help from the Master of St. John’s College, Charles Taylor, arrived in Fustat to examine the Genizah. He received permission from the Jewish community of Egypt to take away what he liked (explaining later, ‘I liked it all’), and he brought 193,000 manuscripts back to Cambridge, where they form the Taylor-Schechter Cairo Genizah Collection (T-S Collection).</p>
              <p className="text">Alongside the T-S Collection, Cambridge University Library is also now the home of the Jacques Mosseri Genizah Collection. Assembled by the successful Cairene businessman, Jacques (Jack) Mosseri in the first decade of the twentieth century, these manuscripts were intended to remain in Egypt as part of the Jewish community’s cultural heritage. However, after Mosseri’s premature death in 1934 and his family’s subsequent departure from Egypt, his eponymous collection disappeared from scholarly view until the 1970s, when it was microfilmed by a team from the Jewish National and University Library. Following recent discussions with members of the Mosseri family, in 2006 this 7000-fragment collection came to Cambridge University Library on a 20-year loan. During its stay in Cambridge, the Mosseri Collection will be conserved and digitised, and a new, detailed catalogue produced.</p>
              <p className="text">At the moment, over 18,000 manuscripts from across the Taylor-Schechter, CUL Or. and Jacques Mosseri Collections are available online, including a substantial number of documents (letters and legal deeds) and liturgical texts (the fruits of a joint project with Ben Gurion University). More manuscripts will be added on a regular basis, until the entire Cambridge Genizah Collection is online.</p>
              <p className="text"><a href="https://cudl.lib.cam.ac.uk/collections/genizah/1" target="_blank">https://cudl.lib.cam.ac.uk/collections/genizah/1</a></p>
            </div>
            
            <div className="item">
              <div className="right-column">
                <img alt="Manchester" src={ImgManchester} />
              </div>
              <h3>Manchester</h3>
              <p className="text">The University of Manchester Library holds a collection of nearly 15,000 fragments, mostly written in Hebrew and Judeo-Arabic, from the Genizah of the Ben Ezra Synagogue in Old Cairo, purchased from the estate of Dr. Moses Gaster in 1954. About 90% of the items are on paper, the remainder on parchment. The vast majority are very small fragments. They date from the 10th to the 19th century AD and include religious and literary texts, documentary sources, letters, and material relating to grammar, philosophy, medicine, astrology and astronomy. Please visit: <a href="http://www.rylandsgenizah.org" target="_blank">http://www.rylandsgenizah.org</a> for further information about the University of Manchester Genizah Collection.</p>
            </div>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Team
        --------------------------------
        */}
        <div className="about-page__team subsection">
          <h2>The team</h2>
          <div className="about-page__members">
            {Object.keys(members).map((key, i) => {
              return (
                <div key={`team-member-${i}`}>
                  {members[key] && (
                    <img alt={key} src={members[key]} />
                  )}
                  <hr className="plum-line" />
                  <div>
                    <h3>{translate(`bios.${key}.name`)}</h3>
                    <span>{translate(`bios.${key}.description`)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="big plum-line" />
          <div className="about-page__thanks">
            <h3>Special thanks</h3>
            <span>{translate('specialThanks.main')}</span>
            <span>{translate('specialThanks.additional')}</span>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        <Connect />
      </section>
    </div>
  );
}

AboutLayout.propTypes = {
  translate: PropTypes.func
};

AboutLayout.defaultProps = {
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(AboutLayout);
