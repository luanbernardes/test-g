import { Routes, Route } from 'react-router-dom';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/home/Home.page';
import SignInPage from '@/pages/sign-in/Sign-in.page';
import SignUpPage from '@/pages/sign-up/Sign-up.page';
import WithAuth from '@/pages/auth/WithAuth.component';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { themeEnum } from '@/@types/theme';
import { useTheme } from '@/hooks/theme/useTheme';

function App() {
  const { theme, changeTheme } = useTheme();

  const themeCreate = createTheme({
    palette: {
      mode: theme
    }
  });

  const toggleTheme = async () => {
    await changeTheme(theme === themeEnum.LIGHT ? themeEnum.DARK : themeEnum.LIGHT);
  };

  return (
    <ThemeProvider theme={themeCreate}>
      <CssBaseline />

      <div style={{ position: 'fixed', bottom: '8px', right: '8px' }}>
        <Button variant="outlined" size="small" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <WithAuth>
              <HomePage />
            </WithAuth>
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
