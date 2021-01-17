import React, { useState } from 'react';
import { darkTheme, lightTheme } from './theme';
import { ThemeOptions } from '@material-ui/core/styles';

import {
  createMuiTheme,
  CssBaseline,
  Container,
  IconButton,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { NightsStay, WbSunny } from '@material-ui/icons';
import './app.css';
import { GameContextProvider } from './GameContext';
import MenuView from './components/MenuView';

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme != null) {
      return savedTheme === 'dark' ? darkTheme : lightTheme;
    }

    return darkTheme;
  });

  const toggleTheme = () => {
    let newTheme: ThemeOptions;
    let newThemeString: string;

    if (theme === darkTheme) {
      newTheme = lightTheme;
      newThemeString = 'light';
    } else {
      newTheme = darkTheme;
      newThemeString = 'dark';
    }

    setTheme(newTheme);
    localStorage.setItem('theme', newThemeString);
  };

  const appTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline>
        <Container>
          <div className="theme-icon">
            <IconButton onClick={toggleTheme}>
              {theme === darkTheme ? (
                <WbSunny style={{ fill: 'yellow' }} />
              ) : (
                <NightsStay style={{ fill: 'black' }} />
              )}
            </IconButton>
          </div>

          <GameContextProvider>
            <MenuView />
          </GameContextProvider>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
