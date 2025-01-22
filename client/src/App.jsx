import './App.css'
import {Routes,Route} from "react-router-dom"
import MainLayout from './layouts/MainLayouts'
import Home from './pages/Home';
import Detail from './pages/Detail';
import Add from './pages/Add';
import Wishlist from './pages/Wishlist';
import Notfound from './pages/NotFound';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/add" element={<Add />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path='*' element={<Notfound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App
