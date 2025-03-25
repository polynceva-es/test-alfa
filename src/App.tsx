import { FC, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { Products } from "./pages/Products/Products";
import { Product } from "./pages/Product/Product";
import { CreateProduct } from "./pages/CreateProduct/CreateProduct";
import { useStore } from "./store/store";
import "./App.css";


const App: FC = () => {
  const getProducts = useStore((state) => state.getProducts);
  useEffect(() => {
    getProducts();
  }, [])
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  )
}

export default App;
