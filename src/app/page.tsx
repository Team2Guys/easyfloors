import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { featureItems, heroItems } from "data/data";
import CategorySdlier from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import Layers from "components/Layers/layers";

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
    </>
  );
}
