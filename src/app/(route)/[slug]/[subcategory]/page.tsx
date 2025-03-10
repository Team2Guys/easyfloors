import { fetchCategories, fetchSubCategories } from "config/fetch";
import { Suspense } from "react";
import { Category as ICategory } from "types/cat";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import Category from "../Cetagory";

export async function generateMetadata({ params }: { params: Promise<{ slug: string , subcategory: string }> }): Promise<Metadata> {
  const { slug , subcategory } = await params
  const subCategories = await fetchSubCategories()


  const subCategory = subCategories.find((sub: ICategory) => sub.custom_url === `${slug.trim()}/${subcategory.trim()}`);
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
  const url = `${fullUrl}${subCategory.custom_url}`;
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

const SubCategoryPage = async ({ params }: { params: Promise<{ slug: string , subcategory: string}> }) => {
  const { slug , subcategory } = await params
  const [ catgories , subCategories ] = await Promise.all([ fetchCategories() ,fetchSubCategories()]);
  console.log(subCategories,'subCategories')
  const findSubCategories = subCategories.find((sub: ICategory) => sub.custom_url.trim() === `${slug.trim()}/${subcategory.trim()}`);
  if (!findSubCategories) {
    return notFound()
  }
  return (
    <Suspense fallback="Loading .....">
      <Category catgories={catgories} category={findSubCategories} />
    </Suspense>
  );
};

export default SubCategoryPage;
