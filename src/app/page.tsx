import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { faqs, featureItems, heroItems } from "data/data";
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

export default async function Home() {
const [ categories , subCategories] = await Promise.all([fetchCategories(FETCH_HEADER_CATEGORIES) , fetchSubCategories()])
  return (
    <>
      <HeroMain items={heroItems} />
      <Container>
      <Features items={featureItems} />
      </Container>
      <CategorySlider categories={categories} />
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
