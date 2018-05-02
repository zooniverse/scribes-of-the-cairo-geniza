import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleReminder } from '../ducks/reminder';

const QUARTER_OF_PAGE = 0.25;

class HelperMessage extends React.Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleReminder(null));
  }

  render() {
    const y = this.props.viewerSize.height * QUARTER_OF_PAGE;

    return (
      <g className="block-transcription" style={{ direction: 'ltr' }}>
        <rect
          x={-(this.props.width / 2)}
          y={y}
          width={this.props.width}
          height={35}
          rx="20px"
          ry="20px"
          fill={'rgba(32,254,203,0.9)'}
        />

        <text
          x={-(this.props.width / 2) + 18}
          y={y + 20}
          fontFamily="Merriweather"
          fill="#472B36"
          fontSize="10px"
          fontWeight="700"
        >
          {this.props.message}
        </text>

        <text
          x={(this.props.width / 2) - 18}
          y={y + 20}
          className="close-reminder"
          fontFamily="FontAwesome"
          fill="#472B36"
          fontSize="10px"
          fontWeight="700"
          textAnchor="end"
          onClick={this.onClose}
        >
          &#xf00d;
        </text>
      </g>
    );
  }
}

HelperMessage.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.string,
  viewerSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  width: PropTypes.number
};

HelperMessage.defaultProps = {
  dispatch: () => {},
  message: '',
  viewerSize: {},
  width: 0
};

const mapStateToProps = state => ({
  viewerSize: state.subjectViewer.viewerSize
});

export default connect(mapStateToProps)(HelperMessage);
