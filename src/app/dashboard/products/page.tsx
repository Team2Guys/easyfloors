import { fetchCategories, fetchProducts } from 'config/fetch';
import dynamic from 'next/dynamic';
const Product = dynamic(() => import('./Products'), {
  loading: () => <p>Loading...</p>,
});

const Productspage = async () => {
  const [cetagories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

console.log(cetagories, "products")
  
  return <Product cetagories={cetagories} productsData={products} />;
};

export default Productspage;
