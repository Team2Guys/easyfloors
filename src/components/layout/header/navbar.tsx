import React, { useEffect, useState } from "react";
import Container from "components/common/container/Container";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./search-bar";
import UserIcon from "./user-icon";
import Megamenu from "./Megamenu";
import { FaBars } from "react-icons/fa";
import Drawer from "components/ui/drawer";
import { BiChevronDown } from "react-icons/bi";
import { staticMenuItems } from "data/data";
import { ISUBCATEGORY } from "types/cat";
import { HeaderAccessoriesProps, INavbar } from "types/types";

const Navbar = ({ categories, products}: INavbar) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = prev[label];
      const newState: { [key: string]: boolean } = {};
      menuItems.forEach((item) => {
        if (item.label === label) {
          newState[label] = !isCurrentlyOpen;
        } else {
          newState[item.label] = false;
        }
      });
      return newState;
    });
  };

  // Modify menuItems to show only accessories in the "Accessories" category
  const menuItems = staticMenuItems.map((staticItem) => {
    const matchedCategory = categories?.find((cat) => cat.custom_url === staticItem.href);
    if (!matchedCategory) return staticItem;

    const reCallFlag = matchedCategory?.recalledSubCats && matchedCategory?.recalledSubCats.length > 0;
    const subcategories: ISUBCATEGORY[] = (reCallFlag ? matchedCategory.recalledSubCats : matchedCategory.subcategories) as ISUBCATEGORY[] || [];

    return {
      ...staticItem,
      submenu: subcategories?.map((sub) => ({
        label: sub.name,
        href: `/${sub?.category?.RecallUrl || matchedCategory.RecallUrl}/${sub.custom_url}`,
        image: sub.posterImageUrl?.imageUrl || "/assets/default-image.png",
      })) || [],
    };
  });

  return (
    <nav className={`bg-white w-full z-50 max-sm:pb-1 max-lg:pb-2 font-inter  ${isScrolled ? "bg-white text-black top-0 fixed" : "bg-white text-black sticky top-0"}`}>
      <Container className="flex items-center max-sm:gap-4 justify-between  mt-1 sm:mt-3 ">
        <div className="w-2/12 lg:w-[6%] 2xl:w-[10.3%] 3xl:w-[11%] ">
          <Link href="/">
            <Image
              width={400}
              height={400}
              className="w-[54px] h-[24px] lg:h-[35px] xl:w-[150px] xl:h-[50px] 2xl:w-auto 2xl:h-auto"
              src="/assets/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="w-8/12 lg:w-[68%] 2xl:w-[70%] 3xl:w-[67%]  max-lg:flex max-lg:justify-center">
          <div className="hidden lg:flex items-center gap-2 lg:gap-1 xl:gap-2 2xl:gap-4 w-fit h-16 justify-between capitalize font-light whitespace-nowrap relative overflow-hidden">
            {menuItems.map((item, index) => (
              <Megamenu
                key={index}
                label={item.label}
                href={item.href}
                submenu={item.submenu}
                // Only pass accessories for "Accessories" menu
                products={item.label === "Accessories" ? categories?.find(cat => cat.name === "ACCESSORIES")?.accessories : []}
              />
            ))}
          </div>
          <SearchBar className="block lg:hidden" productData={products} />
        </div>
        <div className="w-2/12 lg:w-[22%] xl:w-[20%] 2xl:w-[20%] 3xl:w-[23%] text-end flex items-center gap-2 justify-between max-lg:justify-end">
          <SearchBar className="lg:block hidden" productData={products} />
          <UserIcon className="hidden lg:flex" />
          <div className="lg:hidden flex justify-end">
            <FaBars onClick={() => setIsOpen(true)} size={20} />
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
              {menuItems.map((item) => (
                <div key={item.label} className="border-b py-2 font-inter">
                  <div className="flex justify-between items-center gap-2">
                    {/* Main Category Link */}
                    <Link
                      href={item.href}
                      className="text-14 font-semibold w-fit whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {/* Toggle for Accordion */}
                    {item.label === "Accessories" ? (
                      <button onClick={() => toggleMenu("Accessories")} className="w-full flex justify-end">
                        <BiChevronDown
                          className={`w-5 h-5 transition-transform ${openMenus["Accessories"] ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      item?.submenu && item?.submenu.length > 0 && (
                        <button onClick={() => toggleMenu(item.label)} className="w-full flex justify-end">
                          <BiChevronDown
                            className={`w-5 h-5 transition-transform ${openMenus[item.label] ? "rotate-180" : ""}`}
                          />
                        </button>
                      )
                    )}
                  </div>

                  {item.label === "Accessories" && openMenus["Accessories"] && (
                    <div className="pt-2 grid grid-cols-2 gap-5">
                      {categories?.find(cat => cat.name === "ACCESSORIES")?.accessories?.map((product:HeaderAccessoriesProps, index:number) => (
                        <Link
                          href={`/accessories/${product.custom_url}`}
                          key={index}
                          className="py-1 text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          <Image
                            width={200}
                            height={200}
                            src={product.posterImageUrl?.imageUrl || "/assets/default-image.png"}
                            alt={product.posterImageUrl?.altText ?? "Accessory"}
                            className="w-full rounded-md h-20"
                          />
                          <p className="text-14 text-black hover:underline">{product.name}</p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Submenu for Other Categories */}
                  {item?.submenu && item?.submenu.length > 0 && !openMenus["Accessories"] && openMenus[item.label] && (
                    <div className="grid grid-cols-2 gap-5 pt-2">
                      {item.submenu.map((sub, index) => (
                        <Link
                          href={sub.href}
                          key={index}
                          className="py-1 text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          <Image
                            width={200}
                            height={200}
                            src={sub.image}
                            alt={sub.label}
                            className="w-full rounded-md h-20"
                          />
                          <p className="text-14 text-black hover:underline">{sub.label}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Drawer>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
