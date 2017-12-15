import React from 'react';

export default function ControlPanel() {
  return (
    <section className="control-panel">
      <div className="control-panel__header">
        <h4 className="primary-label">Subject info</h4>
        <span>&#x025B8;</span>
      </div>
      <hr />
      <div className="control-panel__buttons">
        <div>
          <span className="primary-label">Name</span>
          <span className="body-font">ENA NS 78 0117</span>
        </div>
        <div>
          <span className="primary-label">Attribution</span>
          <span className="body-font">Library of the Jewish Theological Seminary</span>
        </div>
        <a href="/" className="text-link">Collection Page</a>
        <button className="button">Show Crib Sheet</button>
        <button className="button">Show Page Reverse</button>
        <button className="button">Show Field Guide</button>
        <button className="button">Show Tutorial</button>

        <div>
          <button className="button">Save Progress</button>
          <button className="button button__dark">Finished</button>
        </div>
      </div>
    </section>
  );
}
