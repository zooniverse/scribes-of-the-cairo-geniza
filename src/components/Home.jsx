import React from 'react';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import Penn from '../images/penn.png';
import JTSLogo from '../images/jts_logo.png';
import Princeton from '../images/princeton_geniza.png';
import Genizah from '../images/genizah_research.png';
import Library from '../images/schechter-geniza.png';

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-page__introduction">
        <div>
          <ZooniverseLogotype />
          <h1>Scribes of the Cairo Geniza</h1>
        </div>
        <hr />
        <div>
          <span>
            The University of Pennsylvania Libraries, in partnership with the
            Princeton Geniza Project, the Library of the Jewish Theological Seminary,
            and the Genizah Research Unit at Cambridge University Library share
            Cairo Geniza fragments with the Zooniverse community for the first time!
          </span>
          <a href="#">Scroll down to start transcribing</a>
        </div>
      </div>
      <div className="home-page__get-started">
        <h2>Get Started</h2>
        <div>
          <hr />
          <div>
            <h2 className="h2-font">Transcribe Hebrew fragments</h2>
            <span>
              This paragraph describes the types of fragments one can expect to
              find in this collection. Perhaps advises against starting with
              Challenging when one is not familiar with the language.
            </span>
            <div className="home-page__buttons">
              <button className="button">Easy Hebrew</button>
              <button className="button">Challenging Hebrew</button>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <div>
            <h2 className="h2-font">Transcribe Arabic fragments</h2>
            <span>
              This paragraph describes the types of fragments one can expect to
              find in this collection. Perhaps advises against starting with
              Challenging when one is not familiar with the language.
            </span>
            <div className="home-page__buttons">
              <button className="button">Easy Arabic</button>
              <button className="button">Challenging Arabic</button>
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
        <span>Solomon Schechter</span>
      </div>
      <div className="home-page__about">
        <hr />
        <h2 className="h2-font">About Scribes of the Cairo Geniza</h2>
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
        <a href="#">Learn More</a>
      </div>
      <div className="home-page__stats">
        <div className="home-page__numbers">
          <div>
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="100" />
            </svg>
            <span>Percent Complete</span>
            <hr />
          </div>
          <div>
            <h2>Statistics from phase two of Scribes of the Cairo Geniza</h2>
            <div>
              <span>Volunteers</span>
              <span>Classifications</span>
              <span>Completed Subjects</span>
            </div>
            <a href="#" className="text-links">More statistics</a>
            <a href="#" className="text-links">Phase One statistics</a>
          </div>
        </div>
        <div>
          <h2>Connect with the Geniza team for more content</h2>
          <div className="home-page__buttons">
            <a className="button">Twitter</a>
            <a className="button">Facebook</a>
            <a className="button">Instagram</a>
            <a className="button">Medium</a>
          </div>
        </div>
      </div>
      <div className="home-page__zooniverse">
        <img alt="Zooniverse Logo" src="images/zooniverse-icon-web-white-small.png" />
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
        <a href="https://www.zooniverse.org">Zooniverse.org</a>
      </div>
    </section>
  );
}
