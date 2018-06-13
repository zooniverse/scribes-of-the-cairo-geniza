import React from 'react';
import PropTypes from 'prop-types';

const AdminToggle = ({ adminMode, toggleAdminMode, translate }) => {
  return (
    <div className="admin-toggle">
      <input
        checked={adminMode}
        id="admin"
        onClick={toggleAdminMode}
        type="checkbox"
      />
      <label htmlFor="admin">
        <span>{translate('general.admin')}</span>
      </label>
    </div>
  );
};

AdminToggle.propTypes = {
  adminMode: PropTypes.bool.isRequired,
  toggleAdminMode: PropTypes.func.isRequired
};

export default AdminToggle;
