
import dynamic from "next/dynamic";
const  BlogCard = dynamic(() => import('components/Categories/Categories'))
import Container from "components/common/container/Container";
import { ISUBCATEGORY } from "types/cat";
import CustomSwiper from "./Swiper";
import Popup from "./Popup";


export default async function AmCategory({subCategories}: {subCategories: ISUBCATEGORY[]}) {
  return (
    <Container>
      <div className="font-inter md:mt-20 mt-10 category_slider">
    <Popup/>
    <CustomSwiper subCategories={subCategories} />

        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 lg:mt-20">
          {subCategories?.map((card: ISUBCATEGORY, index: number) => (
            <BlogCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
