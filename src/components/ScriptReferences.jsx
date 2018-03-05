import React from 'react';

class ScriptReferences extends React.Component {
  constructor() {
    super();

    this.toggleSelection = this.toggleSelection.bind(this);

    this.state = {
      showKeyboards: false
    };
  }

  toggleSelection() {
    this.setState({ showKeyboards: !this.state.showKeyboards });
  }

  renderFilters() {
    return (
      <div className="script-references__filter">
        <span className="secondary-label">Filter Scripts By</span>
        <div>
          <button className="secondary-label">Miniscule</button>
          <button className="secondary-label">Miniscule</button>
          <button className="secondary-label">Square</button>
          <button className="secondary-label">All</button>
        </div>
      </div>
    );
  }

  render() {
    const toggleText = this.state.showKeyboards ? 'Back' : 'Change';
    const rightPanel = !this.state.showKeyboards ? (
      <span className="body-font">
        Change the script type to see variations in character
        formation based on location and time period.
      </span>) : this.renderFilters();

    return (
      <div className="script-references">
        <div className="script-references__header">
          <div>
            <span className="secondary-label">Current Script Type</span>
            <div>
              <span className="h1-font">Ashkenazi Square</span>
              <button className="text-link" onClick={this.toggleSelection}>{toggleText}</button>
            </div>
          </div>
          <div>
            {rightPanel}
          </div>
        </div>
      </div>
    );
  }
}

export default ScriptReferences;
