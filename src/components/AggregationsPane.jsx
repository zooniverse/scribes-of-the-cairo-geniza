import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AGGREGATIONS_STATUS, AGGREGATIONS_PROP_TYPES, AGGREGATIONS_INITIAL_STATE } from '../ducks/aggregations';
import { toggleReminder } from '../ducks/reminder';
import HelperMessage from './HelperMessage';

const BUFFER = 8;
const ICON_WIDTH = 40;
const PADDING = 20;

class AggregationsPane extends React.Component {
  constructor() {
    super();

    this.showHelpMsg = this.showHelpMsg.bind(this);
    this.resizeBoundingBox = this.resizeBoundingBox.bind(this);

    this.state = {
      resizedBoxes: false
    };
  }

  showHelpMsg(key) {
    const range = document.createRange();
    const node = document.getElementById(`${key}_word`);
    range.selectNode(node);
    const selection = window.getSelection();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();

    const message = 'Text copied to your clipboard! Paste into your text transcription box.';

    this.props.dispatch(toggleReminder(
      <HelperMessage message={message} width={400} />
    ));
  }

  componentWillReceiveProps(next) {
    if (next.status === AGGREGATIONS_STATUS.READY && this.state.resizedBoxes === false) {
      this.setState({ resizedBoxes: true });
      this.resizeBoundingBox();
    }
  }

  resizeBoundingBox() {
    const boxes = document.getElementsByClassName('aggregated-box');
    Array.prototype.forEach.call(boxes, (box) => {
      const header = document.getElementById(`${box.id}_header`);
      const word = document.getElementById(`${box.id}_word`);
      const icon = document.getElementById(`${box.id}_icon`);
      const headerWidth = header.getBBox().width;
      const wordWidth = word.getBBox().width;
      if ((wordWidth + ICON_WIDTH) > (headerWidth)) {
        const difference = wordWidth - headerWidth;
        header.style.width = (wordWidth + PADDING + ICON_WIDTH);
        header.x.baseVal.value -= (difference + PADDING + ICON_WIDTH);
        icon.x.baseVal[0].value -= (difference + PADDING + ICON_WIDTH);
      }
    });
  }

  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;
    const rectangles = [];
    if (!this.props.keywordWorkflow || !this.props.showHints) return null;
    let keywordTable = [];
    const workflow = this.props.keywordWorkflow;

    if (workflow.tasks && workflow.tasks.T0 && workflow.tasks.T0 && workflow.tasks.T0.tools) {
      keywordTable = workflow.tasks.T0.tools;
    }
    if (!this.props.data) return null;

    Object.keys(keywordTable).map((key) => {
      if (!this.props.data[key]) return null;
      const rectangleData = this.props.data[key];
      Object.keys(rectangleData).map((keys, index) => {
        const data = rectangleData[keys];
        const toolIndex = keys.replace(/\D/g, '');
        const tools = keywordTable[key].tools;
        const keyword = tools[toolIndex].label;
        const rectXs = data.clusters.x;
        const rectYs = data.clusters.y;
        const rectWidths = data.clusters.width;
        const rectHeights = data.clusters.height;

        if (!rectXs || !rectYs || !rectWidths || !rectHeights) return null;
        if (rectXs.length !== rectYs.length || rectXs.length !== rectWidths.length ||
          rectXs.length !== rectHeights.length) return null;

        for (let i = 0; i < rectXs.length && i < rectYs.length && i < rectWidths.length && i < rectHeights.length; i++) {
          const x = rectXs[i];
          const y = rectYs[i];
          const w = rectWidths[i];
          const h = rectHeights[i];
          const keyed = `${key}_${keys}_${index}_${i}`;

          rectangles.push(
            <g key={keyed} id={keyed} className="aggregated-box" onClick={this.showHelpMsg.bind(this, keyed)}>
              <rect
                id={`${keyed}_header`}
                x={x}
                y={y - 45}
                width={w}
                height={45}
                fill={'rgba(32,254,203,0.9)'}
              />
              <rect x={x} y={y} width={w} height={h} fill="#472B36" opacity="0.47" />
              <text
                id={`${keyed}_word`}
                className="aggregated-boxes"
                fontFamily="Rubik"
                fontSize="2.5em"
                x={(x + w) - BUFFER}
                y={y - BUFFER}
                textAnchor="end"
              >
                {keyword}
              </text>
              <text
                id={`${keyed}_icon`}
                fontFamily="FontAwesome"
                fontSize="2.5em"
                x={x + BUFFER}
                y={y - BUFFER}
              >
                &#xf0c5;
              </text>
            </g>
          );
        }
      });
    });

    return (
      <g transform={imageOffset}>
        {rectangles}
      </g>
    );
  }
}

AggregationsPane.propTypes = {
  dispatch: PropTypes.func,
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  ...AGGREGATIONS_PROP_TYPES
};

AggregationsPane.defaultProps = {
  dispatch: () => {},
  imageSize: {},
  ...AGGREGATIONS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  status: state.aggregations.status,
  data: state.aggregations.data,
  keywordWorkflow: state.aggregations.keywordWorkflow,
  showHints: state.aggregations.showHints
});

export default connect(mapStateToProps)(AggregationsPane);
