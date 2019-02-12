import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { Markdown } from 'markdownz';
import classnames from 'classnames';
import { togglePopup } from '../ducks/dialog';

const completedThisSession = {};
if (window.tutorialsCompletedThisSession) {
  window.tutorialsCompletedThisSession = completedThisSession;
}

class TutorialView extends React.Component {
  constructor(props) {
    super(props);

    this.closeTutorial = this.closeTutorial.bind(this);
    this.isFinalStep = this.isFinalStep.bind(this);

    this.state = {
      loaded: false,
      media: {},
      nextStep: props.translate('general.next'),
      stepIndex: 0
    };
  }

  componentWillMount() {
    if (this.props.tutorial.steps.length !== 0) {
      this.props.tutorial.get('attached_images')
        .catch(() => [])
        .then((mediaResources) => {
          const mediaByID = {};

          mediaResources.map((mediaResource) => {
            mediaByID[mediaResource.id] = mediaResource;
          });
          this.setState({ loaded: true, media: mediaByID });
          return mediaByID;
        });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.isFinalStep);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.isFinalStep);
    this.handleUnmount();
  }

  closeTutorial() {
    this.props.dispatch(togglePopup(null));
  }

  advanceTutorial(total, e) {
    if (e) e.preventDefault();
    const nextStep = this.state.stepIndex + 1;
    if (nextStep <= total - 1) {
      this.handleStep(nextStep);
    } else {
      this.closeTutorial();
    }
  }

  handleUnmount() {
    const now = new Date().toISOString();
    completedThisSession[this.props.tutorial.id] = now;
    if (this.props.user) {
      const projectPreferences = this.props.preferences;
      if (!projectPreferences.preferences) {
        projectPreferences.preferences = {};
      }
      if (!projectPreferences.preferences.tutorials_completed_at) {
        projectPreferences.preferences.tutorials_completed_at = {};
      }
      const changes = {};
      changes[`preferences.tutorials_completed_at.${this.props.tutorial.id}`] = now;
      projectPreferences.update(changes);
      projectPreferences.save();
    }
  }

  isFinalStep() {
    const currentStep = this.state.stepIndex + 1;
    const totalSteps = (this.props.tutorial.steps && this.props.tutorial.steps.length) || 0;
    if (currentStep >= totalSteps) {
      this.setState({ nextStep: this.props.translate('general.letsGo') });
    } else if (this.state.nextStep === this.props.translate('general.letsGo')) {
      this.setState({ nextStep: this.props.translate('general.next') });
    }
    return currentStep >= totalSteps;
  }

  handleStep(index) {
    this.setState({
      stepIndex: index
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const totalSteps = (this.props.tutorial.steps && this.props.tutorial.steps.length) || 0;
    const allSteps = Array.from(Array(totalSteps).keys());
    const currentStep = this.props.tutorial.steps[this.state.stepIndex];

    const source = currentStep && currentStep.media && this.state.media[currentStep.media];
    const language = this.props.currentLanguage;
    const translations = (this.props.translatedTutorial && this.props.translatedTutorial[language])
      ? this.props.translatedTutorial[language] : null;
    const content = translations && translations[`steps.${this.state.stepIndex}.content`]
      ? translations[`steps.${this.state.stepIndex}.content`] : currentStep.content;

    return (
      <div className="tutorial-container">
        <div
          className={classnames('tutorial', {
            'tutorial-flip': this.props.rtl
          })}
        >
          <div className="tutorial__header">
            <span>{this.props.translate('tutorial.title')}</span>
            <button className="close-button" onClick={this.closeTutorial}>X</button>
          </div>
          <div className="tutorial-step">
            {source && (
              <img alt="Tutorial" src={source.src} />
            )}
            <Markdown>{content}</Markdown>
          </div>
          <span className="step-through-pips">
            {allSteps.map(thisStep =>
              <label key={thisStep} className="step-through-pip" title={`Step ${thisStep + 1}`}>
                <input
                  type="radio"
                  className="step-through-pip-input"
                  aria-label={`Step ${thisStep + 1} of ${totalSteps}`}
                  checked={thisStep === this.state.stepIndex}
                  onChange={this.handleStep.bind(this, thisStep)}
                />
                <span>{thisStep + 1}</span>
              </label>
            )}
          </span>
          <div>
            <button className="button" onClick={this.closeTutorial}>Close</button>
            <button
              className="button button__dark"
              onClick={this.advanceTutorial.bind(this, totalSteps)}
            >
              {this.state.nextStep}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TutorialView.propTypes = {
  currentLanguage: PropTypes.string,
  dispatch: PropTypes.func,
  preferences: PropTypes.shape({
    preferences: PropTypes.object
  }),
  rtl: PropTypes.bool,
  translate: PropTypes.func,
  translatedTutorial: PropTypes.shape(),
  tutorial: PropTypes.shape({
    get: PropTypes.func,
    id: PropTypes.string,
    steps: PropTypes.array
  }),
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

TutorialView.defaultProps = {
  currentLanguage: 'en',
  dispatch: () => {},
  preferences: null,
  rtl: false,
  translate: () => {},
  translatedTutorial: {},
  tutorial: null,
  user: null
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  preferences: state.project.userPreferences,
  rtl: state.languages.rtl,
  translate: getTranslate(state.locale),
  translatedTutorial: state.translations.strings.tutorial,
  tutorial: state.tutorial.data,
  user: state.login.user
});

export default connect(mapStateToProps)(TutorialView);
