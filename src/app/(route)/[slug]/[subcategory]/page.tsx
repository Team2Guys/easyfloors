import { fetchCategories, fetchSingeSubCategory } from "config/fetch";
import { Suspense } from "react";
import { Category as ICategory } from "types/cat";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import Category from "../Cetagory";
import { staticMenuItems } from "data/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string, subcategory: string }> }): Promise<Metadata> {
  const { slug, subcategory } = await params
  const subCategory = await fetchSingeSubCategory(subcategory.trim(), slug)
  if (!subCategory) return notFound()

  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;
  const ImageUrl =
    subCategory?.posterImageUrl.imageUrl ||
    'Easy Floor';
  const alt =
    subCategory?.posterImageUrl.altText ||
    'Easy Floor';

  const NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  const title =
    subCategory?.Meta_Title ||
    'Easy Floor';
  const description =
    subCategory?.Meta_Description ||
    'Welcome to Easy Floor';
  const url = `${fullUrl}${slug}/${subcategory}`;
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
        subCategory?.Canonical_Tag || url,
    },
  };
}

const SubCategoryPage = async ({ params }: { params: Promise<{ slug: string, subcategory: string }> }) => {
  const { slug, subcategory } = await params
  const [categories] = await Promise.all([fetchCategories()]);
  const findCategory = categories.find((cat: ICategory) => (cat?.RecallUrl) === slug.trim());
  if (!findCategory) {
    return notFound()
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

  const getMatchingSubCategory = (subcategories: ICategory[], subCategoryUrl: string) => {
    return subcategories.filter((sub) => sub.custom_url === subCategoryUrl);
  };
  const matchingSubCategory = getMatchingSubCategory(findCategory.subcategories, subcategory);
  return (
    <Suspense fallback="Loading .....">
      <Category catgories={filteredCategories} categoryData={findCategory} slug={slug} subcategory={subcategory} subdescription={matchingSubCategory} isSubCategory />
    </Suspense>
  );
};

export default SubCategoryPage;