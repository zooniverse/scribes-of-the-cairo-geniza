import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFavorite } from '../ducks/subject';
import FavoritesButton from '../components/FavoritesButton';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    this.props.dispatch(toggleFavorite());
  }

  render() {
    return (
      <section className="toolbar">
        <button>&#x02A01;</button>
        <button><i className="fa fa-arrows" /></button>

        <hr />

        <button><i className="fa fa-plus" /></button>
        <button><i className="fa fa-minus" /></button>
        <button><i className="fa fa-repeat" /></button>
        <button><i className="fa fa-adjust" /></button>
        <button><i className="fa fa-eye" /></button>
        <button><i className="fa fa-refresh" /></button>

        <hr />

        {this.props.user && (
          <FavoritesButton favorite={this.props.favoriteSubject} toggleFavorite={this.toggleFavorite} />
        )}

        <button><i className="fa fa-list" /></button>
      </section>
    );
  }
}

Toolbar.propTypes = {
  dispatch: PropTypes.func,
  favoriteSubject: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

Toolbar.defaultProps = {
  dispatch: () => {},
  favoriteSubject: false,
  user: null
};

const mapStateToProps = (state) => ({
  favoriteSubject: state.subject.favorite,
  user: state.login.user
});

export default connect(mapStateToProps)(Toolbar);
