import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { createContext, FC, useEffect, useState } from 'react';
import { themeCreator } from './base';

export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper: FC = (props) => {
  const [themeName, _setThemeName] = useState('SorariumTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'SorariumTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    // @ts-ignore
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
