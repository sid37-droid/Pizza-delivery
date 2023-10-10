//React
import React from 'react';
import { createContext, useState } from 'react';

//react-router-dom
import { Routes, Route } from 'react-router-dom';

// Copmponents
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/notFound';
import Cart from './pages/Cart';

//Style
import './scss/app.scss';

//Context
export const AppContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      {/*  AppContext return Provider*/}
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound path="/" />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
