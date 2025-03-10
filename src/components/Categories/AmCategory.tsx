
import BlogCard from "components/Categories/Categories";
import Container from "components/common/container/Container";
import { fetchSubCategories } from "config/fetch";
import { ISUBCATEGORY } from "types/cat";
import CustomSwiper from "./Swiper";


export default async function AmCategory() {
  const subCategories = await fetchSubCategories()

  return (
    <Container>
      <div className="font-inter md:mt-20 mt-10 category_slider">
    
    <CustomSwiper subCategories={subCategories} />

        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subCategories?.map((card:ISUBCATEGORY) => (
            <BlogCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </Container>
  );
}
