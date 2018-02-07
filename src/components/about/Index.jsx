import React from 'react';
import Connect from '../Connect';
import Penn from '../../images/penn.png';
import JTSLogo from '../../images/jts_logo.png';
import Princeton from '../../images/princeton_geniza.png';
import Genizah from '../../images/genizah_research.png';
import TheTeam from '../../lib/team';

const members = {
  Laurie: require('../../images/team/LaurieAllen.jpg'),
  Jean: require('../../images/team/JeanBauer.png'),
  Samantha: require('../../images/team/SamanthaBlickhan.jpg'),
  Laura: require('../../images/team/LauraNewmanEckstein.jpg'),
  Doug: require('../../images/team/DougEmery.jpg'),
  Mitch: require('../../images/team/MitchFraas.jpg'),
  Jessica: require('../../images/team/JessicaGoldberg.jpg'),
  Arthur: require('../../images/team/ArthurKiron.jpg'),
  Moshe: require('../../images/team/MosheLavee.png'),
  Eve: require('../../images/team/EveKrakowski.jpg'),
  William: require('../../images/team/WilliamNoel.jpg'),
  Becky: require('../../images/team/BeckyRother.jpg'),
  Marina: require('../../images/team/MarinaRustow.jpg')
};

export default function AboutLayout({ match }) {
  return (
    <div className="about-page">
      <section>
        <div className="about-page__intro">
          <h2>About</h2>
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
            {TheTeam.map((member, i) => {
              return (
                <div key={`team-member-${i}`}>
                  <img alt={member.name} src={members[member.photo]} />
                  <hr className="plum-line" />
                  <h3>{member.name}</h3>
                  <span>{member.description}</span>
                </div>
              );
            })}
          </div>
          <hr className="plum-line" />
          <div className="about-page__thanks">
            <h3>Special thanks</h3>
            <span>
              In addition, special thanks and credit to Jessica Dummer, Scott Enderle,
              Dr. David Kraemer, Dr. Nita Krevans, Kate Lynch, Gayatri B. Oruganti,
              Ben Outhwaite, Craig Perry, and Oded Zinger for their contributions.
            </span>
          </div>
        </div>
        <Connect />
      </section>
    </div>
  );
}
