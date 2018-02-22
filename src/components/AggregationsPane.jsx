import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AGGREGATIONS_STATUS, AGGREGATIONS_PROP_TYPES, AGGREGATIONS_INITIAL_STATE } from '../ducks/aggregations'
import { toggleReminder } from '../ducks/reminder';
import HelperMessage from './HelperMessage';

const BUFFER = 8;

class AggregationsPane extends React.Component {
  constructor() {
    super();

    this.showHelpMsg = this.showHelpMsg.bind(this);
    this.resizeBoundingBox = this.resizeBoundingBox.bind(this);

    this.state = {
      resizedBoxes: false
    };
  }

  showHelpMsg(index) {
    const range = document.createRange();
    const node = document.querySelector(`#keyword_index${index}`);
    range.selectNode(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    const message = 'Text copied to your clipboard! Paste into your text transcription box.';

    this.props.dispatch(toggleReminder(
      <HelperMessage message={message} width={400} />
    ));
  }

  componentWillReceiveProps(next) {
    if (next.aggregationStatus === AGGREGATIONS_STATUS.READY && this.state.resizedBoxes === false) {
      this.setState({ resizedBoxes: true });
      this.resizeBoundingBox();
    }
  }

  resizeBoundingBox() {
    const boxes = document.getElementsByClassName('aggregated-boxes');
    Array.prototype.forEach.call(boxes, (box) => {
      const bounds = box.getBBox();
      const index = box.id.substr(box.id.length - 1);
      const label = document.getElementById(`keyword_label${index}`);
      console.log(label);
      console.log(bounds.width);
    });
  }

  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;
    const rectangles = [];
    if (!this.props.keywordWorkflow) return null;
    let keywordTable = [];
    const workflow = this.props.keywordWorkflow;

    if (workflow.tasks && workflow.tasks.T0 && workflow.tasks.T0 && workflow.tasks.T0.tools) {
      keywordTable = workflow.tasks.T0.tools;
    }

    keywordTable.map((keyword, index) => {
      if (!this.props.data) return null;

      const rectXs = this.props.data[`T0_tool${index}_clusters_x`];
      const rectYs = this.props.data[`T0_tool${index}_clusters_y`];
      const rectWidths = this.props.data[`T0_tool${index}_clusters_width`];
      const rectHeights = this.props.data[`T0_tool${index}_clusters_height`];

      if (!rectXs || !rectYs || !rectWidths || !rectHeights) return;  // No data
      if (rectXs.length !== rectYs.length || rectXs.length !== rectWidths.length || rectXs.length !== rectHeights.length) return;  //Invalid data

      for (let i = 0; i < rectXs.length && i < rectYs.length && i < rectWidths.length && i < rectHeights.length; i++) {
        const x = rectXs[i];
        const y = rectYs[i];
        const w = rectWidths[i];
        const h = rectHeights[i];

        rectangles.push(
          <g key={`keyword_${index}_${i}`} className="aggregated-box" onClick={this.showHelpMsg.bind(this, index)}>
            <rect
              id={`keyword_label${index}`}
              x={x}
              y={y - 45}
              width={w}
              height={45}
              fill={'rgba(32,254,203,0.9)'}
            />
            <rect x={x} y={y} width={w} height={h} fill="#472B36" opacity="0.47" />
            <text
              id={`keyword_index${index}`}
              className="aggregated-boxes"
              fontFamily="Rubik"
              fontSize="2.5em"
              x={(x + w) - BUFFER}
              y={y - BUFFER}
              textAnchor="end"
            >
              {keyword.label}
            </text>
            <text fontFamily="FontAwesome" fontSize="2.5em" x={x + BUFFER} y={y - BUFFER}>&#xf0c5;</text>
          </g>
        );
      }
    });

    return (
      <g transform={imageOffset}>
        {rectangles}
      </g>
    );
  }
}

AggregationsPane.propTypes = {
  aggregationStatus: PropTypes.string,
  data: PropTypes.object,
  dispatch: PropTypes.func,
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  keywordWorkflow: PropTypes.shape({
    id: PropTypes.string
  })
  //...AGGREGATIONS_PROP_TYPES  //EDIT: This isn't working, need to check our Babel setup.
};

AggregationsPane.defaultProps = {
  aggregationStatus: AGGREGATIONS_STATUS.IDLE,
  dispatch: () => {},
  imageSize: {},
  // ...AGGREGATIONS_INITIAL_STATE,
  data: null,
  keywordWorkflow: null
};

const mapStateToProps = (state) => ({
  data: state.aggregations.data,
  keywordWorkflow: state.aggregations.keywordWorkflow,
  aggregationStatus: state.aggregations.status
});

export default connect(mapStateToProps)(AggregationsPane);
