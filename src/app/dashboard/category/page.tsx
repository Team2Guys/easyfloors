import { fetchCategories } from 'config/fetch';
import Category from './Category';

const AddCategory = async () => {
  const cetagories = await fetchCategories();

console.log(cetagories, "cetagories")

  return (
    <Category cetagories={cetagories} />
  );
};

export default AddCategory;
