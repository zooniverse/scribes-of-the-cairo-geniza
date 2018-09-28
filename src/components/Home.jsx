import React from 'react';
import { ZooniverseLogo, ZooniverseLogotype } from 'zooniverse-react-components';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import ImgBodleian from '../images/partners/bodleian.png';
import ImgCambridge from '../images/partners/cambridge.png';
import ImgElijah from '../images/partners/elijah.png';
import GenizahCentre from '../images/partners/genizah-centre.png';
import ImgIMLS from '../images/partners/imls.png';
import ImgJTS from '../images/partners/jts.png';
import ImgManchester from '../images/partners/manchester.png';
import ImgPenn from '../images/partners/penn.png';
import ImgPrinceton from '../images/partners/princeton.png';

import Library from '../images/schechter-geniza.png';
import Scroll from '../images/hebrew-fragment.png';
import FlippedScroll from '../images/hebrew-fragment-flipped.png';
import Arabic from '../images/arabic-big.png';
import HomeStatistics from './HomeStatistics';
import FlippedImg from './styled/FlippedImg';
import { config } from '../config';
import { fetchWorkflow } from '../ducks/workflow';
import { fetchSubject } from '../ducks/subject';
import { LANGUAGES } from '../ducks/languages';

import AboutGenizaAr from './about/about-geniza-ar';
import AboutGenizaEn from './about/about-geniza-en';
import AboutGenizaHe from './about/about-geniza-he';

