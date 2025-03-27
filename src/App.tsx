import { FC, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Products } from "./pages/Products/Products";
import { Product } from "./pages/Product/Product";
import { CreateProduct } from "./pages/CreateProduct/CreateProduct";
import { useStore } from "./store/store";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";

const App: FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const getProducts = useStore((state) => state.getProducts);
  useEffect(() => {
    getProducts();
  }, [])


  // const findUnic = (array: string[]) => {
  //   let result: any = new Map();

  //   array.map((el) => {
  //     let count: number = 1;
  //     let elem = el.toLowerCase().split('').sort().join('');
  //     result.has(elem) ? count = result.get(elem) + 1 : count = count;
  //     result.set(elem, count)
  //   })
  //   return Array.from(result.keys())
  // }


  // console.log(findUnic(['Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a'])) //BbBb
  // console.log(findUnic(['abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba']))  //foo



  return (
    <>
      <NavBar setIsLiked={setIsLiked} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products isLiked={isLiked} />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  )
}

export default App;
