//react-router-dom
import { Routes, Route } from 'react-router-dom';

// Copmponents
import Home from './pages/Home';
import NotFound from './pages/notFound';
import Cart from './pages/Cart';
import FullProduct from './pages/FullProduct/FullProduct';
import MainLayout from './layouts/MainLayout';

//Style
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>} >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<FullProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
