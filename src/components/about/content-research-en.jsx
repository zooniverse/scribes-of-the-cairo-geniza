import React from 'react';

import ImgElijah from '../../images/partners/elijah.png';
import GenizahCentre from '../../images/partners/genizah-centre.png';
import ImgPenn from '../../images/partners/penn.png';
import ImgPrinceton from '../../images/partners/princeton.png';
import ImgZooniverse from '../../images/partners/zooniverse-word-black.png';

function Content() {
  return (
    <div className="content">
      <div className="item">
        <div className="right-column">
          <img alt="Penn" src={ImgPenn} />
        </div>
        <h3>Penn</h3>
        <p className="text">The Penn Libraries serve the world-class faculty and students of Penn’s 12 schools. The Libraries’ collections comprise more than 7 million volumes, over 100,000 journals, some 2 million digitized images, and extraordinary rare and unique materials that document the intellectual and cultural experience of ancient and modern civilizations. Through our collaborative relationships, we supplement Penn’s great local collections with physical access to the Center for Research Libraries (approximately 5 million items), the combined holdings of the Ivies (more than 70 million volumes), and exclusive electronic access to some 2 million public domain titles in the HathiTrust. Today, the Libraries play an instrumental role in developing new technologies for information discovery and dissemination and are noted for groundbreaking work in digital library design. To learn more about the Penn Libraries, visit <a href="http://www.library.upenn.edu" rel="noopener noreferrer" target="_blank">http://www.library.upenn.edu.</a></p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="Princeton" src={ImgPrinceton} />
        </div>
        <h3>Princeton</h3>
        <p className="text">The Princeton Geniza Lab is a collaborative space devoted to making the documentary texts of the Cairo Geniza — letters, legal documents, lists, accounts and other ephemera — accessible to scholars and the wider public. We organize teams of undergraduates, graduate students, post-docs, faculty and international researchers to describe, transcribe and translate the documents, and run workshops, conferences and meetings to discuss documentary history across Eurasia, digital humanities, laboratory-style learning in the humanities and the history of the medieval Middle East. Our main online database is the <a href="http://geniza.princeton.edu/newpgp/princetongenizaproject" rel="noopener noreferrer" target="_blank">Princeton Geniza Project.</a></p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="The e-Lijah Lab at the University of Haifa" src={ImgElijah} />
          <img alt="The Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa" src={GenizahCentre} />
        </div>
        <h3>e-Lijah Lab and the Centre for Interdisciplinary Research of the Cairo Genizah at the University of Haifa</h3>
        <p className="text">e-Lijah (eLearning in Jewish studies at Haifa) is a Digital Humanities lab aimed at developing and implementing citizen science and crowdsourcing projects in the Humanities. The lab covers along chronological span from Antiquity to the modern era and a variety of medias and disciplines including historical, spatial, textual, literary and visual sources.</p>
        <p className="text">The lab follows a triple elements model for citizen science. Each project in the lab is committed to the development of a web platform, the establishing of educational or other public activity for assuring a vital community of contributors and exercising research based on the fruits of public contributions.</p>
        <p className="text">The Lab was founded as an extension of the Haifa Genizah Research Center, devoted to multidisciplinary research in field of the Genizah, and to the wider application of Genizah Research, namely outreach for new circles of Genizah users : scholars in adjacent fields, various strands of education and the wider public as a whole. Visit our website:
          <a href="http://elijahlab.haifa.ac.il/index.php/en/" rel="noopener noreferrer" target="_blank">http://elijahlab.haifa.ac.il/index.php/en/</a>
        </p>
      </div>

      <div className="item">
        <div className="right-column">
          <img alt="The Zooniverse" src={ImgZooniverse} />
        </div>
        <h3>The Zooniverse</h3>
        <p className="text">The Zooniverse is the world’s largest and most popular platform for people-powered research. In 2016, the Zooniverse received a National Leadership Grant to fund the “Transforming Libraries and Archives through Crowdsourcing” project, a partnership between Zooniverse team members based at the Adler Planetarium in Chicago and at the University of Oxford. This effort will greatly expand the capacity for libraries and archives across the country to use crowdsourcing techniques to engage with audiences and improve access to digital collections through the Zooniverse. For more information about the research project, please click <a href="http://www.dlib.org/dlib/may17/vanhyning/05vanhyning.html" target="_blank" rel="noopener noreferrer">here.</a> For more information about the Zooniverse, please click <a href="https://www.zooniverse.org/about" rel="noopener noreferrer" target="_blank">here.</a></p>
      </div>
    </div>
  );
}

export default Content;
