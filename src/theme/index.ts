import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    layout: {
      header: {
        height: React.CSSProperties['height'];
      };
    };
  }
  interface ThemeOptions {
    layout: {
      header?: {
        height?: React.CSSProperties['height'];
      };
    };
  }
}
/* eslint-disable */
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    brand: Palette['primary'];
  }
  interface PaletteOptions {
    brand: PaletteOptions['primary'];
  }
}
/* eslint-enable */

const theme = createMuiTheme({
  palette: {
    brand: {
      main: '#8A84FF',
    },
  },
  layout: {
    header: {
      height: '90px',
    },
  },
});

export default theme;
