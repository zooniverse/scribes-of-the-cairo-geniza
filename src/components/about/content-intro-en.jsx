import React from 'react';

const imgPhase1Workflow = require('../../images/about-phase-1-workflow-en.png');

function Content() {
  return (
    <div className="content">
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
        <img src={imgPhase1Workflow} />
        <span className="caption">Phase One Workflow</span>
      </div>
      <p className="text">Now we are at the point of the transcription phase, or Phase II. The goal of phase II is to:</p>
      <ol className="text">
        <li>Provide our community of volunteer humanists and historians opportunities to view and decipher Cairo Geniza fragments;</li>
        <li>Contribute to the classification of fragments by script-type and content;</li>
        <li>Produce transcriptions of the material that will help in the work of historians, linguists and other scholars of this material. This material will be available in the future through OPenn and as open data through other sources.</li>
      </ol>
      <p className="text">A note about the keyboards: The keyboards in the Arabic and Hebrew transcription interfaces look very different. This is due to the fact that we can typologize Hebrew script in a way we cannot do with Arabic scripts. In addition, the ligatures (the way letters connect to each other in Arabic script) make it difficult to differentiate one letter from another in a word, particularly when it is written in an informal script. With these factors in mind it didn’t make sense to offer a keyboard with typologies like we did for Hebrew scripts. Instead we adapted a modern North African keyboard, adding the lam alif character as a part of the standard keyboard as well as the  ت ب ث character without the dots, as it may be difficult to tell which letter it is. We adapted the keyboard you see on screen from the keyboard of a 1920s Egyptian typewriter. We particularly appreciated the way it showcases each letter’s different forms (isolated, initial, medial, and final).</p>
      <p className="small text">Cohen, Mark R. "Geniza for Islamicists, Islamic Geniza, and the ‘New Cairo Geniza.’" Harvard Middle Eastern and Islamic Review 7 (2006): 129-45. Accessed December 5, 2017. <a href="http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza" target="_blank" rel="noopener noreferrer">http://www.academia.edu/6120191/Geniza_for_Islamicists_Islamic_Geniza_and_the_New_Cairo_Geniza</a></p>
    </div>
  );
};

export default Content;
