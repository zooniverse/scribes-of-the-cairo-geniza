import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

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
      <div className="collections-manager">
        <div className="collections-manager__input-div">
          <span>Add to An Existing Collection</span>

          <div className="test">
            <Select.Async
              multi
              onChange={this.props.onChange}
              value={this.props.selectedCollections}
              placeholder="Type to search Collections"
              loadOptions={this.props.searchCollections}
            />
            <button className="button button__dark" disabled={disableAdd} type="button" onClick={this.onAdd}>
              Add
            </button>
          </div>
        </div>


        <div className="collections-manager__input-div">
          <span>Or create a new Collection</span>

          <div className="collections-manager__create">
            <input
              ref={(el) => { this.create = el; }}
              onChange={this.handleInputChange}
              placeholder="Collection Name"
            />

            <button className="button button__dark" disabled={this.state.disableAdd} type="submit">Add</button>
          </div>
        </div>

        <div>
          <label htmlFor="private">
            <input
              id="private"
              type="checkbox"
              ref={(el) => { this.private = el; }}
              defaultChecked={false}
            />
            Private
          </label>
        </div>

        {/* <div>
          <form onSubmit={this.handleSubmission}>
            <input
              ref={(el) => { this.create = el; }}
              onChange={this.handleInputChange}
              placeholder="Collection Name"
            />

            <div>
              <label htmlFor="private">
                <input
                  id="private"
                  type="checkbox"
                  ref={(el) => { this.private = el; }}
                  defaultChecked={false}
                />
                Private
              </label>
              <button className="button" disabled={this.state.disableAdd} type="submit">Add</button>
            </div>

            {this.props.error && (
              <div>
                {this.props.error}
              </div>
            )}
          </form>
        </div> */}

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
