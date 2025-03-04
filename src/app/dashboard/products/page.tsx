import { fetchCategories, fetchProducts} from 'config/fetch';
import dynamic from 'next/dynamic';
const Product = dynamic(() => import('./Products'), {
  loading: () => <p>Loading...</p>,
});

const Productspage = async () => {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
    
  ]);


  return <Product categories={categories} productsData={products} />;

};

export default Productspage;
