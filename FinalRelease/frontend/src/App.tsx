import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // make sure to import your i18n settings
import AppRouter from './components/AppRouter';
import theme from './components/theme';
import './css/App.css';
import { LanguageProvider } from './provider/LanguageProvider'; // make sure to import LanguageProvider

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </ThemeProvider>
      </div>
    </I18nextProvider>
  );
}

export default App;