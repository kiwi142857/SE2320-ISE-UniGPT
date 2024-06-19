import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
    palette: {
        primary: {
            dark: '#000000',
            main: '#333333',
            light: '#666666',
        },
        secondary: {
            main: '#D9D9D9',
        }
    },
});

export default theme;
