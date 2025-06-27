import { toast } from 'react-toastify';
import { EDIT_CATEGORY } from 'types/cat';
import { IProduct, ProductImage } from 'types/prod';
import { AddcartFreeSample, addToCart, addToFreeSample, addToWishlist, getFreeSamples, getFreeSamplesCart } from 'utils/indexedDB';

export const handleAddToStorage = async (
  productData: IProduct | EDIT_CATEGORY,
  totalPrice: string | number,
  pricePerBox: number,
  squareMeter: number,
  requiredBoxes: number,
  subCategory: string,
  MainCategory: string,
  type: 'cart' | 'wishlist' | 'freeSample' | 'cartfreeSample',
  image?: string,
  boxCoverage?: string,
  unit?: string,
  selectedColor?: ProductImage,
  matchedProductImages?: ProductImage,
  // isfreeSample?: boolean
) => {
  if (!productData) {
    toast.error('Product is undefined');
    return;
  }

  if (type === 'cart') {
    if (requiredBoxes <= 0) {
      toast.error('Please enter quantity to add the product to the cart.');
      return;
    }

    if (requiredBoxes > Number(productData?.stock)) {
      toast.error('Requested box quantity exceeds available stock!');
      return;
    }
  }

  const adjustedRequiredBoxes =
    type === 'cart' ? requiredBoxes : requiredBoxes > 0 ? requiredBoxes : 1;

  const adjustedTotalPrice =
    Number(totalPrice) > 0 ? pricePerBox * adjustedRequiredBoxes : pricePerBox;

  const adjustedSquareMeter =
    squareMeter > 0 ? squareMeter : Number(boxCoverage) * adjustedRequiredBoxes;
    const adjustedImage =
    matchedProductImages?.imageUrl ?? image;
  const adjustedUnit = unit || 'sqm';

  const item = {
    id:  Number(productData.id),
    name: productData.name,
    price: Number(productData.price),
    stock: Number(productData.stock),
    image:adjustedImage,
    subcategories: subCategory,
    category: MainCategory,
    boxCoverage,
    totalPrice: adjustedTotalPrice,
    pricePerBox,
    squareMeter: adjustedSquareMeter,
    requiredBoxes: adjustedRequiredBoxes,
    unit: adjustedUnit,
    selectedColor,
    matchedProductImages,
    isfreeSample: type === 'freeSample' || false,
    custom_url: productData.custom_url
  };

  try {
    if (type === 'cart') {
      const success = await addToCart(item);
      if (success) return;
    } else if (type === 'freeSample') {
      const existingSamples = await getFreeSamples();

      if (existingSamples.some((sample) => sample.id === item.id)) {
        toast.error('Product already added to Free Samples.');
        return;
      }

      if (existingSamples.length >= 5) {
        toast.error('You can add only up to 5 free samples.');
        return;
      }

      await addToFreeSample(item);
      return;
      
    } 
    
    else if (type === 'cartfreeSample') {
      const existingSamples = await getFreeSamplesCart();

      if (existingSamples.some((sample) => sample.id === item.id)) {
        toast.error('Product already added to Free Samples.');
        return;
      }

      if (existingSamples.length >= 5) {
        toast.error('You can add only up to 5 free samples.');
        return;
      }

      await AddcartFreeSample(item);
      return;
    }
    else if (type === 'wishlist') {
      await addToWishlist(item);
      return;
    }
  } catch  {
    toast.error(`Error adding product to ${type}`);
  }
};



export const calculateProductDetails = (
  area: string,
  unit: string,
  productData: IProduct | undefined
) => {
  const boxCoverage = productData?.boxCoverage;
  const numericCoverage = Number(boxCoverage);
  const convertedArea =
    unit === 'sqft'
      ? parseFloat((parseFloat(area) * 0.092903).toFixed(2))
      : parseFloat(area);

  const requiredBoxes =
    area && numericCoverage > 0
      ? Math.ceil(convertedArea / numericCoverage)
      : 0;

  const pricePerBox =
    productData?.price !== undefined
      ? numericCoverage * productData.price
      : 0;

  const squareMeter = requiredBoxes * numericCoverage;
  const totalPrice = requiredBoxes * pricePerBox;
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
