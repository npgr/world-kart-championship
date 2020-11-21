export const isLocalEnv = () => process.env.REACT_APP_ENV === 'local';
export const isDevelopmentEnv = () =>
  process.env.REACT_APP_ENV === 'development';
export const isProductionEnv = () => process.env.REACT_APP_ENV === 'production';
export const currentEnv = process.env.REACT_APP_ENV;
export const appVersion = process.env.REACT_APP_VERSION;

export const getImageURL = (imgFile: string) =>
  `${process.env.PUBLIC_URL}/img/${imgFile}`;
