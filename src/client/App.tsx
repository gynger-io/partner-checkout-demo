import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Pages
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SideMenu } from './components/SideMenu';
import { DealList } from './components/DealList';

export const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <SideMenu />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/deals' element={<DealList />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
