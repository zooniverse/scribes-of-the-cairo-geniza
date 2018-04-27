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

import ContentIntroEn from './content-intro-en.jsx';
import ContentIntroHe from './content-intro-he.jsx';
import ContentIntroAr from './content-intro-ar.jsx';

import ContentGenizaEn from './content-geniza-en.jsx';
import ContentGenizaHe from './content-geniza-he.jsx';
import ContentGenizaAr from './content-geniza-ar.jsx';

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

function AboutLayout({ translate, currentLanguage, rtl }) {
  return (
    <div className={(rtl) ? 'about-page rtl' : 'about-page'}>
      <section>
        {/*
        Section: Intro
        --------------------------------
        */}
        <div className="about-page__intro">
          <h2>{translate('topNav.about')}</h2>
          <hr className="plum-line" />
          {(() => { switch (currentLanguage) {
            case 'he': return (<ContentIntroHe />);
            case 'ar': return (<ContentIntroAr />);
            default: return (<ContentIntroEn />);
          }})()}
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
          {(() => { switch (currentLanguage) {
            case 'he': return (<ContentGenizaHe />);
            case 'ar': return (<ContentGenizaAr />);
            default: return (<ContentGenizaEn />);
          }})()}
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Research Partners
        --------------------------------
        */}
        <div className="about-page__research-partners subsection">
          <a id="partners" />
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
          <a id="provenance" />
          <h2>Provenance</h2>
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
          <a id="team" />
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
  currentLanguage: PropTypes.string,
  translate: PropTypes.func,
  rtl: PropTypes.bool,
};

AboutLayout.defaultProps = {
  currentLanguage: '',
  translate: () => {},
  rtl: false,
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale),
  rtl: state.languages.rtl,
});

export default connect(mapStateToProps)(AboutLayout);
