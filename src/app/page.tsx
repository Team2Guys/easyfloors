
import HeroMain from 'components/Reusable/hero';
import dynamic from 'next/dynamic';
const Features = dynamic(() => import("components/Reusable/features"));
const FloorItems = dynamic(() => import("components/FloorItems/FloorItems"));
const ImageCompare = dynamic(() => import("components/image-compare/image-compare"));
const Layers = dynamic(() => import("components/Layers/layers"));
const UserInfo = dynamic(() => import("components/Reusable/user-info"));
const Faqs = dynamic(() => import("components/Faqs/Faqs"));
const SampleBanner = dynamic(() => import("components/Reusable/SampleBanner"));
const AmCategory = dynamic(() => import("components/Categories/AmCategory"));
const CategorySlider = dynamic(() => import("components/CategorySlider/category-slider"));
import Container from "components/common/container/Container";
import {
  faqs,
  featureItems,
  heroItems,
  staticMenuItems,
} from "data/data";
import {
  FETCH_ALL_WHAT_AM_I,
  FETCH_HEADER_CATEGORIES,
} from "graphql/queries";
import { fetchCategories, fetchSubCategories } from "config/fetch";
import { ICategory } from "types/type";
import { whatAmISorting } from "data/home-category";
import { ISUBCATEGORY } from 'types/cat';


export default async function Home() {
const [ categories , subCategories] = await Promise.all([fetchCategories(FETCH_HEADER_CATEGORIES) , fetchSubCategories(FETCH_ALL_WHAT_AM_I)])
const publishedCategories = categories
  .filter((cat: ICategory) => cat.status === "PUBLISHED")
  .map((cat: ICategory) => ({
    ...cat,
    subcategories: cat.subcategories?.filter(
      (sub: ICategory) => sub.status === "PUBLISHED"
    ) || [],
    recalledSubCats: cat.recalledSubCats?.filter(
      (recall: ISUBCATEGORY) => recall?.status === "PUBLISHED"
    ) || []
  }));

  const publishedSubCategories = subCategories.filter(
    (subCat: ICategory) => subCat.status === "PUBLISHED"
  );
const sortedCategories = publishedCategories?.sort((a: ICategory, b: ICategory) => {
  const indexA = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === a.name.trim().toLowerCase()
  );
  const indexB = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === b.name.trim().toLowerCase()
  );
  return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
});


const sortedSubcategories = publishedSubCategories.sort(
  (a: ICategory, b: ICategory) =>
    whatAmISorting.indexOf(a.name) - whatAmISorting.indexOf(b.name)
)
  return (
    <>
      <HeroMain items={heroItems} />
      <Container>
      <Features items={featureItems} />
      </Container>
      <CategorySlider categories={sortedCategories} />
      <Layers />
      <FloorItems />
      <AmCategory subCategories={sortedSubcategories} />
      <SampleBanner/>
      <ImageCompare />
      <UserInfo />
      <Faqs data={faqs} />
    </>
    
  );
}
