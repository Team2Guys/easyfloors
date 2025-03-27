import React, { useEffect, useState } from 'react'
import TopNav from './top-nav'
import Navbar from './navbar'
import { ICart, IProduct } from 'types/prod';
import { Category } from 'types/cat';
import { fetchCategories, fetchProducts } from 'config/fetch';
import { getCart, getFreeSamples, getWishlist } from 'utils/indexedDB';
import { FETCH_HEADER_CATEGORIES, FETCH_HEADER_PRODUCTS } from 'graphql/queries';
import { toast } from 'react-toastify';

const Header = () => {
   const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartTotal, setCartTotal] = useState<ICart[]>();
    const [wishlistTotal, setWishlistTotal] = useState<ICart[]>();
    const [freeSampleTotal, setfreeSampleTotal] = useState<ICart[]>();
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const data = await fetchCategories(FETCH_HEADER_CATEGORIES);
          const product = await fetchProducts(FETCH_HEADER_PRODUCTS);
          const items = await getCart();
          const wishlist = await getWishlist();
          const freesample = await getFreeSamples();
  
          setCategories(data)
          setProducts(product)
          setCartTotal(items);
          setWishlistTotal(wishlist);
          setfreeSampleTotal(freesample);
        } catch {
          toast.error("Error fetching items");
        }
      };
  
      fetchItems();
      const handleCartUpdate = () => fetchItems();
      const handleWishlistUpdate = () => fetchItems();
      const handlefreeSampleUpdate = () => fetchItems();
  
      window.addEventListener("cartUpdated", handleCartUpdate);
      window.addEventListener("wishlistUpdated", handleWishlistUpdate);
      window.addEventListener("freeSampleUpdated", handlefreeSampleUpdate);
  
      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
        window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
        window.removeEventListener("freeSampleUpdated", handlefreeSampleUpdate);
      };
  
    }, []);
  return (
    <div>
    <TopNav cartTotal={cartTotal?? []} wishlistTotal={wishlistTotal ?? []} freeSampleTotal={freeSampleTotal ?? []}/>
    <Navbar categories={categories} products={products} cartTotal={cartTotal?? []} wishlistTotal={wishlistTotal ?? []} freeSampleTotal={freeSampleTotal ?? []}/>
    </div>
  )
}

export default Header