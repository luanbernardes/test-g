import { Routes, Route } from 'react-router-dom';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/home/Home.page';
import SignInPage from '@/pages/sign-in/Sign-in.page';

function App() {
  return (
    <>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
