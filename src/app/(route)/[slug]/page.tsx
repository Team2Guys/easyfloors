import { fetchCategories } from "config/fetch";
import { Suspense } from "react";
import Category from "./Cetagory";
import { Category as ICategory } from "types/cat";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const catgories = await fetchCategories();
  const findCategory = catgories.find((cat: ICategory) => cat.custom_url.trim() === `/${slug.trim()}`);
  if(!findCategory) {
   return notFound()
  }
  return (
    <Suspense fallback="Loading .....">
      <Category catgories={catgories} category={findCategory} />
    </Suspense>
  );
};

export default CategoryPage;