const Home = ({ adminMode, currentLanguage, dispatch, history, language, rtl, translate }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow)).then(()=>{
      return dispatch(fetchSubject());
    });
    history.push('/classify');
    window.scrollTo(0, 0);
  };

  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;
  const ScrollOrientation = rtl ? FlippedScroll : Scroll;

  return (
    <section className="home-page">
      <div className="home-page__introduction">
        <FlippedImg alt="Hebrew Scroll" rtl={rtl} src={ScrollOrientation} />
        <img alt="Arabic Text" src={Arabic} />
        <div>
          <ZooniverseLogotype width="100px" />
          <h1>{translate('topNav.site')}</h1>
          {language !== LANGUAGES.ENGLISH && (
            <h2 className="h2-font">Scribes of the Cairo Geniza</h2>
          )}
        </div>
        <hr className="plum-line" />
        <div>
          <span>
            Welcome to Scribes of the Cairo Geniza, your chance to work with
            others to unlock the secrets of one of the greatest archives of the
            middle ages. Hidden for centuries in an attic in Cairo, over 300,000
            fragments of pre-modern and medieval Jewish texts—from everyday
            receipts to biblical works—have yet to be fully deciphered.
          </span>
          <span>
            The first step of the project, is to <b>sort</b> the fragments by script
            type and level of difficulty.
          </span>
          <span>
            Next, we analyze the sorted piles by <b>transcribing</b> the relatively easy
            fragments, and by finding key <b>phrases</b> that will eventually be used to
            help decipher the more difficult ones.
          </span>
          <span>
            This is a collaborative project between many institutions of higher
            learning (listed below), several great manuscript repositories, and
            you, the citizens of the world.  Thank you in advance for your
            contribution.
          </span>
        </div>
      </div>
      <div className="home-page__get-started">
        <h2>{translate('home.getStarted')}</h2>
        <div>
          <hr className="plum-line" />
          <div>
            <h2 className="h2-font">{translate('transcribeHebrew.title')}</h2>
            <span>{translate('transcribeHebrew.content')}</span>
            <span className="home-page__exercises">{translate('transcribeHebrew.exercises')}</span>
            <div className="home-page__buttons">
              <div>
                <button
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  disabled={!adminMode}
                  onClick={selectWorkflow.bind(null, config.easyHebrew)}
                >
                  {translate('transcribeHebrew.easy')}
                </button>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
              <div>
                <button
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  disabled={!adminMode}
                  onClick={selectWorkflow.bind(null, config.challengingHebrew)}
                >
                  {translate('transcribeHebrew.challenging')}
                </button>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
            </div>
            <span className="home-page__exercises">{translate('keywordsHebrew.title')}</span>
            <span>{translate('keywordsHebrew.content')}</span>
            <div className="home-page__buttons">
              <div>
                <a
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  href={`${classifyPath}${c.hebrewKeyword}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate('keywordsHebrew.button')} <i className="fa fa-external-link-alt" />
                </a>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
            </div>
            <span className="home-page__exercises">{translate('classifyFragments.title')}</span>
            <div className="home-page__buttons">
              <a
                className="button"
                href={`${classifyPath}${c.phaseOne}`}
                rel="noopener noreferrer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translate('classifyFragments.button')} <i className="fa fa-external-link-alt" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <hr className="plum-line" />
          <div>
            <h2 className="h2-font">{translate('transcribeArabic.title')}</h2>
            <span>{translate('transcribeArabic.content')}</span>
            <span className="home-page__exercises">{translate('transcribeArabic.exercises')}</span>
            <div className="home-page__buttons">
              <div>
                <button
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  disabled={!adminMode}
                  onClick={selectWorkflow.bind(null, config.easyArabic)}
                >
                  {translate('transcribeArabic.easy')}
                </button>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
              <div>
                <button
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  disabled={!adminMode}
                  onClick={selectWorkflow.bind(null, config.challengingArabic)}
                >
                  {translate('transcribeArabic.challenging')}
                </button>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
            </div>
            <span className="home-page__exercises">{translate('keywordsArabic.title')}</span>
            <span>{translate('keywordsArabic.content')}</span>
            <div className="home-page__buttons">
              <div>
                <a
                  className={classnames('button', {
                    'button__dark-disabled': !adminMode
                  })}
                  href={`${classifyPath}${c.arabicKeyword}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate('keywordsArabic.button')} <i className="fa fa-external-link-alt" />
                </a>
                <span className="body-font block">{translate('general.comingSoon')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page__partners">
        <h2>{translate('home.institutions')}</h2>
        <div>
          <a href="https://www.zooniverse.org/" target="_blank" rel="noopener noreferrer"><ZooniverseLogotype /></a>

          <a href="http://www.library.upenn.edu/" target="_blank" rel="noopener noreferrer"><img alt="Penn" src={ImgPenn} /></a>
          <a href="http://www.jtsa.edu/" target="_blank" rel="noopener noreferrer"><img alt="The Jewish Theological Seminary" src={ImgJTS} /></a>
          <a href="https://www.princeton.edu/~geniza/" target="_blank" rel="noopener noreferrer"><img alt="Princeton Geniza Project" src={ImgPrinceton} /></a>

          <a href="http://www.lib.cam.ac.uk/collections/departments/taylor-schechter-genizah-research-unit" target="_blank" rel="noopener noreferrer"><img alt="Cambridge" src={ImgCambridge} /></a>
          <a href="http://www.library.manchester.ac.uk/rylands/" target="_blank" rel="noopener noreferrer"><img alt="Manchester" src={ImgManchester} /></a>
          <a href="https://www.bodleian.ox.ac.uk/" target="_blank" rel="noopener noreferrer"><img alt="Bodleian" src={ImgBodleian} /></a>
          <img alt="The e-Lijah Lab at the University of Haifa" src={ImgElijah} />
          <a href="http://gniza.haifa.ac.il" target="_blank" rel="noopener noreferrer"><img alt="The Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa" src={GenizahCentre} /></a>

          <a href="https://www.imls.gov/" target="_blank" rel="noopener noreferrer"><img alt="IMLS" src={ImgIMLS} /></a>
        </div>
      </div>
      <div className="offset-image">
        <img alt="Scholar in Library Studying" src={Library} />
        <span className={classnames({ 'flipped-solomon': rtl })}>
          Solomon Schechter
        </span>
      </div>
      <div className="home-page__about">
        <hr className="plum-line" />
        <h2 className="h2-font">{translate('home.aboutScribes')}</h2>
        {(() => {
          switch (currentLanguage) {
            case 'he': return (<AboutGenizaHe />);
            case 'ar': return (<AboutGenizaAr />);
            default: return (<AboutGenizaEn />);
          }})()}
      </div>
      <HomeStatistics />
      <div className="home-page__zooniverse">
        <ZooniverseLogo height="4em" width="4em" />
        <h2>{translate('whatIs.title')}</h2>
        <span>
          {translate('whatIs.content')}
        </span>
        <a className="button" href="https://www.zooniverse.org" rel="noopener noreferrer" target="_blank">Zooniverse.org</a>
      </div>
    </section>
  );
};

Home.propTypes = {
  adminMode: PropTypes.bool,
  currentLanguage: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  language: PropTypes.string.isRequired,
  rtl: PropTypes.bool,
  translate: PropTypes.func
};

Home.defaultProps = {
  adminMode: false,
  dispatch: () => {},
  history: null,
  rtl: false,
  translate: () => {}
};

const mapStateToProps = state => ({
  adminMode: state.login.adminMode,
  currentLanguage: getActiveLanguage(state.locale).code,
  language: state.languages.language,
  rtl: state.languages.rtl,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(withRouter(Home));
