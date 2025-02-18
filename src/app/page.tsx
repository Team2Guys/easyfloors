import CategorySdlier from "components/CategorySlider/category-slider";
import FloorItems from "components/FloorItems/FloorItems";
import ImageCompare from "components/image-compare/image-compare";
import Layers from "components/Layers/layers";
import UserInfo from "components/reuseable/user-info";

export default function Home() {
  return (
    <>
      <CategorySdlier />
      <Layers />
      <FloorItems />
      <ImageCompare/>
      <UserInfo/>
    </>
  );
}
