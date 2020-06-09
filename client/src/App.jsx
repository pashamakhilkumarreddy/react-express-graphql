import React, { Fragment } from 'react';

import AppHeader from './components/common/Header';
import AppFooter from './components/common/Footer';
import Routes from './routes';

const App = () => {
  return (
    <Fragment>
      <AppHeader />
        <main className="container mt-6">
          <Routes />
        </main>
      <AppFooter />
    </Fragment>
  );
}

export default App;
