import React from 'react';
import PropTypes from 'prop-types';

import './ripple-loader.css';

const RippleLoader = ({ width = '80px', height = '80px' }) => 
  <div className="ripple" style={{width: `${width}`, height: `${height}`}}>
    <div></div>
    <div></div>
  </div>;

RippleLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

export default RippleLoader;
