import React from 'react';
import { ZooniverseLogo, ZooniverseLogotype } from 'zooniverse-react-components';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import ImgBodleian from '../images/partners/bodleian.png';
import ImgCambridge from '../images/partners/cambridge.png';
import ImgElijah from '../images/partners/Elijah.png';
import ImgGenizah from '../images/partners/genizah.png';
import ImgJTS from '../images/partners/jts.png';
import ImgManchester from '../images/partners/manchester.png';
import ImgPenn from '../images/partners/penn.png';
import ImgPrinceton from '../images/partners/princeton.png';
import ImgZooniverse from '../images/partners/zooniverse-word-black.png';

import Library from '../images/schechter-geniza.png';
import Scroll from '../images/hebrew-fragment.png';
import Arabic from '../images/arabic-big.png';
import HomeStatistics from './HomeStatistics';
import FlippedImg from './styled/FlippedImg';
import { config } from '../config';
import { fetchWorkflow } from '../ducks/workflow';
import { fetchSubject } from '../ducks/subject';

import AboutGenizaAr from './about/about-geniza-ar';
import AboutGenizaEn from './about/about-geniza-en';
import AboutGenizaHe from './about/about-geniza-he';

const Home = ({ currentLanguage, dispatch, history, rtl, translate }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow)).then(()=>{
      return dispatch(fetchSubject());
    });
    history.push('/classify');
    window.scrollTo(0, 0);
  };

  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <section className="home-page">
      <div className="home-page__introduction">
        <FlippedImg alt="Hebrew Scroll" rtl={rtl} src={Scroll} />
        <img alt="Arabic Text" src={Arabic} />
        <div>
          <ZooniverseLogotype width="100px" />
          <h1>{translate('topNav.site')}</h1>
        </div>
        <hr className="plum-line" />
        <div>
          <span>
            The University of Pennsylvania Libraries, in partnership with the
            Princeton Geniza Project, the Library of the Jewish Theological Seminary,
            and the Genizah Research Unit at Cambridge University Library share
            Cairo Geniza fragments with the Zooniverse community for the first time!
          </span>
        </div>
      </div>
      <div className="home-page__get-started">
        <h2>Get Started</h2>
        <div>
          <hr className="plum-line" />
          <div>
            <h2 className="h2-font">{translate('transcribeHebrew.title')}</h2>
            <span>{translate('transcribeHebrew.content')}</span>
            <span className="home-page__exercises">{translate('transcribeHebrew.exercises')}</span>
            <div className="home-page__buttons">
              <button
                className="button"
                onClick={selectWorkflow.bind(null, config.easyHebrew)}
              >
                {translate('transcribeHebrew.easy')}
              </button>
              <div>
                <button
                  className="button button__dark-disabled"
                  disabled
                  onClick={selectWorkflow.bind(null, config.challengingHebrew)}
                >
                  {translate('transcribeHebrew.challenging')}
                </button>
                <span className="body-font">Coming Soon!</span>
              </div>
            </div>
            <span className="home-page__exercises">{translate('keywordsHebrew.title')}</span>
            <span>{translate('keywordsHebrew.content')}</span>
            <div className="home-page__buttons">
              <a
                className="button"
                href={`${classifyPath}${c.hebrewKeyword}`}
                target="_blank"
              >
                {translate('keywordsHebrew.button')} <i className="fa fa-external-link" />
              </a>
            </div>
            <span className="home-page__exercises">{translate('classifyFragments.title')}</span>
            <div className="home-page__buttons">
              <a
                className="button"
                href={`${classifyPath}${c.phaseOne}`}
                target="_blank"
              >
                {translate('classifyFragments.button')} <i className="fa fa-external-link" />
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
              <button
                className="button"
                onClick={selectWorkflow.bind(null, config.easyArabic)}
              >
                {translate('transcribeArabic.easy')}
              </button>
              <div>
                <button
                  className="button button__dark-disabled"
                  disabled
                  onClick={selectWorkflow.bind(null, config.challengingArabic)}
                >
                  {translate('transcribeArabic.challenging')}
                </button>
                <span className="body-font">Coming Soon!</span>
              </div>
            </div>
            <span className="home-page__exercises">{translate('keywordsArabic.title')}</span>
            <span>{translate('keywordsArabic.content')}</span>
            <div className="home-page__buttons">
              <a
                className="button"
                href={`${classifyPath}${c.arabicKeyword}`}
                target="_blank"
              >
                {translate('keywordsArabic.button')} <i className="fa fa-external-link" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page__partners">
        <h2>{translate('home.institutions')}</h2>
        <div>
          <ZooniverseLogotype />
          
          <img alt="Penn" src={ImgPenn} />
          <img alt="The Jewish Theological Seminary" src={ImgJTS} />
          <img alt="Princeton Geniza Project" src={ImgPrinceton} />
          <img alt="Genizah Research Unit Cambridge University Library" src={ImgGenizah} />
          
          <img alt="Cambridge" src={ImgCambridge} />
          <img alt="Manchester" src={ImgManchester} />
          <img alt="Bodleian" src={ImgBodleian} />
          <img alt="e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa" src={ImgElijah} />
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
        <h2 className="h2-font">About Scribes of the Cairo Geniza</h2>
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
        <h2>What is the Zooniverse?</h2>
        <span>
          The Zooniverse is the world&apos;s largest and most popular platform for
          people&#8208;powered research. This research is made possible by
          volunteers&#8212;hundreds of thousands of people around the world who
          come together to assist professional researchers. Our goal is to enable
          reearch that would not be possible, or practical, otherwise. Zooniverse
          research results in new discoeries, datasets useful to the wider research
          community,and many publications.
        </span>
        <a className="button" href="https://www.zooniverse.org" rel="noopener noreferrer" target="_blank">Zooniverse.org</a>
      </div>
    </section>
  );
};

Home.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  rtl: PropTypes.bool,
  translate: PropTypes.func
};

Home.defaultProps = {
  dispatch: () => {},
  history: null,
  rtl: false,
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  rtl: state.languages.rtl,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(withRouter(Home));
