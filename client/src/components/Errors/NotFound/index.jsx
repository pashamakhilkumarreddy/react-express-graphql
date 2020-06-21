import React, { memo } from 'react';

import NotFoundImage from '../../../assets/images/NotFound.jpg';

import './notfound.css';

const NotFound = () => {
  return (
    <div className="columns is-mobile is-centered is-vcentered">
      <div className="column is-12">
        <img src={NotFoundImage} className="is-square" alt="Not Found" decoding="async" loading="lazy" importance="high" />
      </div>
    </div>
  )
}

export default memo(NotFound);
