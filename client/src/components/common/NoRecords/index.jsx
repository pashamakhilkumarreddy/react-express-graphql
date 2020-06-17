import React from 'react';
import PropTypes from 'prop-types';

import NoRecordsImage from '../../../assets/images/NoRecords.png';
import './style.css';

const NoRecords = ({ title, maxHeight = '750px' }) => {
  return (
    <div className="column is-12" style={{maxHeight,}}>
      <h2 className="title has-text-centered has-text-weight-bold">{title}</h2>
      <img src={NoRecordsImage} className="is-square" alt="Not Found" decoding="async" loading="lazy" importance="high" />
    </div>
  )
}

NoRecords.propTypes = {
  title: PropTypes.string.isRequired,
  maxHeight: PropTypes.string,
}

export default NoRecords;
