import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { featureItems, heroItems } from "data/data";
import CategorySdlier from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import ImageCompare from "components/image-compare/image-compare";
import Layers from "components/Layers/layers";
import SampleBanner from "components/SampleBanner/SampleBanner";
import { imageData } from "data/data";
import AmCategory from "./Categories/page";
import UserInfo from "components/Reusable/user-info";
import NeedHelp from "components/NeedHelp/NeedHelp";
import Faqs from "components/Faqs/Faqs";

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
      <SampleBanner imageData={imageData} />
      <ImageCompare />
      <UserInfo />
      <Faqs />
      <NeedHelp />
    </>
  );
}
