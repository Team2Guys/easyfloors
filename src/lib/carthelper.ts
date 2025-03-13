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

  export const calculateProductDetails = (area: string, unit: string, productData: IProduct | undefined) => {
    const boxCoverage = 2.9;
    const convertedArea = unit === "sqft" ? parseFloat((parseFloat(area) * 0.092903).toFixed(2)) : parseFloat(area);
    const requiredBoxes = area ? Math.ceil(convertedArea / boxCoverage) : 0;
    const pricePerBox = productData ? (boxCoverage * productData.price) : 0;
    const squareMeter = requiredBoxes * boxCoverage;
    const totalPrice = productData ? (requiredBoxes * pricePerBox) : 0;
    const installments = totalPrice / 4;
  
    return {
      convertedArea,
      requiredBoxes,
      pricePerBox,
      squareMeter,
      totalPrice,
      installments,
      boxCoverage,
    };
  };