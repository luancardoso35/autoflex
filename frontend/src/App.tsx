import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { ProductsPage } from './pages/ProductsPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { ComponentsProductsPage } from './pages/ComponentsProductsPage';

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>
  },
  {
    path: "/products",
    element: <ProductsPage/>,
  },
  {
    path: "/components",
    element: <ComponentsPage/>,
  },
  {
    path: "/component-product",
    element: <ComponentsProductsPage/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
