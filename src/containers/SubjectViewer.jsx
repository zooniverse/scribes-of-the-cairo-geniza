import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Utility, KEY_CODES } from '../lib/Utility';
import { getSubjectLocation } from '../lib/get-subject-location';
import { subjectError, SUBJECT_STATUS } from '../ducks/subject';
import SubjectError from '../components/SubjectError';

import {
  resetView, setTranslation, updateImageSize,
  updateViewerSize, setViewerState,
  SUBJECTVIEWER_STATE
} from '../ducks/subject-viewer';

import { addAnnotationPoint, completeAnnotation, selectAnnotation } from '../ducks/annotations';
import { toggleAnnotation } from '../ducks/dialog';
import { shownMarkReminder, toggleReminder } from '../ducks/reminder';

import AnnotationsPane from '../components/AnnotationsPane';
import AggregationsPane from '../components/AggregationsPane';
import SelectedAnnotation from '../components/SelectedAnnotation';
import SVGImage from '../components/SVGImage';
import Crop from '../components/Crop';

const INPUT_STATE = {
  IDLE: 0,
  ACTIVE: 1
};

const ANNOTATION_BOX_DIMENSIONS = { height: 600, width: 760 };
const ANNOTATION_BOX_NO_KEYBOARD_DIMENSIONS = { height: 275, width: 760 };

class SubjectViewer extends React.Component {
  constructor(props) {
    super(props);

    // HTML element refs.
    this.section = null;
    this.svg = null;
    this.svgImage = null;

    // Events!
    this.updateSize = this.updateSize.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.getBoundingBox = this.getBoundingBox.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.getPointerXY = this.getPointerXY.bind(this);
    this.getPointerXYOnImage = this.getPointerXYOnImage.bind(this);
    this.onSelectAnnotation = this.onSelectAnnotation.bind(this);
    this.escapeCrop = this.escapeCrop.bind(this);

    // Misc
    this.tmpTransform = null;
    this.rectangleStart = { x: 0, y: 0 };
    this.pointer = {
      start: { x: 0, y: 0 },
      now: { x: 0, y: 0 },
      state: INPUT_STATE.IDLE
    };

    this.state = {
      cropping: INPUT_STATE.IDLE,
      mouseInViewer: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
    document.addEventListener('keyup', this.escapeCrop);
    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
    document.removeEventListener('keyup', this.escapeCrop);
  }

  onImageLoad() {
    if (this.svgImage && this.svgImage.image) {
      const imgW = (this.svgImage.image.width) ? this.svgImage.image.width : 1;
      const imgH = (this.svgImage.image.height) ? this.svgImage.image.height : 1;

      this.props.dispatch(updateImageSize(imgW, imgH));
      this.props.dispatch(resetView());
    }
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

  onImageError() {
    this.props.dispatch(subjectError());
  }

  getBoundingBox() {
    const boundingBox = (this.svg && this.svg.getBoundingClientRect)
      ? this.svg.getBoundingClientRect()
      : { left: 0, top: 0, width: 1, height: 1 };
    return boundingBox;
  }

  escapeCrop(e) {
    if (Utility.getKeyCode(e) === KEY_CODES.ESCAPE && this.props.viewerState === SUBJECTVIEWER_STATE.CROPPING) {
      this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.NAVIGATING));
      this.setState({ cropping: INPUT_STATE.IDLE });
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
    } else if (e.changedTouches && e.changedTouches.length > 0 &&
        e.changedTouches[0].clientX && e.changedTouches[0].clientY) {
      //Special workaround for Chrome desktop in tablet emulation. Need to
      //confirm if this is sufficient for actual touch devices.
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    // SVG scaling: usually not an issue.
    const sizeRatioX = 1;
    const sizeRatioY = 1;

    const inputX = (clientX - boundingBox.left) * sizeRatioX;
    const inputY = (clientY - boundingBox.top) * sizeRatioY;

    return { x: inputX, y: inputY };
  }

  getPointerXYOnImage(e) {
    const pointerXY = this.getPointerXY(e);
    let inputX = pointerXY.x;
    let inputY = pointerXY.y;

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
    } else if (this.props.viewerState === SUBJECTVIEWER_STATE.CROPPING) {
      const pointerXY = this.getPointerXYOnImage(e);
      this.rectangleStart = { x: pointerXY.x, y: pointerXY.y };
      this.setState({ cropping: INPUT_STATE.ACTIVE });
    }
    return Utility.stopEvent(e);
  }

