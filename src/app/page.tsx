import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { faqs, featureItems, heroItems } from "data/data";
import CategorySlider from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import ImageCompare from "components/image-compare/image-compare";
import Layers from "components/Layers/layers";
import UserInfo from "components/Reusable/user-info";
import Faqs from "components/Faqs/Faqs";
import SampleBanner from "components/Reusable/SampleBanner";
import { fetchCategories } from "config/fetch";
import AmCategory from "components/Categories/AmCategory";


export default async function Home() {
const categories = await fetchCategories()


  return (
    <>
      <HeroMain items={heroItems} />
      <Container>
      <Features items={featureItems} />
      </Container>
      <CategorySlider categories={categories} />
      <Layers />
      <FloorItems />
      <AmCategory />
      <SampleBanner/>
      <ImageCompare />
      <UserInfo />
      <Faqs data={faqs} />
    </>
  );
}
