
import dynamic from "next/dynamic";
const HeroMain = dynamic(() => import("components/Reusable/hero"));
import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import { faqs, featureItems, heroItems, staticMenuItems } from "data/data";
import FloorItems from "components/FloorItems/FloorItems";
import ImageCompare from "components/image-compare/image-compare";
import Layers from "components/Layers/layers";
import UserInfo from "components/Reusable/user-info";
import Faqs from "components/Faqs/Faqs";
import SampleBanner from "components/Reusable/SampleBanner";
import { fetchCategories, fetchSubCategories } from "config/fetch";
import AmCategory from "components/Categories/AmCategory";
import CategorySlider from "components/CategorySlider/category-slider";
import { FETCH_ALL_WHAT_AM_I, FETCH_HEADER_CATEGORIES } from "graphql/queries";
import { ICategory } from "types/type";
import { whatAmISorting } from "data/home-category";

export default async function Home() {
const [ categories , subCategories] = await Promise.all([fetchCategories(FETCH_HEADER_CATEGORIES) , fetchSubCategories(FETCH_ALL_WHAT_AM_I)])

const sortedCategories = categories?.sort((a: ICategory, b: ICategory) => {
  const indexA = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === a.name.trim().toLowerCase()
  );
  const indexB = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === b.name.trim().toLowerCase()
  );
  return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
});


const sortedSubcategories = subCategories.sort(
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
