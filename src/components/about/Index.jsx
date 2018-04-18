import React from 'react';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Connect from '../Connect';
import Penn from '../../images/penn.png';
import JTSLogo from '../../images/jts_logo.png';
import Princeton from '../../images/princeton_geniza.png';
import Genizah from '../../images/genizah_research.png';

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
        <div className="about-page__intro">
          <h2>{translate('topNav.about')}</h2>
          <div>
            <hr className="plum-line" />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </span>
            <a href="/">Learn about transcription</a>
          </div>
        </div>
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
