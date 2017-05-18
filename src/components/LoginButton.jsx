import React from 'react';
import PropTypes from 'prop-types';

class LoginButton extends React.Component {

  render() {
    return (
      <button type="submit" onClick={this.props.login}>Login</button>
    );
  }

}

LoginButton.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginButton;
