import { fetchCategories, fetchSingleCategory } from "config/fetch";
import { Suspense } from "react";
import { Category as ICategory } from "types/cat";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import Category from "./Cetagory";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const Category =await fetchSingleCategory(slug)
if(!Category) return notFound() 
   const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  const ImageUrl =
    Category?.posterImageUrl.imageUrl ||
    'Easy Floor';
  const alt =
    Category?.posterImageUrl.altText ||
    'Easy Floor';

    const NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  const title =
    Category?.Meta_Title ||
    'Easy Floor';
  const description =
    Category?.Meta_Description ||
    'Welcome to Easy Floor';
  const url = `${fullUrl}${slug}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
    },
    alternates: {
      canonical:
        Category?.Canonical_Tag || url,
    },
  };
}

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const catgories = await fetchCategories();

  let findCategory = catgories.find((cat: ICategory) => (cat.custom_url?.trim() ?? '') === slug.trim());
  if(!findCategory) {
    return notFound()
   }
 
  let  mainCategory;
  const {whatAmiImageBanner, topHeading,description} = findCategory
  const reCallFlag = findCategory?.recalledSubCats && findCategory?.recalledSubCats.length > 0;
  if(reCallFlag){
    const recallCategory = findCategory?.recalledSubCats[0].category.RecallUrl
    findCategory = catgories.find((cat: ICategory) => (cat.RecallUrl?.trim() ?? '') === recallCategory.trim());
    mainCategory ={whatAmiImageBanner, topHeading, description}
  }

  const filteredCategories = catgories.filter((value:ICategory)=>value?.name?.trim() !=="ACCESSORIES") || []
  console.log(findCategory.products)
  return (
    <Suspense fallback="Loading .....">
      <Category catgories={filteredCategories} categoryData={findCategory}  isSubCategory={false} mainCategory={mainCategory} slug={slug} />
    </Suspense>
  );
};

export default CategoryPage;
