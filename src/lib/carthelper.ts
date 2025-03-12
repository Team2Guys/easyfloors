import { toast } from 'react-toastify';
import { IProduct } from 'types/prod';
import { addToCart, addToWishlist } from 'utils/indexedDB';
export const handleAddToStorage = async (
    productData: IProduct,
    totalPrice: number,
    pricePerBox: number,
    squareMeter: number,
    requiredBoxes: number,
    subCategory: string,
    MainCategory: string,
    type: "cart" | "wishlist"
  ) => {
    if (!productData) {
      toast.error("Product is undefined");
      return;
    }
    const item = {
      id: Number(productData.id),
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      quantity: 1,
      image: productData.productImages?.[0]?.imageUrl || "",
      subcategories: subCategory,
      category: MainCategory,
      totalPrice,
      pricePerBox,
      squareMeter,
      requiredBoxes,
    };
  
    try {
      if (type === "cart") {
        await addToCart(item);
        toast.success("Product added to cart!");
      } else {
        await addToWishlist(item);
        toast.success("Product added to wishlist!");
      }
    } catch {
      toast.error(`Error adding product to ${type}`);
    }
  };