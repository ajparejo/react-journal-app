import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Tema } from './';

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={Tema}>
        <CssBaseline/>
        { children }
    </ThemeProvider>
  )
}
