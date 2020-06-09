import React, { memo } from 'react';

import './loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  )
}

export default memo(Loader);
