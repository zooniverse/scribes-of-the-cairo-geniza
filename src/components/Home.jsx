import React from 'react';
import { ZooniverseLogo, ZooniverseLogotype } from 'zooniverse-react-components';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Penn from '../images/partners/penn.png';
import JTSLogo from '../images/partners/jts.png';
import Princeton from '../images/partners/princeton.png';
import Genizah from '../images/partners/genizah.png';
import Library from '../images/schechter-geniza.png';
import Scroll from '../images/hebrew-fragment.png';
import Arabic from '../images/arabic-big.png';
import HomeStatistics from './HomeStatistics';
import FlippedImg from './styled/FlippedImg';
import { config } from '../config';
import { fetchWorkflow } from '../ducks/workflow';

const Home = ({ dispatch, history, rtl, translate }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow));
    history.push('/classify');
    window.scrollTo(0, 0);
  };

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
          <a href="/">Scroll down to start transcribing</a>
        </div>
      </div>
      <div className="home-page__get-started">
        <h2>Get Started</h2>
        <div>
          <hr className="plum-line" />
          <div>
            <h2 className="h2-font">Transcribe Hebrew fragments</h2>
            <span>
              This paragraph describes the types of fragments one can expect to
              find in this collection. Perhaps advises against starting with
              Challenging when one is not familiar with the language.
            </span>
            <div className="home-page__buttons">
              <button className="button" onClick={selectWorkflow.bind(null, config.easyHebrew)}>Easy Hebrew</button>
              <button className="button" onClick={selectWorkflow.bind(null, config.challengingHebrew)}>Challenging Hebrew</button>
            </div>
          </div>
        </div>
        <div>
          <hr className="plum-line" />
          <div>
            <h2 className="h2-font">Transcribe Arabic fragments</h2>
            <span>
              This paragraph describes the types of fragments one can expect to
              find in this collection. Perhaps advises against starting with
              Challenging when one is not familiar with the language.
            </span>
            <div className="home-page__buttons">
              <button className="button" onClick={selectWorkflow.bind(null, config.easyArabic)}>Easy Arabic</button>
              <button className="button" onClick={selectWorkflow.bind(null, config.challengingArabic)}>Challenging Arabic</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page__partners">
        <h2>Partner Institutions</h2>
        <div>
          <ZooniverseLogotype />
          <img alt="Penn Libraries" src={Penn} />
          <img alt="The Jewish Theological Seminary" src={JTSLogo} />
          <img alt="Princeton Geniza Project" src={Princeton} />
          <img alt="Genizah Research Unit Cambridge University Library" src={Genizah} />
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
        <div>
          <span>
            The results from Scribes of the Cairo Geniza have the potential to
            rewrite the history of the premodern Middle East, Mediterranean and
            Indian Ocean trade, and the Jewish diaspora. Until now, most of the
            information has remained locked away in undeciphered manuscript
            fragments; less than one&#8208;third of the 350,000 items have been
            catalogued in the 120 years that the cache has been known to exist.
            Virtually all scholars who have studied these texts have come away with
            a transformed sense of the history of the region and the long ties of
            intimacy among its people. Students and the general public will have the
            opportunity to benefit from encountering these fragments online and from
            learning how to sort and eventually transcribe them as members of this
            citizen scientist community. We see this project as a way for people
            with shared interests and different skill levels from around the world
            to meet in a common endeavor and unlock this storage chamber of ancient
            fragments.
          </span>
          <a href="/">Learn More</a>
        </div>
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
