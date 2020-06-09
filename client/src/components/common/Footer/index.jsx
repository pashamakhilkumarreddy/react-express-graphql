import React, { memo } from 'react';

import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered has-text-weight-bold">
        <p>
          &copy; Copyright 2020
        </p>
      </div>
    </footer>
  )
}

export default memo(Footer);
