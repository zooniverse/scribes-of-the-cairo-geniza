import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import { toggleDialog } from '../ducks/dialog';
import { Utility } from '../lib/Utility';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleDialog(null));
  }

  close(e) {
    this.onClose();
    return Utility.stopEvent(e);
  }

  render() {
    const height = this.props.size.height;
    const width = this.props.size.width;
    const x = (window.innerWidth / 2) - (width / 2);
    const y = ((window.innerHeight / 2) - (height / 2)) + window.pageYOffset;

    const defaultPosition = { x, y, height, width };

    return (
      <Rnd
        default={defaultPosition}
        dragHandlerClassName={'.handle'}
        enableResizing={false}
        minHeight={400}
        minWidth={400}
      >
        <div
          className="popup dialog"
          tabIndex="0"
          role="button"
        >
          <div className="dialog-content">
            {this.props.title.length ? (
              <div>
                <div className="dialog-content__header">
                  <h2>{this.props.title}</h2>
                  <hr />
                </div>
                <button className="close-button" onClick={this.close}>X</button>
              </div>
            ) : false}
            {this.props.children}
          </div>
        </div>
      </Rnd>
    );
  }
}

Dialog.defaultProps = {
  dispatch: () => {},
  size: { height: 200, width: 200 },
  title: ''
};

Dialog.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  title: PropTypes.string
};

const mapStateToProps = (state) => ({
  size: state.dialog.size,
  title: state.dialog.title
});

export default connect(mapStateToProps)(Dialog);
