
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpage from './scenes/Loginpage';
import Homepage from './scenes/Homepage';
import Profilepage from './scenes/Profilepage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline ,ThemeProvider} from '@mui/material';
import {createTheme} from "@mui/material/styles";
import { themeSettings } from './theme';
import Navbar from './scenes/Navbar';
import Register from './scenes/Register';

function App() {

  const mode=useSelector(state=> state.mode);
  const token=useSelector(state=>state.token)
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
  console.log(token)
  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={token?<Homepage />:<Loginpage />} />
        <Route path="/profile/:userId" element={<Profilepage />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
