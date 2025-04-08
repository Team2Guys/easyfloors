import { toast } from 'react-toastify';
import { EDIT_CATEGORY } from 'types/cat';
import { IProduct } from 'types/prod';
import { addToCart, addToFreeSample, addToWishlist, getFreeSamples } from 'utils/indexedDB';

export const handleAddToStorage = async (
  productData: IProduct | EDIT_CATEGORY,
  totalPrice: string | number,
  pricePerBox: number,
  squareMeter: number,
  requiredBoxes: number,
  subCategory: string,
  MainCategory: string,
  type: "cart" | "wishlist" | "freeSample",
  image?: string,
  boxCoverage?: string,
  unit?: string,  
) => {
  if (!productData) {
    toast.error("Product is undefined");
    return;
  }

  // For cart only: validate requiredBoxes
  if (type === "cart") {
    if (requiredBoxes <= 0) {
      toast.error("Please enter quantity to add the product to the cart.");
      return;
    }
    
    // Check stock availability for cart items
    if (requiredBoxes > Number(productData?.stock)) {
      toast.error("Requested Box exceeds available stock!");
      return;
    }
  }

  // For free samples and wishlist, default to 1 if requiredBoxes is 0 or negative
  const adjustedRequiredBoxes = type === "cart" 
    ? requiredBoxes 
    : requiredBoxes > 0 ? requiredBoxes : 1;

  const adjustedTotalPrice = Number(totalPrice) > 0 ? pricePerBox * adjustedRequiredBoxes : pricePerBox;
  const adjustedSquareMeter = squareMeter > 0 ? squareMeter : Number(boxCoverage);
  const adjustedUnit = unit ? unit : "sqm";
  const item = {
    id: Number(productData.id),
    name: productData.name,
    price: Number(productData.price),
    stock: Number(productData.stock),
    image,
    subcategories: subCategory,
    category: MainCategory,
    boxCoverage,
    totalPrice: adjustedTotalPrice,
    pricePerBox,
    squareMeter: adjustedSquareMeter,
    requiredBoxes: adjustedRequiredBoxes,
    unit:adjustedUnit,
  };

  try {
    if (type === "cart" || type === "freeSample") {
      const success = type === "cart" && await addToCart(item);

      if (success && type === "cart") {
        return;
      } else if (type === "freeSample") {
        const existingSamples = await getFreeSamples();
        if (existingSamples.length >= 5) {
          toast.error("You can add only up to 5 free samples.");
          return;
        }
        if (existingSamples.some((sample) => sample.id === item.id)) {
          toast.error("Product already added to freeSample!");
          return;
        }
        await addToFreeSample(item);
        toast.success("Product added to freeSample!");
      }
    } else {
      await addToWishlist(item);
      return;
    }
  } catch {
    toast.error(`Error adding product to ${type}`);
  }
};


  export const calculateProductDetails = (area: string, unit: string, productData: IProduct | undefined) => {
    const boxCoverage = productData?.boxCoverage;
    const convertedArea = unit === "sqft" ? parseFloat((parseFloat(area) * 0.092903).toFixed(2)) : parseFloat(area);
    const requiredBoxes = area ? Math.ceil(convertedArea / Number(boxCoverage)) : 0;
    const pricePerBox = productData && productData.price !== undefined ? (Number(boxCoverage) * productData.price) : 0;
    const squareMeter = requiredBoxes * Number(boxCoverage ?? 0);
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