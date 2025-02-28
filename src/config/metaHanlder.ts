import { re_Calling_products } from "@/data/Re_call_prod";
import { generateSlug } from ".";
import { fetchCategories, fetchProducts, fetchSubCategories } from "./fetch";
import { notFound } from 'next/navigation'

export const Meta_handler = async (categoryName: string, url: string) => {
  const categories = await fetchCategories();

  const findCategory = categories && categories?.find((item: any) => generateSlug(item.custom_url || item.name) === categoryName);
  if (!findCategory) {
    notFound()
  }
  const fullurl = `${url}${findCategory?.custom_url || generateSlug(findCategory.name)}`;

  const images = findCategory.posterImageUrl || 'images';
  const alttext = findCategory.Images_Alt_Text || 'Alternative Text';
  const NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  console.log()
  const title = findCategory?.meta_title || 'Avenue39';
  const description =
    findCategory?.meta_description || 'Welcome to blindsandcurtains';
  const canonical = findCategory?.canonical_tag;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

export const productsFindHandler = async (
  slug: string[],
  url: string,
  subcategory?: string,
) => {
  const productName = slug[2];
  const products = await fetchProducts();

  const findProduct = products.find((item: any) => {
    return (
      generateSlug(item.custom_url || item.name) === (subcategory ? subcategory : productName)
    );
  });

  if (!findProduct) {
    notFound()
  }

  const fullurl = `${url}${slug[0]}/${slug[1]}/${generateSlug(findProduct?.custom_url || findProduct?.name)}`;

  console.log(fullurl, "urls")
  const images = findProduct.posterImageUrl || 'images';
  const alttext = findProduct.posterImageAltText || 'Alternative Text';
  const NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  const title = findProduct?.Meta_Title || 'Avenue39';
  const description = findProduct?.Meta_Description || 'Welcome to Avenue39';
  const canonical = findProduct?.Canonical_Tag;
  return {
    metadataBase: new URL(url),
    title: title,
    description: description,
    openGraph: {
      title: fullurl,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

export const subCategory = async (slug: string[], url: string) => {
  let subcategoryName = slug[1];
  let category = slug[0];
  const subCategories = await fetchSubCategories();
  const SubCategoriesFinder = re_Calling_products.find((value) =>
    generateSlug(value.mainCategory).trim().toLocaleLowerCase() === category && generateSlug(value.subCategory).trim().toLocaleLowerCase() == subcategoryName,
  );

  if (SubCategoriesFinder) {
    subcategoryName = generateSlug(SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase(),);
    category = generateSlug(
      SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase(),
    );
  }
  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.custom_url || item.name) === subcategoryName;
    const belongsToCategory = item.categories.some((value: any) =>
      generateSlug(value.custom_url || value.name).trim().toLocaleLowerCase() === category,
    );
    return isNameMatch && belongsToCategory;
  });

  if (!findSubCategory) {
    return productsFindHandler(slug, url, subcategoryName);
  }
  const fullurl = url;

  const images = findSubCategory.posterImageUrl || 'images';
  const alttext = findSubCategory.Images_Alt_Text || 'Alternative Text';
  const NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  const title = findSubCategory?.meta_title || 'Avenue39';
  const description =
    findSubCategory?.meta_description || 'Welcome to blindsandcurtains';
  const canonical = findSubCategory?.canonical_tag;

  return {

    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};
