import React from 'react';
import PropTypes from 'prop-types';

const AdminToggle = ({ adminMode, toggleAdminMode }) => {
  return (
    <div className="admin-toggle">
      <input
        checked={adminMode}
        id="admin"
        onClick={toggleAdminMode}
        type="checkbox"
      />
      <label htmlFor="admin">
        <span>Admin</span>
      </label>
    </div>
  );
};

AdminToggle.propTypes = {
  adminMode: PropTypes.bool.isRequired,
  toggleAdminMode: PropTypes.func.isRequired
};

export default AdminToggle;
