import { fetchCategories, fetchSingleCategory } from "config/fetch";
import { Category as ICategory, ISUBCATEGORY } from "types/cat";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import Category from "./Cetagory";
import { IProduct } from "types/prod";
import { staticMenuItems } from "data/data";
import CategorySkeleton from "components/skaletons/CategorySkeleton";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const Category = await fetchSingleCategory(slug)
  if (!Category) return notFound()
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protoHeader = headersList.get('x-forwarded-proto');
  const protocol = protoHeader && protoHeader.startsWith('https') ? 'https' : 'https';
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
      type: 'website'

    },
    alternates: {
      canonical:
        Category?.Canonical_Tag || url,
    },
  };
}

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const categories = await fetchCategories();
  const findCategory = categories.find((cat: ICategory) => (cat.custom_url?.trim() ?? '') === slug.trim());
  if (!findCategory) {
    return notFound()
  }
  const reCallFlag = findCategory?.recalledSubCats && findCategory?.recalledSubCats.length > 0;
  if (reCallFlag) {
    let products: IProduct[] = [];

    categories.forEach((cat: ICategory) => {
      const filteredProd = cat.products?.filter((prod) =>
        findCategory?.recalledSubCats?.some(
          (subCat: ISUBCATEGORY) => subCat.custom_url === prod.subcategory?.custom_url
        )
      ) || [];

      products = [...products, ...filteredProd];
    })
    findCategory.products = products
  }


  const filteredCategories = categories.filter((value: ICategory) => value?.name?.trim() !== "ACCESSORIES").sort((a: ICategory, b: ICategory) => {
    const indexA = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === a.name.trim().toLowerCase()
    );
    const indexB = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === b.name.trim().toLowerCase()
    );
    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  }) || []
  return (
    <Suspense fallback={<CategorySkeleton />} >
      <Category catgories={filteredCategories} categoryData={findCategory} isSubCategory={false} slug={slug} />
    </Suspense>
  );
};



export default CategoryPage;
