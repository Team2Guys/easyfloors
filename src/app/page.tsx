import CategorySdlier from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import Layers from "components/Layers/layers";
import SampleBanner from "components/SampleBanner/SampleBanner";
import { imageData } from "data/data";
import AmCategory from "./Categories/page";

export default function Home() {
  return (
    <>
      <CategorySdlier />
      <Layers />
      <FloorItems />
      <AmCategory />
      <SampleBanner imageData={imageData} />
    </>
  );
}
