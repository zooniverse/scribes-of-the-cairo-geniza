import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SaveClip from '../components/SaveClip';
import { toggleDialog } from '../ducks/dialog';
import { SUBJECTVIEWER_STATE } from '../ducks/subject-viewer';

const MINIMUM_SIZE = 10;

class Crop extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.state = {
      rectangleNow: null
    };
  }

  componentWillMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    const points = this.findPoints();
    const dimensions = { height: 350, width: 400 };
    if (points.width > MINIMUM_SIZE && points.height > MINIMUM_SIZE &&
      this.props.viewerState === SUBJECTVIEWER_STATE.CROPPING) {
      this.props.dispatch(toggleDialog(
        <SaveClip points={points} />, 'Save Snippet to Cribsheet', dimensions, 'Save Clip'));
    }
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    if (this.props.mouseInViewer && this.props.getPointerXY) {
      const rectangleNow = this.props.getPointerXY(e);
      this.setState({ rectangleNow });
    }
  }

  findPoints() {
    const rectangleNow = this.state.rectangleNow || this.props.rectangleStart;
    return {
      x: Math.min(this.props.rectangleStart.x, rectangleNow.x),
      y: Math.min(this.props.rectangleStart.y, rectangleNow.y),
      width: Math.abs(this.props.rectangleStart.x - rectangleNow.x),
      height: Math.abs(this.props.rectangleStart.y - rectangleNow.y)
    };
  }

  render() {
    const points = this.findPoints();
    return (
      <g transform={`translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`}>
        <rect
          x={points.x}
          y={points.y}
          width={points.width}
          height={points.height}
          style={{ fill: 'none', strokeWidth: '5', stroke: '#20FECB' }}
        />
      </g>
    );
  }
}

Crop.propTypes = {
  dispatch: PropTypes.func,
  getPointerXY: PropTypes.func,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  mouseInViewer: PropTypes.bool,
  rectangleStart: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  viewerState: PropTypes.string
};

Crop.defaultProps = {
  dispatch: () => {},
  getPointerXY: () => {},
  imageSize: { width: 0, height: 0 },
  mouseInViewer: false,
  rectangleStart: { x: 0, y: 0 },
  viewerState: SUBJECTVIEWER_STATE.CROPPING
};

const mapStateToProps = (state) => {
  return {
    viewerState: state.subjectViewer.viewerState
  };
};

export default connect(mapStateToProps)(Crop);
