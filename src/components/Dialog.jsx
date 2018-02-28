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
    this.updateSize = this.updateSize.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleDialog(null));
  }

  close(e) {
    this.onClose();
    return Utility.stopEvent(e);
  }

  updateSize(size) {
    this.rnd.updateSize(size);
  }

  render() {
    const height = this.props.size.height;
    const width = this.props.size.width;
    const x = (window.innerWidth / 2) - (width / 2);
    const y = ((window.innerHeight / 2) - (height / 2)) + window.pageYOffset;

    const defaultPosition = { x, y, height, width };
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { updateSize: this.updateSize });
    });

    return (
      <Rnd
        default={defaultPosition}
        dragHandlerClassName={'.handle'}
        ref={c => { this.rnd = c; }}
        enableResizing={false}
        minHeight={400}
        minWidth={400}
      >
        <div
          className="popup dialog"
          tabIndex="0"
          role="button"
        >
          <hr className="handle drag-bar" />
          <div className="dialog-content">
            {this.props.title.length ? (
              <div className="handle dialog-content__header">
                <div>
                  <h2>{this.props.title}</h2>
                  <hr className="plum-line" />
                  <button className="close-button" onClick={this.close}>X</button>
                </div>
              </div>
            ) : false}
            {children}
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
