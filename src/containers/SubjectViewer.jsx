import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSubjectLocation } from '../lib/get-subject-location';
import { subjectError, SUBJECT_STATUS } from '../ducks/subject';
import SubjectError from '../components/SubjectError';

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
    this.onImageError = this.onImageError.bind(this);
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

    const w = this.section.offsetWidth;
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
    if (this.svgImage && this.svgImage.image) {
      const imgW = (this.svgImage.image.width) ? this.svgImage.image.width : 1;
      const imgH = (this.svgImage.image.height) ? this.svgImage.image.height : 1;

      this.props.dispatch(updateImageSize(imgW, imgH));
      this.props.dispatch(resetView());
    }
  }

  onImageError() {
    this.props.dispatch(subjectError());
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
    let renderedItem;
    const subjectLoadError = this.props.subjectStatus === SUBJECT_STATUS.ERROR;

    if (this.props.currentSubject) {
      subjectLocation = getSubjectLocation(this.props.currentSubject, this.props.frame);
      subjectLocation = (subjectLocation && subjectLocation.src) ? subjectLocation.src : undefined;
    }

    const errorStyle = subjectLoadError ? 'subject-viewer__error' : '';

    if (subjectLoadError) {
      renderedItem = <SubjectError />;
    } else {
      renderedItem = (
        <svg
          ref={(c) => { this.svg = c; }}
          viewBox="0 0 100 100"
        >
          <g transform={transform}>
            {subjectLocation && (
              <SVGImage
                contrast={this.props.contrast}
                ref={(c) => { this.svgImage = c; }}
                src={subjectLocation}
                onLoad={this.onImageLoad}
                onError={this.onImageError}
              />
            )}
          </g>
          <defs>
            <filter id="svg-invert-filter">
              <feComponentTransfer>
                <feFuncR type="table" tableValues="1 0" />
                <feFuncG type="table" tableValues="1 0" />
                <feFuncB type="table" tableValues="1 0" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      );
    }

    return (
      <section className={`subject-viewer ${errorStyle}`} ref={(c) => { this.section = c; }}>
        {renderedItem}
      </section>
    );
  }
}

SubjectViewer.propTypes = {
  contrast: PropTypes.bool,
  currentSubject: PropTypes.shape({
    src: PropTypes.string
  }),
  dispatch: PropTypes.func,
  frame: PropTypes.number,
  rotation: PropTypes.number,
  translationX: PropTypes.number,
  translationY: PropTypes.number,
  scaling: PropTypes.number,
  subjectStatus: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

SubjectViewer.defaultProps = {
  contrast: false,
  currentSubject: null,
  frame: 0,
  rotation: 0,
  scaling: 1,
  subjectStatus: '',
  translationX: 0,
  translationY: 0,
  user: null,
  viewerSize: {
    width: 0,
    height: 0
  }
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    contrast: sv.contrast,
    currentSubject: state.subject.currentSubject,
    frame: sv.frame,
    rotation: sv.rotation,
    scaling: sv.scaling,
    subjectStatus: state.subject.status,
    translationX: sv.translationX,
    translationY: sv.translationY,
    user: state.login.user,
    viewerSize: sv.viewerSize
  };
};
export default connect(mapStateToProps)(SubjectViewer);
