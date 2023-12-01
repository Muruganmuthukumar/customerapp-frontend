import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Order from './pages/Order';
import Product from './pages/Product';
import About from './pages/About';
import SidePanel from './components/SidePanel';
import CustomerEdit from './pages/CustomerEdit';
import ProductEdit from './pages/ProductEdit';
import { useState } from 'react';
import OrderEdit from './pages/OrderEdit';
import CustomerAdd from './pages/CustomerAdd';
import ProductAdd from './pages/ProductAdd';
import SignIn from './pages/SignIn';
import PrivateRoutes from './components/PrivateRoutes';
import OrderAdd from './pages/OrderAdd';

function App() {
  const [toggle, setToggle] = useState(true)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='signin' element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<SidePanel setToggle={setToggle} toggle={toggle} />} exact>
              <Route index element={<Dashboard />} />
              <Route path="about" element={<About />} />
              <Route path="order" element={<Order toggle={toggle} />} />
              <Route path="product" element={<Product toggle={toggle} />} />
              <Route path="customer" element={<Customer setToggle={setToggle} toggle={toggle} />} />
              <Route path="customer-edit" element={<CustomerEdit toggle={toggle} />} />
              <Route path='new-customer' element={<CustomerAdd toggle={toggle} />} />
              <Route path='new-product' element={<ProductAdd toggle={toggle} />} />
              <Route path='product-edit' element={<ProductEdit toggle={toggle} />} />
              <Route path='order-edit' element={<OrderEdit toggle={toggle} />} />
              <Route path='new-order' element={<OrderAdd toggle={toggle} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
