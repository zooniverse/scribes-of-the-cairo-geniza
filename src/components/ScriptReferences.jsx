import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardOptions } from '../lib/KeyboardTypes';
import { toggleScripts } from '../ducks/crib-sheet';

class ScriptReferences extends React.Component {
  constructor() {
    super();

    this.toggleSelection = this.toggleSelection.bind(this);
    this.renderLetters = this.renderLetters.bind(this);
    this.renderScripts = this.renderScripts.bind(this);
  }

  toggleSelection() {
    this.props.dispatch(toggleScripts());
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

  renderLetter(letter, i) {
    const removeCamel = letter.replace(/([A-Z])/g, ' $1');
    const styles = {};
    styles.backgroundImage = `url('${this.props.activeScript.img}')`;

    return (
      <div className="script-references__character" key={`CRIB_CHARACTER_${i}`}>
        <div
          className={letter}
          style={styles}
        />
        <span>{removeCamel}</span>
      </div>
    );
  }

  renderLetters() {
    return (
      <div className="script-references__letters">
        {this.props.activeScript.letters.map((letter, i) => {
          return this.renderLetter(letter, i);
        })}
      </div>
    );
  }

  renderScripts() {
    return (
      <div>
        <span>hello world</span>
      </div>
    );
  }

  render() {
    const toggleText = this.props.scriptSelection ? 'Back' : 'Change';
    const rightPanel = !this.props.scriptSelection ? (
      <span className="body-font">
        Change the script type to see variations in character
        formation based on location and time period.
      </span>) : this.renderFilters();
    const bodyRender = this.props.scriptSelection ? this.renderScripts() : this.renderLetters();

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
        {bodyRender}
      </div>
    );
  }
}

ScriptReferences.propTypes = {
  activeIndex: PropTypes.number,
  activeScript: PropTypes.shape({
    letters: PropTypes.array,
    img: PropTypes.string,
    name: PropTypes.string
  }),
  dispatch: PropTypes.func,
  scriptSelection: PropTypes.bool
};

ScriptReferences.defaultProps = {
  activeIndex: 0,
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  scriptSelection: false
};

const mapStateToProps = state => ({
  activeIndex: state.cribSheet.activeIndex,
  scriptSelection: state.cribSheet.scriptSelection
});

export default connect(mapStateToProps)(ScriptReferences);
