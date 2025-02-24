import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { featureItems, heroItems } from "data/data";
import CategorySdlier from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import ImageCompare from "components/image-compare/image-compare";
import Layers from "components/Layers/layers";
import AmCategory from "./Categories/page";
import UserInfo from "components/Reusable/user-info";
import Faqs from "components/Faqs/Faqs";
import SampleBanner from "components/Reusable/SampleBanner";

export default function Home() {
  return (
    <>
      <HeroMain items={heroItems} />
      <Container>
      <Features items={featureItems} />
      </Container>
      <CategorySdlier />
      <Layers />
      <FloorItems />
      <AmCategory />
      <SampleBanner/>
      <ImageCompare />
      <UserInfo />
      <Faqs />
    </>
  );
}
