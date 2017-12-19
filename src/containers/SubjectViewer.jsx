import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSubjectLocation } from '../lib/get-subject-location';

import {
  resetView, updateImageSize, updateViewerSize
} from '../ducks/subject-viewer';

import SVGImage from '../components/SVGImage';

class SubjectViewer extends React.Component {
  constructor(props) {
    super(props);

    //HTML element refs.
    this.section = null;
    this.svg = null;
    this.svgImage = null;

    //Events!
    this.updateSize = this.updateSize.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.getBoundingBox = this.getBoundingBox.bind(this);

    //Misc
    this.tmpTransform = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    if (!this.section || !this.svg) return;

    const ARBITRARY_OFFSET = 2;
    const w = this.section.offsetWidth - ARBITRARY_OFFSET;
    const h = window.innerHeight - document.getElementsByClassName('app-header')[0].offsetHeight;

    this.svg.setAttribute('viewBox', `${-w/2} ${(-h/2)} ${w} ${h}`);
    this.svg.style.width = w + 'px';
    this.svg.style.height = h + 'px';

    const boundingBox = this.getBoundingBox();
    const svgW = boundingBox.width;
    const svgH = boundingBox.height;
    this.props.dispatch(updateViewerSize(svgW, svgH));
  }

  onImageLoad() {
    if (this.svgImage.image) {
      const imgW = (this.svgImage.image.width) ? this.svgImage.image.width : 1;
      const imgH = (this.svgImage.image.height) ? this.svgImage.image.height : 1;

      this.props.dispatch(updateImageSize(imgW, imgH));
      this.props.dispatch(resetView());
    }
  }

  getBoundingBox() {
    const boundingBox = (this.svg && this.svg.getBoundingClientRect)
      ? this.svg.getBoundingClientRect()
      : { left: 0, top: 0, width: 1, height: 1 };
    return boundingBox;
  }

  render() {
    const transform = `scale(${this.props.scaling}) translate(${this.props.translationX}, ${this.props.translationY}) rotate(${this.props.rotation}) `;
    let subjectLocation;

    if (this.props.currentSubject) {
      subjectLocation = getSubjectLocation(this.props.currentSubject, this.props.frame);
      subjectLocation = (subjectLocation && subjectLocation.src) ? subjectLocation.src : undefined;
    }

    return (
      <section className="subject-viewer" ref={(c) => { this.section = c; }}>

        <svg
          ref={(c) => { this.svg = c; }}
          viewBox="0 0 100 100"
        >
          <g transform={transform}>
            {subjectLocation && (
              <SVGImage
                ref={(c) => { this.svgImage = c; }}
                src={subjectLocation}
                onLoad={this.onImageLoad}
              />
            )}
          </g>
        </svg>
      </section>
    );
  }
}

SubjectViewer.propTypes = {
  currentSubject: PropTypes.shape({
    src: PropTypes.string
  }),
  frame: PropTypes.number,
  rotation: PropTypes.number,
  translationX: PropTypes.number,
  translationY: PropTypes.number,
  scaling: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

SubjectViewer.defaultProps = {
  currentSubject: null,
  frame: 0,
  rotation: 0,
  scaling: 1,
  translationX: 0,
  translationY: 0,
  user: null,
  viewerSize: {
    width: 0,
    height: 0
  }
};

const mapStateToProps = (state, ownProps) => {
  const sv = state.subjectViewer;
  return {
    currentSubject: state.subject.currentSubject,
    frame: sv.frame,
    scaling: sv.scaling,
    translationX: sv.translationX,
    translationY: sv.translationY,
    user: state.login.user,
    viewerSize: sv.viewerSize
  };
};
export default connect(mapStateToProps)(SubjectViewer);
