import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StepThrough } from 'zooniverse-react-components';
import { Markdown } from "markdownz";
import { toggleDialog } from '../ducks/dialog';

class TutorialView extends React.Component {
  constructor() {
    super();

    this.closeTutorial = this.closeTutorial.bind(this);
    this.advanceTutorial = this.advanceTutorial.bind(this);

    this.state = {
      loaded: false,
      media: {}
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

  closeTutorial() {
    this.props.dispatch(toggleDialog(null));
  }

  advanceTutorial() {
    const swiper = this.stepThrough && this.stepThrough.swiper;

    if (swiper) {
      swiper.swipe.next();
      swiper.handleScroll();
    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    return (
      <div className="tutorial">
        <StepThrough ref={(el) => { this.stepThrough = el; }} className="tutorial-steps">
          {this.props.tutorial.steps.map((step) => {
            if (!step._key) {
              step._key = Math.random();
            }
            let source;
            if (this.state.media[step.media]) {
              source = this.state.media[step.media].src;
            }

            return (
              <div key={step._key} className="tutorial-step">
                <img alt="Tutorial" src={source} />
                <Markdown>{step.content}</Markdown>
              </div>
            );
          })}
        </StepThrough>
        <div>
          <button className="button" onClick={this.closeTutorial}>Close</button>
          <button className="button button__dark" onClick={this.advanceTutorial}>Next</button>
        </div>
      </div>
    );
  }
}

TutorialView.propTypes = {
  dispatch: PropTypes.func,
  preferences: PropTypes.object,
  tutorial: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

TutorialView.defaultProps = {
  dispatch: () => {},
  preferences: null,
  tutorial: null,
  user: null
};

const mapStateToProps = state => ({
  preferences: state.project.userPreferences,
  tutorial: state.tutorial.data,
  user: state.login.user
});

export default connect(mapStateToProps)(TutorialView);
