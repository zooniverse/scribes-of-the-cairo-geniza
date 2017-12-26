import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import { toggleDialog } from '../ducks/dialog';
import { Utility } from '../lib/Utility';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.popupBody = null;
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
        enableResizing={false}
        minHeight={400}
        minWidth={400}
      >
        <div
          className="popup dialog"
          tabIndex="0"
          ref={(c) => { this.popupBody = c; }}
          role="button"
          onClick={(e) => { return e.target === this.popupBody && this.close(e); }}
        >
          <div className="dialog-content">
            <div>
              {this.props.title.length ? (
                <h2>{this.props.title}</h2>
              ) : false}

              <button className="close-button" onClick={this.close}>X</button>

            </div>
            {this.props.children}
          </div>
        </div>
      </Rnd>
    );
  }
}

Dialog.defaultProps = {
  dispatch: () => {},
  enableResize: true,
  size: { height: 200, width: 200 },
  title: ''
};

Dialog.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  enableResize: PropTypes.bool,
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  title: PropTypes.string
};

const mapStateToProps = (state) => ({
  enableResize: state.dialog.enableResize,
  size: state.dialog.size,
  title: state.dialog.title
});

export default connect(mapStateToProps)(Dialog);
