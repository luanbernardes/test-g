import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/Home.page';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
