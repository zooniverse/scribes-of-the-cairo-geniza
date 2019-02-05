import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
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

  componentWillReceiveProps(next) {
    if (next.status === AGGREGATIONS_STATUS.READY && this.state.resizedBoxes === false) {
      this.setState({ resizedBoxes: true });
      this.resizeBoundingBox();
    }
  }

  showHelpMsg(key) {
    const range = document.createRange();
    const node = document.getElementById(`${key}_word`);
    range.selectNode(node);
    const selection = window.getSelection();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();

    const message = this.props.translate('helpers.copied');

    this.props.dispatch(toggleReminder(
      <HelperMessage message={message} width={400} />
    ));
  }

  resizeBoundingBox() {
    const boxes = document.getElementsByClassName('aggregated-box');
    Array.prototype.forEach.call(boxes, (box) => {
      const header = document.getElementById(`${box.id}_header`);
      const word = document.getElementById(`${box.id}_word`);
      const icon = document.getElementById(`${box.id}_icon`);
      if (!!header && !!word && !!icon) {
        const headerWidth = header.getBBox().width;
        const wordWidth = word.getBBox().width;
        if ((wordWidth + ICON_WIDTH) > (headerWidth)) {
          const difference = wordWidth - headerWidth;
          header.style.width = (wordWidth + PADDING + ICON_WIDTH);
          header.x.baseVal.value -= (difference + PADDING + ICON_WIDTH);
          icon.x.baseVal[0].value -= (difference + PADDING + ICON_WIDTH);
        }
      }
    });
  }

  render() {
    if (!this.props.keywordWorkflow || !this.props.data) return null;

    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;
    const visibility = this.props.showHints ? 'inherit' : 'hidden';
    const rectangles = [];
    let keywordTable;

    if (this.props.keywordWorkflow.tasks) {
      keywordTable = this.props.keywordWorkflow.tasks;
    }

    Object.keys(keywordTable).map((key) => {
      if (!this.props.data[key]) return null;
      const rectangleTasks = this.props.data[key];
      Object.keys(rectangleTasks).map((task, index) => {
        const boxes = rectangleTasks[task];
        const taskIndex = task.replace(/\D/g, '');
        const tools = keywordTable[key].tools;
        const keyword = tools[taskIndex].label;
        const rectXs = boxes.clusters.x;
        const rectYs = boxes.clusters.y;
        const rectWidths = boxes.clusters.width;
        const rectHeights = boxes.clusters.height;

        if (!rectXs || !rectYs || !rectWidths || !rectHeights) return null;
        if (rectXs.length !== rectYs.length || rectXs.length !== rectWidths.length ||
          rectXs.length !== rectHeights.length) return null;

        for (let i = 0; i < rectXs.length && i < rectYs.length && i < rectWidths.length && i < rectHeights.length; i += 1) {
          const x = rectXs[i];
          const y = rectYs[i];
          const w = rectWidths[i];
          const h = rectHeights[i];
          const uniqueKey = `${key}_${task}_${index}_${i}`;

          rectangles.push(
            <g key={uniqueKey} id={uniqueKey} style={{ direction: 'ltr' }} visibility={visibility} className="aggregated-box block-transcription" onClick={this.showHelpMsg.bind(this, uniqueKey)}>
              <rect
                id={`${uniqueKey}_header`}
                x={x}
                y={y - 45}
                width={w}
                height={45}
                fill={'rgba(32,254,203,0.9)'}
              />
              <rect x={x} y={y} width={w} height={h} fill="#472B36" opacity="0.47" />
              <text
                id={`${uniqueKey}_word`}
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
                id={`${uniqueKey}_icon`}
                fontSize="2.5em"
                x={x + BUFFER}
                y={y - BUFFER}
              >
                &#x2398;
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
  translate: PropTypes.func,
  ...AGGREGATIONS_PROP_TYPES
};

AggregationsPane.defaultProps = {
  dispatch: () => {},
  imageSize: {},
  translate: () => {},
  ...AGGREGATIONS_INITIAL_STATE
};

const mapStateToProps = state => ({
  status: state.aggregations.status,
  currentLanguage: getActiveLanguage(state.locale).code,
  data: state.aggregations.data,
  keywordWorkflow: state.aggregations.keywordWorkflow,
  showHints: state.aggregations.showHints,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(AggregationsPane);
