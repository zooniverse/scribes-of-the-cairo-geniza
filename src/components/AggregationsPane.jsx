import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AGGREGATIONS_PROP_TYPES, AGGREGATIONS_INITIAL_STATE } from '../ducks/aggregations'
import { toggleReminder } from '../ducks/reminder';
import HelperMessage from './HelperMessage';

const BUFFER = 8;

class AggregationsPane extends React.Component {
  constructor() {
    super();

    this.showHelpMsg = this.showHelpMsg.bind(this);
  }

  showHelpMsg(index) {
    const range = document.createRange()
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

  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;
    const rectangles = [];
    const MAGIC_KEYWORD_TABLE = [
      { word: 'apple', color: '#472B36' },
      { word: 'banana', color: '#472B36' },
      { word: 'cherry', color: '#472B36' }
    ];

    MAGIC_KEYWORD_TABLE.map((keyword, index)=>{
      if (!this.props.data) return;

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
            <rect x={x} y={y - 28} width={w} height={28} fill={'rgba(32,254,203,0.9)'} />
            <rect x={x} y={y} width={w} height={h} fill={keyword.color} opacity="0.47" />
            <text id={`keyword_index${index}`} fontFamily="Rubik" x={(x + w) - BUFFER} y={y - BUFFER} textAnchor="end">{keyword.word}</text>
            <text fontFamily="FontAwesome" x={x + BUFFER} y={y - BUFFER}>&#xf0c5;</text>
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
  data: PropTypes.object,
  dispatch: PropTypes.func,
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  })
  //...AGGREGATIONS_PROP_TYPES  //EDIT: This isn't working, need to check our Babel setup.
};

AggregationsPane.defaultProps = {
  dispatch: () => {},
  imageSize: {},
  // ...AGGREGATIONS_INITIAL_STATE,
  data: null
};

const mapStateToProps = (state) => ({
  data: state.aggregations.data
});

export default connect(mapStateToProps)(AggregationsPane);