  onMouseUp(e) {
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      const pointerXY = this.getPointerXY(e);
      this.pointer.state = INPUT_STATE.IDLE;
      this.pointer.now = { x: pointerXY.x, y: pointerXY.y };
      this.tmpTransform = false;
    } else if (this.props.viewerState === SUBJECTVIEWER_STATE.ANNOTATING) {
      if (!this.props.shownMarkReminder) {
        this.props.dispatch(shownMarkReminder());
        this.props.dispatch(toggleReminder(null));
      }
      if (this.props.selectedAnnotation) { return; }
      if (e.target.parentNode.className.baseVal.indexOf('block-transcription') >= 0) {
        return;
      }
      const pointerXYOnImage = this.getPointerXYOnImage(e);
      this.props.dispatch(addAnnotationPoint(pointerXYOnImage.x, pointerXYOnImage.y, this.props.frame));
      if (this.props.annotationInProgress && this.props.annotationInProgress.points &&
          this.props.annotationInProgress.points.length > 1) {
        const dimensions = this.props.showKeyboard ? ANNOTATION_BOX_DIMENSIONS : ANNOTATION_BOX_NO_KEYBOARD_DIMENSIONS;
        this.props.dispatch(toggleAnnotation(<SelectedAnnotation />, dimensions));
        this.props.dispatch(completeAnnotation());
      }
    } else if (this.props.viewerState === SUBJECTVIEWER_STATE.CROPPING) {
      this.setState({ cropping: INPUT_STATE.IDLE });
      this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.NAVIGATING));
    }
    return Utility.stopEvent(e);
  }

  onMouseLeave(e) {
    this.setState({ mouseInViewer: false });
    if (this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) {
      this.pointer.state = INPUT_STATE.IDLE;
    }
    return Utility.stopEvent(e);
  }

  onMouseEnter(e) {
    this.setState({ mouseInViewer: true });
    return Utility.stopEvent(e);
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
          this.tmpTransform.translateX + pointerDelta.x / this.tmpTransform.scale,
          this.tmpTransform.translateY + pointerDelta.y / this.tmpTransform.scale,
        ));
      }
    }
    if (!this.state.mouseInViewer) {
      this.setState({ mouseInViewer: true });
    }

    return Utility.stopEvent(e);
  }

  onSelectAnnotation(indexOfAnnotation) {
    this.props.dispatch(selectAnnotation(indexOfAnnotation));
    const dimensions = this.props.showKeyboard ? ANNOTATION_BOX_DIMENSIONS : ANNOTATION_BOX_NO_KEYBOARD_DIMENSIONS;
    this.props.dispatch(toggleAnnotation(<SelectedAnnotation />, dimensions));
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

    if (subjectLoadError) {
      renderedItem = <SubjectError />;
    } else {
      renderedItem = (
        <svg
          ref={(c) => { this.svg = c; }}
          viewBox="0 0 100 100"
          onMouseEnter={this.onMouseEnter}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onTouchMove={this.onMouseMove}
          onTouchCancel={this.onMouseLeave}
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
            <AnnotationsPane
              imageSize={this.props.imageSize}
              annotationInProgress={this.props.annotationInProgress}
              annotations={this.props.annotations}
              selectedAnnotation={this.props.selectedAnnotation}
              showMarks={this.props.showMarks}
              frame={this.props.frame}
              getPointerXY={this.getPointerXYOnImage}
              onSelectAnnotation={this.onSelectAnnotation}
            />
            <AggregationsPane imageSize={this.props.imageSize} />
          </g>

          {this.state.cropping === INPUT_STATE.ACTIVE && (
            <g transform={transform}>
              <Crop
                getPointerXY={this.getPointerXYOnImage}
                imageSize={this.props.imageSize}
                mouseInViewer={this.state.mouseInViewer}
                rectangleStart={this.rectangleStart}
              />
            </g>
          )}

          {this.props.reminder ? (
            <g>
              {this.props.reminder}
            </g>
          ) : false}

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
      <section
        className={classnames(`subject-viewer ${cursor}`, {
          'subject-viewer__error': subjectLoadError
        })}
        ref={(c) => { this.section = c; }}
      >
        {renderedItem}

      </section>
    );
  }
}

SubjectViewer.propTypes = {
  annotationInProgress: PropTypes.shape({
    text: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }))
  }),
  annotations: PropTypes.arrayOf(PropTypes.object),
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
  reminder: PropTypes.node,
  rotation: PropTypes.number,
  translationX: PropTypes.number,
  translationY: PropTypes.number,
  scaling: PropTypes.number,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showKeyboard: PropTypes.bool,
  shownMarkReminder: PropTypes.bool,
  showMarks: PropTypes.bool,
  subjectStatus: PropTypes.string,
  viewerSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  viewerState: PropTypes.string
};

SubjectViewer.defaultProps = {
  annotationInProgress: null,
  annotations: [],
  contrast: false,
  currentSubject: null,
  dispatch: () => {},
  frame: 0,
  imageSize: { width: 0, height: 0 },
  reminder: null,
  rotation: 0,
  scaling: 1,
  selectedAnnotation: null,
  showKeyboard: true,
  shownMarkReminder: false,
  showMarks: true,
  subjectStatus: '',
  translationX: 0,
  translationY: 0,
  viewerSize: {
    width: 0,
    height: 0
  },
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    annotationInProgress: state.annotations.annotationInProgress,
    annotations: state.annotations.annotations,
    contrast: sv.contrast,
    currentSubject: state.subject.currentSubject,
    frame: sv.frame,
    imageSize: sv.imageSize,
    reminder: state.reminder.node,
    rotation: sv.rotation,
    scaling: sv.scaling,
    selectedAnnotation: state.annotations.selectedAnnotation,
    showKeyboard: state.keyboard.showKeyboard,
    shownMarkReminder: state.reminder.shownMarkReminder,
    showMarks: state.subjectViewer.showMarks,
    subjectStatus: state.subject.status,
    translationX: sv.translationX,
    translationY: sv.translationY,
    viewerSize: sv.viewerSize,
    viewerState: sv.viewerState
  };
};
export default connect(mapStateToProps)(SubjectViewer);
