import React from 'react';
import { Link } from 'react-router-dom';

const SubjectError = () => {
  return (
    <div>
      <h2 className="h1-font">Subject not available</h2>
      <Link className="button" to="/">Back to Project Home</Link>
      <button className="button button__dark" onClick={window.location.reload.bind(window.location)}>Reload Page</button>
    </div>
  );
};

export default SubjectError;
