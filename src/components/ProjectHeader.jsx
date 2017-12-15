import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectHeader() {
  return (
    <section className="project-header">
      <div>
        <ul className="tertiary-label">
          <li>
            <Link
              className="project-header__link"
              to="/"
            >
                Home
            </Link>
          </li>
          <li>
            <Link
              className="project-header__link"
              to="/about"
            >
                About
            </Link>
          </li>
          <li>Classify</li>
          <li>Talk</li>
          <li>Collect</li>
          <li>Language<i className="fa fa-chevron-down" /></li>
        </ul>
      </div>
    </section>
  );
}
