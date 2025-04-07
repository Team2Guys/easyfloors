import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
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
import { FETCH_HEADER_CATEGORIES } from "graphql/queries";
import { ICategory } from "types/type";

export default async function Home() {
const [ categories , subCategories] = await Promise.all([fetchCategories(FETCH_HEADER_CATEGORIES) , fetchSubCategories()])

const sortedCategories = categories?.sort((a: ICategory, b: ICategory) => {
  const indexA = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === a.name.trim().toLowerCase()
  );
  const indexB = staticMenuItems.findIndex(
      (item) => item.label.toLowerCase() === b.name.trim().toLowerCase()
  );
  return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
});
  return (
    <>
      <HeroMain items={heroItems} />
      <Container>
      <Features items={featureItems} />
      </Container>
      <CategorySlider categories={sortedCategories} />
      <Layers />
      <FloorItems />
      <AmCategory subCategories={subCategories} />
      <SampleBanner/>
      <ImageCompare />
      <UserInfo />
      <Faqs data={faqs} />
    </>
    
  );
}
