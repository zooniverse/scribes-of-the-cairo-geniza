import React from 'react';
import PropTypes from 'prop-types';

const SubjectLoading = ({ loaded }) => {
  const transform = !loaded ? 'scale(1)' : 'scale(5)';

  return (
    <g transform={transform} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-15, -50)" strokeWidth="4">
        <g>
          <circle id="Oval-2" stroke="#C4AFB9" cx="15" cy="15" r="15" />
          <path
            d="M15,30 C23.2842712,30 30,23.2842712 30,15
              C30,6.71572875 23.2842712,0 15,0
              C6.71572875,0 0,6.71572875 0,15"
            id="Oval-2"
            stroke="#472B36"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 15 15"
            to="360 15 15"
            dur="0.75s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      <text
        x="0"
        y="20"
        fill="#4a4a4a"
        fontFamily="Merriweather"
        fontSize="20"
        fontWeight="700"
        textAnchor="middle"
      >
        Loading
      </text>
    </g>
  );
};

SubjectLoading.propTypes = {
  loaded: PropTypes.bool
};

SubjectLoading.defaultProps = {
  loaded: false
};

export default SubjectLoading;
