import React, { useEffect, useState } from 'react'
import TopNav from './top-nav'
import Navbar from './navbar'
import { IProduct } from 'types/prod';
import { Category } from 'types/cat';
import { fetchCategories, fetchProducts } from 'config/fetch';
import { FETCH_HEADER_CATEGORIES, FETCH_HEADER_PRODUCTS } from 'graphql/queries';
import { toast } from 'react-toastify';

const Header = () => {
   const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const data = await fetchCategories(FETCH_HEADER_CATEGORIES);
          const product = await fetchProducts(FETCH_HEADER_PRODUCTS);  
          setCategories(data)
          setProducts(product)
    
        } catch {
          toast.error("Error fetching items");
        }
      };
  
      fetchItems();  
    }, []);
  return (
    <div>
    <TopNav />
    <Navbar categories={categories} products={products}/>
    </div>
  )
}

export default Header