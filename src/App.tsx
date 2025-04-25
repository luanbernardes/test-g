import { Routes, Route } from 'react-router-dom';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/home/Home.page';
import SignInPage from '@/pages/sign-in/Sign-in.page';
import SignUpPage from '@/pages/sign-up/Sign-up.page';
import WithAuth from '@/pages/auth/WithAuth.component';

function App() {
  return (
    <>
      <CssBaseline />

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
    </>
  );
}

export default App;
