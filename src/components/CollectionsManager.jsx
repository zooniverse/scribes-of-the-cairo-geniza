import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

const ENABLE_DRAG = 'handle collections-manager';
const DISABLE_DRAG = 'collections-manager';

class CollectionsManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = { disableAdd: true };

    this.onAdd = this.onAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  onAdd() {
    this.props.addToCollections();
    this.props.onChange([]);
  }

  handleInputChange() {
    const emptyField = this.create.value.length === 0;

    if (!emptyField && this.state.disableAdd === true) {
      this.setState({ disableAdd: false });
    } else if (emptyField && this.state.disableAdd === false) {
      this.setState({ disableAdd: true });
    }
  }

  handleSubmission(e) {
    e.preventDefault();
    const value = this.create.value;
    const privateChecked = this.private.checked;
    this.props.onSubmit(value, privateChecked);
  }

  render() {
    const disableAdd = !this.props.selectedCollections.length;
    return (
      <div className={ENABLE_DRAG} ref={(c) => { this.manager = c; }}>
        <div className="collections-manager__input-div">
          <span className="collections-manager__instructions">Add to An Existing Collection</span>

          <div
            className="collections-manager__add"
            role="searchbox"
            onMouseDown={() => { this.manager.className = DISABLE_DRAG; }}
            onMouseUp={() => { this.manager.className = ENABLE_DRAG; }}
            tabIndex={0}
          >
            <div>

              <Select.Async
                multi
                onChange={this.props.onChange}
                value={this.props.selectedCollections}
                placeholder="Type to search Collections"
                loadOptions={this.props.searchCollections}
              />
            </div>
            <button className="button button__dark" disabled={disableAdd} type="button" onClick={this.onAdd}>
              Add
            </button>
          </div>
        </div>

        <hr className="white-line" />

        <div className="collections-manager__input-div">
          <span className="collections-manager__instructions">Or create a new Collection</span>

          <form className="collections-manager__create" onSubmit={this.handleSubmission}>
            <input
              ref={(el) => { this.create = el; }}
              onChange={this.handleInputChange}
              placeholder="Collection Name"
              onMouseDown={() => { this.manager.className = DISABLE_DRAG; }}
              onMouseUp={() => { this.manager.className = ENABLE_DRAG; }}
            />
            <button className="button button__dark" disabled={this.state.disableAdd} type="submit">Add</button>
          </form>
        </div>

        {this.props.error && (
          <span className="collections-manager__error">
            {this.props.error}
          </span>
        )}

        <div className="round-toggle">
          <input
            id="private"
            type="checkbox"
            ref={(el) => { this.private = el; }}
            defaultChecked={false}
          />
          <label htmlFor="private">
            <span>Private</span>
          </label>
        </div>
      </div>

    );
  }
}

CollectionsManager.propTypes = {
  addToCollections: PropTypes.func,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  searchCollections: PropTypes.func,
  selectedCollections: PropTypes.arrayOf(PropTypes.object)
};

CollectionsManager.defaultProps = {
  addToCollections: () => {},
  error: '',
  onChange: () => {},
  onSubmit: () => {},
  searchCollections: () => {},
  selectedCollections: []
};

const mapStateToProps = (state) => ({
  selectedCollections: state.collections.selectedCollections
});

export default connect(mapStateToProps)(CollectionsManager);
