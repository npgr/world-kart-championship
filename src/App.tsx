import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';
import ROUTES from './routes';
import Header from './components/Header';
import { LoadingScreen, PageContainer } from './components/UI';
import { DEFAULT_LANGUAGE_CODE } from './utils/constants';

const Classification = lazy(() => import('./pages/Classification'));
const Driver = lazy(() => import('./pages/Driver'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
      <PageContainer>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Classification} />
            <Route exact path={ROUTES.DRIVER} component={Driver} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </PageContainer>
    </IntlProvider>
  );
}

export default App;
