import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';

import ROUTES from './routes';
import { Header } from './components';
import { DEFAULT_LANGUAGE_CODE } from './utils/constants';

const Drivers = lazy(() => import('./pages/Drivers'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingScreen = () => {
  return (
    <Backdrop open invisible>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

function App() {
  const [translations, setTranslations] = useState(null);

  const loading = () => {
    return !translations;
  };

  useEffect(() => {
    import(`./translations/${DEFAULT_LANGUAGE_CODE}`).then((translations) => {
      setTranslations(translations);
    });
  }, []);

  return loading() ? (
    <LoadingScreen />
  ) : (
    <IntlProvider
      locale={DEFAULT_LANGUAGE_CODE}
      messages={flatten(translations)}
    >
      <Header />
      <main className="app">
        <Suspense fallback={LoadingScreen()}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Drivers} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
    </IntlProvider>
  );
}

export default App;
