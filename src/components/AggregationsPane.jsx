import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AGGREGATIONS_PROP_TYPES, AGGREGATIONS_INITIAL_STATE } from '../ducks/aggregations'

class AggregationsPane extends React.Component {
  render() {
    const imageOffset = `translate(${-this.props.imageSize.width / 2}, ${-this.props.imageSize.height / 2})`;
    
    const rectangles = [];
    const MAGIC_KEYWORD_TABLE = [
      { word: 'apple', color: 'rgba(255,0,0,0.5)' },
      { word: 'banana', color: 'rgba(255,255,0,0.5)' },
      { word: 'cherry', color: 'rgba(0,255,0,0.5)' },
    ];
    
    MAGIC_KEYWORD_TABLE.map((keyword, index)=>{
      console.log('x'.repeat(80), this.props.aggData);
      
      if (!this.props.aggData) return;
      
      const rectXs = this.props.aggData[`T0_tool${index}_clusters_x`];
      const rectYs = this.props.aggData[`T0_tool${index}_clusters_y`];
      const rectWidths = this.props.aggData[`T0_tool${index}_clusters_width`];
      const rectHeights = this.props.aggData[`T0_tool${index}_clusters_height`];
      
      if (!rectXs || !rectYs || !rectWidths || !rectHeights) return;  //No data
      if (rectXs.length !== rectYs.length || rectXs.length !== rectWidths.length || rectXs.length !== rectHeights.length) return;  //Invalid data
      
      for (let i = 0; i < rectXs.length && i < rectYs.length && i < rectWidths.length && i < rectHeights.length; i++) {
        const x = rectXs[i];
        const y = rectYs[i];
        const w = rectWidths[i];
        const h = rectHeights[i];
        
        rectangles.push(
          <g key={`keyword_${index}_${i}`} onClick={()=>{alert(keyword.word)}}>
            <rect x={x} y={y} width={w} height={h} fill={keyword.color} />
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
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  //...AGGREGATIONS_PROP_TYPES  //EDIT: This isn't working, need to check our Babel setup.
};

AggregationsPane.defaultProps = {
  imageSize: {},
  //...AGGREGATIONS_PROP_STATE
  aggData: null,
};

//TODO: Think of a way to streamline this.
const mapStateToProps = (state) => ({
  aggData: state.aggregations.aggData,
});

export default connect(mapStateToProps)(AggregationsPane);
