import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import flatten from 'flat';

import translations from '../translations/en.json';
import { DEFAULT_LANGUAGE_CODE } from './constants';
import theme from '../theme';

export function renderWithIntl(
  ui: React.ReactElement,
  intlProps?: object,
  renderOptions?: RenderOptions
) {
  function Wrapper({ children }: any) {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider
          locale={DEFAULT_LANGUAGE_CODE}
          onError={() => null}
          messages={flatten(translations)}
          {...intlProps}
        >
          {children}
        </IntlProvider>
      </ThemeProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
