import React from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Connect from '../Connect';
import Penn from '../../images/penn.png';
import JTSLogo from '../../images/jts_logo.png';
import Princeton from '../../images/princeton_geniza.png';
import Genizah from '../../images/genizah_research.png';

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
          <div className="content">
            <hr className="plum-line" />
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
            <p className="small text">Cohen, Mark R. "Geniza for Islamicists, Islamic Geniza, and the ‘New Cairo Geniza.’" Harvard Middle Eastern and Islamic Review 7 (2006): 129-45. Accessed December 5, 2017. http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza.</p>
          </div>
        </div>
        {/*
        --------------------------------
        */}
        
        {/*
        Section: Partners
        --------------------------------
        */}
        <div className="about-page__partners">
          <h2>Institutional Partners</h2>
          <div className="about-page__logos">
            <div>
              <img alt="Penn Libraries Logo" src={Penn} />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              </span>
            </div>
            <div>
              <img alt="The Jewish Theological Seminary Logo" src={JTSLogo} />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              </span>
            </div>
            <div>
              <img alt="Genizah Research Unit, Cambridge University Library" src={Genizah} />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              </span>
            </div>
            <div>
              <img alt="Princeton Geniza Project" src={Princeton} />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              </span>
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
        <div className="about-page__team">
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
          <hr className="plum-line" />
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
