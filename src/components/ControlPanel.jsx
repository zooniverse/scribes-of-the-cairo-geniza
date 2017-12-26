import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuide } from '../ducks/field-guide';
import { toggleDialog } from '../ducks/dialog';
import FieldGuide from '../components/FieldGuide';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFieldGuide = this.toggleFieldGuide.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchGuide());
  }

  toggleFieldGuide() {
    if (this.props.dialog) {
      return this.props.dispatch(toggleDialog(null));
    }

    return this.props.dispatch(toggleDialog(
      <FieldGuide guide={this.props.guide} icons={this.props.icons} />, 'Field Guide'));
  }

  render() {
    const fieldGuideText = this.props.dialog ? 'Hide Field Guide' : 'Show Field Guide';

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
          <button className="button" onClick={this.toggleFieldGuide}>{fieldGuideText}</button>
          <button className="button">Show Tutorial</button>

          <div>
            <button className="button">Save Progress</button>
            <button className="button button__dark">Finished</button>
          </div>
        </div>
      </section>
    );
  }
}

ControlPanel.propTypes = {
  dialog: PropTypes.node,
  dispatch: PropTypes.func,
  guide: PropTypes.shape({
    id: PropTypes.string
  }),
  icons: PropTypes.object
};

ControlPanel.defaultProps = {
  dialog: null,
  dispatch: () => {},
  guide: null,
  icons: null
};

const mapStateToProps = (state) => ({
  dialog: state.dialog.data,
  guide: state.fieldGuide.guide,
  icons: state.fieldGuide.icons
});

export default connect(mapStateToProps)(ControlPanel);
