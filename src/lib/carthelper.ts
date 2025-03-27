import { toast } from 'react-toastify';
import { IProduct } from 'types/prod';
import { addToCart,addToFreeSample,addToWishlist, getFreeSamples } from 'utils/indexedDB';

export const handleAddToStorage = async (
    productData: IProduct,
    totalPrice: number,
    pricePerBox: number,
    squareMeter: number,
    requiredBoxes: number,
    subCategory: string,
    MainCategory: string,
    type: "cart" | "wishlist"|"freeSample",
    image?: string,
    boxCoverage?: string,

  ) => {
    if (!productData) {
      toast.error("Product is undefined");
      return;
    }
    const adjustedRequiredBoxes = requiredBoxes > 0 ? requiredBoxes : 1;
    const adjustedtotalPrice = totalPrice > 0 ? pricePerBox * adjustedRequiredBoxes : pricePerBox;
    const adjustedsquareMeter = squareMeter > 0 ? squareMeter : Number(boxCoverage);
    if (adjustedRequiredBoxes > Number(productData.stock)) {
      toast.error("Requested Box exceeds available stock!");
      return;
    }
    const item = {
      id: Number(productData.id),
      name: productData.name,
      price: Number(productData.price),
      stock: Number(productData.stock),
      image,
      subcategories: subCategory,
      category: MainCategory,
      boxCoverage,
      totalPrice:adjustedtotalPrice,
      pricePerBox,
      squareMeter:adjustedsquareMeter,
      requiredBoxes:adjustedRequiredBoxes,
    };
  
    try {
      if (type === "cart" || type === "freeSample") {
        const success = type === "cart" && await addToCart(item)
  
        if (success && type === "cart") {
          toast.success("Product added to cart!");
        } else if (type === "freeSample") {
          const existingSamples = await getFreeSamples();
          if (existingSamples.length >= 5) {
            toast.error("You can add only up to 5 free samples.");
            return;
          }
          if(existingSamples.some((sample) => sample.id === item.id)){
          
            toast.error("Product already added to freeSample!")
          return ;
          }
          await addToFreeSample(item);
          toast.success("Product added to freeSample!");
        } 
      } else {
        await addToWishlist(item);
        toast.success("Product added to wishlist!");
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