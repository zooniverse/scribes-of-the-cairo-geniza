import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSubjectLocation } from '../lib/get-subject-location';
import { subjectError, SUBJECT_STATUS } from '../ducks/subject';
import SubjectError from '../components/SubjectError';
import { Utility } from '../lib/Utility';

import {
  resetView, setTranslation,
  updateImageSize,
  updateViewerSize, SUBJECTVIEWER_STATE
} from '../ducks/subject-viewer';

import SVGImage from '../components/SVGImage';

const INPUT_STATE = {
  IDLE: 0,
  ACTIVE: 1
};

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
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.getPointerXY = this.getPointerXY.bind(this);
    this.getPointerXYOnImage = this.getPointerXYOnImage.bind(this);

    //Misc
    this.tmpTransform = null;

    this.pointer = {
      start: { x: 0, y: 0 },
      now: { x: 0, y: 0 },
      state: INPUT_STATE.IDLE
    };
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

  onMouseDown(e) {
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      const pointerXY = this.getPointerXY(e);
      this.pointer.state = INPUT_STATE.ACTIVE;
      this.pointer.start = { x: pointerXY.x, y: pointerXY.y };
      this.pointer.now = { x: pointerXY.x, y: pointerXY.y };
      this.tmpTransform = {
        scale: this.props.scaling,
        translateX: this.props.translationX,
        translateY: this.props.translationY
      };
      return Utility.stopEvent(e);
    } else if (this.props.viewerState === SUBJECTVIEWER_STATE.ANNOTATING) {
      return Utility.stopEvent(e);
    }
  }

  onMouseUp(e) {
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      const pointerXY = this.getPointerXY(e);
      this.pointer.state = INPUT_STATE.IDLE;
      this.pointer.now = { x: pointerXY.x, y: pointerXY.y };
      this.tmpTransform = false;
      return Utility.stopEvent(e);
    }
    // TODO: Add annotation functionality
    // else if (this.props.viewerState === SUBJECTVIEWER_STATE.ANNOTATING) {
    //   const pointerXYOnImage = this.getPointerXYOnImage(e);
    //   if (this.props.annotationInProgress && this.props.annotationInProgress.points.length >= 2) {
    //     const i = this.props.annotationInProgress.points.length - 1;
    //     const points = this.props.annotationInProgress.points;
    //
    //     const straight = this.angleDegree(pointerXYOnImage, points[i], points[i - 1]);
    //     if (!straight) return Utility.stopEvent(e);
    //   }
    //   this.props.dispatch(addAnnotationPoint(pointerXYOnImage.x, pointerXYOnImage.y, this.props.frame));
    // }
  }

  onMouseMove(e) {
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      const pointerXY = this.getPointerXY(e);
      this.pointer.now = { x: pointerXY.x, y: pointerXY.y };
      if (this.pointer.state === INPUT_STATE.ACTIVE && this.tmpTransform) {
        const pointerDelta = {
          x: this.pointer.now.x - this.pointer.start.x,
          y: this.pointer.now.y - this.pointer.start.y
        };
        this.props.dispatch(setTranslation(
          this.tmpTransform.translateX + (pointerDelta.x / this.tmpTransform.scale),
          this.tmpTransform.translateY + (pointerDelta.y / this.tmpTransform.scale),
        ));
      }
      return Utility.stopEvent(e);
    }
  }

  onMouseLeave(e) {
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      this.pointer.state = INPUT_STATE.IDLE;
      return Utility.stopEvent(e);
    }
  }

  getPointerXY(e) {
    const boundingBox = this.getBoundingBox();
    let clientX = 0;
    let clientY = 0;
    if (e.clientX && e.clientY) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches.length > 0 && e.touches[0].clientX &&
        e.touches[0].clientY) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const sizeRatioX = 1;
    const sizeRatioY = 1;

    const inputX = (clientX - boundingBox.left) * sizeRatioX;
    const inputY = (clientY - boundingBox.top) * sizeRatioY;

    return { x: inputX, y: inputY };
  }

  getPointerXYOnImage(e) {
    // Get the coordinates of the pointer on the Subject Viewer first.
    const pointerXY = this.getPointerXY(e);
    let inputX = pointerXY.x;
    let inputY = pointerXY.y;

    //  Safety checks
    if (this.props.scaling === 0) {
      alert('ERROR: unexpected issue with Subject image scaling.');
      console.error('ERROR: Invalid value - SubjectViewer.props.scaling is 0.');
      return pointerXY;
    }

    // Compensate for the fact that the SVG Viewer has an offset that makes its
    // centre (not its top-left) is the (0,0) origin.
    inputX = inputX - (this.props.viewerSize.width / 2);
    inputY = inputY - (this.props.viewerSize.height / 2);

    // Compensate for SVG transformations: scaling, then translations (in order)
    inputX = (inputX / this.props.scaling) - this.props.translationX;
    inputY = (inputY / this.props.scaling) - this.props.translationY;

    // Compensate for SVG transformation: rotation
    const rotation = (-this.props.rotation / 180) * Math.PI;
    const tmpX = inputX;
    const tmpY = inputY;
    inputX = tmpX * Math.cos(rotation) - tmpY * Math.sin(rotation);
    inputY = tmpX * Math.sin(rotation) + tmpY * Math.cos(rotation);

    // Compensate for the Subject image having an offset that aligns its centre
    // to the (0,0) origin
    inputX = inputX + (this.props.imageSize.width / 2);
    inputY = inputY + (this.props.imageSize.height / 2);

    return { x: inputX, y: inputY };
  }

  render() {
    const transform = `scale(${this.props.scaling}) translate(${this.props.translationX}, ${this.props.translationY}) rotate(${this.props.rotation}) `;
    const cursor = this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING ? 'cursor-move' : 'cursor-crosshairs';
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
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
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
      <section className={`subject-viewer ${errorStyle} ${cursor}`} ref={(c) => { this.section = c; }}>
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
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
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
  }),
  viewerState: PropTypes.string
};

SubjectViewer.defaultProps = {
  contrast: false,
  currentSubject: null,
  dispatch: () => {},
  frame: 0,
  imageSize: { width: 0, height: 0 },
  rotation: 0,
  scaling: 1,
  subjectStatus: '',
  translationX: 0,
  translationY: 0,
  user: null,
  viewerSize: { width: 0, height: 0 },
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    contrast: sv.contrast,
    currentSubject: state.subject.currentSubject,
    frame: sv.frame,
    imageSize: sv.imageSize,
    rotation: sv.rotation,
    scaling: sv.scaling,
    subjectStatus: state.subject.status,
    translationX: sv.translationX,
    translationY: sv.translationY,
    user: state.login.user,
    viewerSize: sv.viewerSize,
    viewerState: sv.viewerState
  };
};
export default connect(mapStateToProps)(SubjectViewer);
