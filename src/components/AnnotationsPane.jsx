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
    if (!this.props.consensusLines) return null;

    return this.props.consensusLines.map((annotation, index) => {
      const svgPointPrefix = `CONSENSUS_${index}_POINT_`;

      const svgPoints = [];
      for (let i = 0; i < 2; i += 1) {
        const point = annotation.points[i];

        svgPoints.push(
          <circle
            key={svgPointPrefix + i}
            cx={point.x}
            cy={point.y}
            r={10}
            fill="#979797"
          />,
        );
      }

      return (
        <g
          key={`CONSENSUS_LINE_${index}`}
          onMouseOver={(e) => {
            this.tooltip.style.visibility = 'visible';
            return Utility.stopEvent(e);
          }}
          onMouseOut={(e) => {
            this.tooltip.style.visibility = 'hidden';
            return Utility.stopEvent(e);
          }}
          onMouseMove={(e) => {
            const cursor = this.props.getPointerXY(e);
            let rotationOffset;
            switch (this.props.rotation) {
              case 90:
                rotationOffset = 270;
                break;
              case 270:
                rotationOffset = 90;
                break;
              default:
                rotationOffset = this.props.rotation;
            }
            this.tooltip.setAttribute('transform', `translate(${cursor.x}, ${cursor.y}) rotate(${rotationOffset})`);
            return Utility.stopEvent(e);
          }}
        >
          {svgPoints}
        </g>
      );
    });
  }

  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;

    return (
      <g transform={imageOffset}>
        {this.renderAnnotationInProgress()}
        {this.renderAnnotations()}
        {this.renderConsensusLines()}

        <g ref={(el) => { this.tooltip = el; }} className="tooltip">
          <defs>
            <filter id="shadow" height="180%">
              <feDropShadow dy="4" stdDeviation="4" floodColor="#4a4a4a" />
            </filter>
          </defs>

          <rect x="25" y="-30" width="375" height="45" fill="#979797" filter="url(#shadow)" />
          <polygon points="10,-6 25,-12 25,0" fill="#979797" />
          <text x="43" fill="#fff" fontFamily="Playfair Display" fontSize="26">
            This line has been completed
          </text>
        </g>
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
  getPointerXY: PropTypes.func,
  onSelectAnnotation: PropTypes.func,
  rotation: PropTypes.number,
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
  getPointerXY: () => {},
  onSelectAnnotation: () => {},
  rotation: 0,
  selectedAnnotation: null,
  showMarks: true
};

export default AnnotationsPane;
