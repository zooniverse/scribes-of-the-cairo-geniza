import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { StepThrough } from 'zooniverse-react-components';
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

    this.previousActiveElement = document.activeElement;  //WARNING: this doesn't work on Edge.
    this.closeTutorial = this.closeTutorial.bind(this);
    this.advanceTutorial = this.advanceTutorial.bind(this);
    this.isFinalStep = this.isFinalStep.bind(this);

    this.state = {
      loaded: false,
      media: {},
      nextStep: props.translate('general.next')
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

  advanceTutorial() {
    const swiper = this.stepThrough && this.stepThrough.swiper;

    if (swiper) {
      if (this.isFinalStep()) {
        this.closeTutorial();
      } else {
        this.stepThrough.goNext();
      }
    }
  }

  handleUnmount() {
    if (this.previousActiveElement && this.previousActiveElement.focus) {
      this.previousActiveElement.focus();
    }
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
    const currentStep = (this.stepThrough && this.stepThrough.state && this.stepThrough.state.step)
      ? this.stepThrough.state.step + 1 : 0;
    const maxSteps = (this.stepThrough && this.stepThrough.props && this.stepThrough.props.children)
      ? React.Children.count(this.stepThrough.props.children) : 0;
    if (currentStep >= maxSteps) {
      this.setState({ nextStep: this.props.translate('general.letsGo') });
    } else if (this.state.nextStep === this.props.translate('general.letsGo')) {
      this.setState({ nextStep: this.props.translate('general.next') });
    }
    return currentStep >= maxSteps;
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const language = this.props.currentLanguage;
    const translations = (this.props.translatedTutorial && this.props.translatedTutorial[language])
      ? this.props.translatedTutorial[language] : null;

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
          <StepThrough ref={(el) => { this.stepThrough = el; }} className="tutorial-steps">
            {this.props.tutorial.steps.map((step, i) => {
              const content = translations ? translations[`steps.${i}.content`] : step.content;
              if (!step._key) {
                step._key = Math.random();
              }
              let source;
              if (this.state.media[step.media]) {
                source = this.state.media[step.media].src;
              }

              return (
                <div key={step._key} className="tutorial-step">
                  {source && (
                    <img alt="Tutorial" src={source} />
                  )}
                  <Markdown>{content}</Markdown>
                </div>
              );
            })}
          </StepThrough>
          <div>
            <button className="button" onClick={this.closeTutorial}>{this.props.translate('general.close')}</button>
            <button className="button button__dark" onClick={this.advanceTutorial}>{this.state.nextStep}</button>
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
  translatedTutorial: PropTypes.object,
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
