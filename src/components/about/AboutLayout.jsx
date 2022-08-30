import React from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Connect from '../Connect';

import ImgBodleian from '../../images/partners/bodleian.png';
import ImgCambridge from '../../images/partners/cambridge.png';
import ImgJTS from '../../images/partners/jts.png';
import ImgManchester from '../../images/partners/manchester.png';
import ImgPenn from '../../images/partners/penn.png';
import ImgZooniverse from '../../images/partners/zooniverse-word-black.png';

import ContentIntroEn from './content-intro-en.jsx';
import ContentIntroHe from './content-intro-he.jsx';
import ContentIntroAr from './content-intro-ar.jsx';

import ContentGenizaEn from './content-geniza-en.jsx';
import ContentGenizaHe from './content-geniza-he.jsx';
import ContentGenizaAr from './content-geniza-ar.jsx';

import ContentResearchEn from './content-research-en.jsx';
import ContentResearchHe from './content-research-he.jsx';
import ContentResearchAr from './content-research-ar.jsx';

import ContentProvenanceEn from './content-provenance-en.jsx';
import ContentProvenanceHe from './content-provenance-he.jsx';
import ContentProvenanceAr from './content-provenance-ar.jsx';

import Laurie from '../../images/team/LaurieAllen.jpg';
import Samantha from '../../images/team/SamanthaBlickhan.jpg';
import Laura from '../../images/team/LauraNewmanEckstein.jpg';
import Doug from '../../images/team/DougEmery.jpg';
import Mitch from '../../images/team/MitchFraas.jpg';
import WillGranger from '../../images/team/WillGranger.jpg';
import Arthur from '../../images/team/ArthurKiron.jpg';
import Moshe from '../../images/team/MosheLavee.png';
import Vered from '../../images/team/VeredKretzmer.png';
import Eve from '../../images/team/EveKrakowski.jpg';
import William from '../../images/team/WilliamNoel.jpg';
import Shaun from '../../images/team/ShaunANoordin.jpg';
import Becky from '../../images/team/BeckyRother.jpg';
import Marina from '../../images/team/MarinaRustow.jpg';
import Emily from '../../images/team/EmilyEsten.jpg';

const members = {
  Laurie,
  Samantha,
  Laura,
  Doug,
  Mitch,
  WillGranger,
  Arthur,
  Moshe,
  Vered,
  Eve,
  William,
  Shaun,
  Becky,
  Marina,
  Emily
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
          <h2>{translate('home.aboutGeniza')}</h2>
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
          <h2>{translate('home.aboutResearch')}</h2>
          <hr className="small plum-line" />
          {(() => { switch (currentLanguage) {
            case 'he': return (<ContentResearchHe />);
            case 'ar': return (<ContentResearchAr />);
            default: return (<ContentResearchEn />);
          }})()}
        </div>
        {/*
        --------------------------------
        */}

        {/*
        Section: Image Partners
        --------------------------------
        */}
        <div className="about-page__image-partners subsection">
          <h2>{translate('home.imagePartners')}</h2>
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
        <div className="about-page__provenance subsection">
          <a id="provenance" />
          <h2>{translate('home.provenance')}</h2>
          <hr className="small plum-line" />
          {(() => { switch (currentLanguage) {
            case 'he': return (<ContentProvenanceHe />);
            case 'ar': return (<ContentProvenanceAr />);
            default: return (<ContentProvenanceEn />);
          }})()}
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
          <h2>{translate('home.team')}</h2>
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
            <h3>{translate('home.specialThanks')}</h3>
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
  rtl: PropTypes.bool
};

AboutLayout.defaultProps = {
  currentLanguage: '',
  translate: () => {},
  rtl: false
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale),
  rtl: state.languages.rtl
});

export default connect(mapStateToProps)(AboutLayout);
