import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuide } from '../ducks/field-guide';
import { toggleDialog } from '../ducks/dialog';
import FieldGuide from '../components/FieldGuide';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
    this.togglePeek = this.togglePeek.bind(this);
    this.toggleFieldGuide = this.toggleFieldGuide.bind(this);

    this.state = {
      peek: false,
      showPanel: true,
      showInfo: true
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchGuide());
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  togglePeek() {
    this.setState({ peek: !this.state.peek });
  }

  toggleFieldGuide() {
    if (this.props.dialog) {
      return this.props.dispatch(toggleDialog(null));
    }

    return this.props.dispatch(toggleDialog(
      <FieldGuide guide={this.props.guide} icons={this.props.icons} />, 'Field Guide'));
  }

  handleResize() {
    if (window.innerHeight < 625 && this.state.showInfo) {
      this.setState({ showInfo: false });
    }
  }

  toggleInfo() {
    this.setState({ showInfo: !this.state.showInfo });
  }

  togglePanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  showSubjectInfo() {
    return (
      <div className="control-panel__info">
        <div>
          <span className="primary-label">Name</span>
          <span className="body-font">ENA NS 78 0117</span>
        </div>
        <div>
          <span className="primary-label">Attribution</span>
          <span className="body-font">Library of the Jewish Theological Seminary</span>
        </div>
        <a href="/" className="text-link">Collection Page</a>
      </div>
    );
  }

  toggleButton() {
    const text = this.state.showInfo ? 'Hide subject info' : 'View subject info';
    return <button className="control-panel__toggle" onClick={this.toggleInfo}>{text}</button>;
  }

  toggleIcon() {
    const iconClass = this.state.showPanel ? 'fa fa-chevron-right' : 'fa fa-chevron-left';
    return <button className="control-panel__toggle" onClick={this.togglePanel}><i className={iconClass} /></button>;
  }

  render() {
    const fieldGuideText = this.props.dialog ? 'Hide Field Guide' : 'Show Field Guide';
    const hiddenStyle = !this.state.showInfo ? 'control-panel__hide' : '';
    const peekHeight = this.state.showInfo ? 'tall' : 'short';
    let panel;

    const content = (
      <section className="control-panel">
        <div className="control-panel__header">
          <h4 className="primary-label">Subject info</h4>
          {this.toggleIcon()}
        </div>
        <hr />
        {this.toggleButton()}
        <div className="control-panel__buttons">

          {this.state.showInfo && (
            this.showSubjectInfo()
          )}

          <button className="button">Show Crib Sheet</button>
          <button className="button" onClick={this.toggleFieldGuide}>{fieldGuideText}</button>
          <button className="button">Show Tutorial</button>

          <div>
            <button className="button">Save Progress</button>
            <button className="button button__dark">Finished</button>
          </div>
        </div>
      </section>
    );

    if (this.state.showPanel) {
      panel = (
        <section className={`control-panel ${hiddenStyle}`}>
          <div className="control-panel__header">
            <h4 className="primary-label">Subject info</h4>
            {this.toggleIcon()}
          </div>
          <hr />
          {this.toggleButton()}
          <div className="control-panel__buttons">

            {this.state.showInfo && (
              this.showSubjectInfo()
            )}

            <button className="button">Show Crib Sheet</button>
            <button className="button" onClick={this.toggleFieldGuide}>{fieldGuideText}</button>
            <button className="button">Show Tutorial</button>

            <div>
              <button className="button">Save Progress</button>
              <button className="button button__dark">Finished</button>
            </div>
          </div>
        </section>
      );
    } else {
      panel = (
        <section
          className={`control-panel control-panel__side ${peekHeight}`}
          ref={(c) => { this.sidePanel = c; }}
          role="button"
          onClick={this.togglePanel}
          onHover={this.togglePeek}
          tabIndex="0"
        >
          {this.toggleIcon()}
          <h2>EXPAND INFO</h2>
          {content}
        </section>
      );
    }
    return panel;
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
