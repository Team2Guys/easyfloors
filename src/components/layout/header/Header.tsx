import { useEffect, useState } from 'react'
import Navbar from './navbar'
import { IProduct } from 'types/prod';
import { Category } from 'types/cat';
import { fetchCategories, fetchProducts } from 'config/fetch';
import { FETCH_HEADER_CATEGORIES, FETCH_HEADER_PRODUCTS } from 'graphql/queries';
import { toast } from 'react-toastify';
import TopNav from './top-nav';

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

           const publishedCategories = data.map((cat: Category) => ({
            ...cat,
            subcategories: cat.subcategories?.filter(
              sub => sub.status === 'PUBLISHED'
            ) || [],
            recalledSubCats: cat.recalledSubCats?.filter(
              recall => recall?.status === 'PUBLISHED'
            ) || [],
            products: cat.products?.filter(prod => prod.status === 'PUBLISHED') || []
          }));
        const publishedProducts = product.filter(
          (prod: IProduct) => prod.status === 'PUBLISHED'
        );

        setCategories(publishedCategories);
        setProducts(publishedProducts);

    
        } catch {
          toast.error("Error fetching items");
        }
      };
  
      fetchItems();  
    }, []);
    console.log(categories,"categoriescategories")
  return (
    <>
    <TopNav/>
    <Navbar categories={categories} products={products}/>
    </>
  )
}

export default Header