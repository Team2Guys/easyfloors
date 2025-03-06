import { fetchCategories } from "config/fetch";
import { Suspense } from "react";
import Category from "./Cetagory";

const CategoryPage = async () => {
   const catgories = await fetchCategories();
   console.log(catgories)
  return (
    <Suspense fallback="Loading .....">
      <Category catgories={catgories} />
    </Suspense>
  );
};

export default CategoryPage;
