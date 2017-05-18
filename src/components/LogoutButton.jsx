import React from 'react';
import PropTypes from 'prop-types';

class LogoutButton extends React.Component {

  render() {
    const logout = this.props.logout;
    return (
      <div className="logout-button">
        <span>{this.props.user.login}</span>
        <button type="submit" onClick={logout}>Logout</button>
      </div>
    );
  }

}

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({ login: PropTypes.string }).isRequired,
};

export default LogoutButton;
