import React from 'react';
import PropTypes from 'prop-types';
import { Utility } from '../lib/Utility';
import { connect } from 'react-redux';

class AnnotationsPane extends React.Component {
  renderAnnotationInProgress() {
    if (!this.props.annotationInProgress) return null;

    const svgPointPrefix = 'ANNOTATION_IN_PROGRESS_POINT_';
    const svgPoints = [];

    for (let i = 0; i < this.props.annotationInProgress.points.length; i += 1) {
      const point = this.props.annotationInProgress.points[i];
      svgPoints.push(
        <circle
          key={svgPointPrefix + i}
          cx={point.x}
          cy={point.y}
          r={10}
          fill="#17aa56"
        />,
      );
    }
    return (
      <g className="annotation-in-progress">
        {svgPoints}
      </g>
    );
  }

  renderAnnotations() {
    if (!this.props.annotations.length) return null;

    const annotationPrefix = 'ANNOTATION_';
    return this.props.annotations.map((annotation, index) => {
      if (annotation.frame !== this.props.frame) return null;

      //If Show Previous Marks is disabled, show nothing EXCEPT for the selected annotation.
      if (!this.props.showMarks && annotation !== this.props.selectedAnnotation) return;

      const onSelectAnnotation = this.props.onSelectAnnotation;
      const svgPointPrefix = `ANNOTATION_${index}_POINT_`;
      const svgPoints = [];
      const fill = annotation === this.props.selectedAnnotation ? '#17AA56' : '#00CED1';

      for (let i = 0; i < 2; i += 1) {
        const point = annotation.points[i];

        svgPoints.push(
          <circle
            key={svgPointPrefix + i}
            cx={point.x}
            cy={point.y}
            r={10}
            fill={fill}
          />,
        );
      }

      return (
        <g
          className="annotation"
          key={annotationPrefix + index}
          onClick={(e) => {
            if (onSelectAnnotation) {
              onSelectAnnotation(index);
            }
            return Utility.stopEvent(e);
          }}
          onMouseDown={e => Utility.stopEvent(e)}
          onMouseUp={e => Utility.stopEvent(e)}
          onTouchStart={e => Utility.stopEvent(e)}
        >
          {svgPoints}
        </g>
      );
    });
  }

  renderConsensusLines() {
    console.log("GET HERE ==============");
    console.log(this.props.consensusLines);
    if (!this.props.consensusLines) return null;

    return this.props.consensusLines.map((annotation, index) => {
      console.log("AN ANNOTATION");
      console.log(annotation);
    });
  }

  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;

    return (
      <g transform={imageOffset}>
        {this.renderAnnotationInProgress()}
        {this.renderAnnotations()}
        {this.renderConsensusLines()}
      </g>
    );
  }
}

AnnotationsPane.propTypes = {
  annotationInProgress: PropTypes.shape({
    text: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }))
  }),
  annotations: PropTypes.arrayOf(PropTypes.object),
  consensusLines: PropTypes.arrayOf(PropTypes.object),
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  frame: PropTypes.number,
  onSelectAnnotation: PropTypes.func,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showMarks: PropTypes.bool.isRequired
};

AnnotationsPane.defaultProps = {
  annotationInProgress: null,
  annotations: [],
  consensusLines: [],
  imageSize: {},
  frame: 0,
  onSelectAnnotation: () => {},
  selectedAnnotation: null,
  showMarks: true
};

export default AnnotationsPane;
