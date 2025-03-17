import { fetchCategories, fetchSubCategories } from 'config/fetch';
import SubCategoryComponent from './SubCategory';

const AddSubCategory = async () => {
  const [cetagories, subCategories] = await Promise.all([fetchCategories(),fetchSubCategories()]);

  console.log(subCategories, "sub categories")
  return (
    <SubCategoryComponent
      subCategories={subCategories}
      cetagories={cetagories}
    />
  );
};

export default AddSubCategory;
