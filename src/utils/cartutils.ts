import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, addToCart } from "utils/indexedDB";
import { toast } from "react-toastify";

export const fetchItems = async (isSamplePage: boolean, setItems?: (_items: ICart[]) => void) => {
  try {
    if (isSamplePage) {
      const samples = await getFreeSamples();
      if(setItems){
        setItems(samples);
      } else {
        return samples;
      }
    } else {
      const wishlist = await getWishlist();
      if(setItems){
        setItems(wishlist);
      } else {
        return wishlist;
      }
    }
  } catch {
    toast.error("Error fetching items.");
  }
};



export const updateQuantity = (
  id: number,
  delta: number,
  items: ICart[],
): ICart[] => {
  return items.map((item) => {
    if (item.id !== id) return item;
    if (item.category === "Accessories" || item.category === "Accessory") {
  const metres     = Math.max(1, (item.requiredBoxes ?? 1) + delta);
  const unitPrice  = item.price ?? 0;          // price per metre
  const totalPrice = +(unitPrice * metres).toFixed(2);

  return {
    ...item,
    requiredBoxes: metres, 
    squareMeter:   metres,  
    totalPrice,      
  };
}

    let newArea = +(item.squareMeter + delta).toFixed(2);
    if (newArea < 1) newArea = 1;  

    const sqmPerBox = Number(item.boxCoverage);   
    const areaInSqm = item.unit === "sqft" ? newArea / 10.764 : newArea;

    const boxesNeeded = Math.ceil(areaInSqm / sqmPerBox);

    const unitPrice  = item.pricePerBox ?? 0;
    const totalPrice = +(unitPrice * boxesNeeded).toFixed(2);

    return {
      ...item,
      requiredBoxes: boxesNeeded,
      squareMeter: newArea,
      totalPrice,
    };
  });
};


export const handleRemoveItem = async (id: number, setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void ,isSamplePage?: boolean) => {
  try {
    if (isSamplePage) {
      await removeFreeSample(id);
    } else {
      await removeWishlistItem(id);
    }
    setItems((_prev) => _prev.filter((item) => item.id !== id));
  } catch {
    toast.error("Error removing item.");
  }
};

export const handleAddToCart = async (
  product: ICart,
  setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void
) => {
  try {
    await handleRemoveItem(Number(product.id), setItems);
      await addToCart(product);
      window.dispatchEvent(new Event("cartUpdated"));
  } catch {
    toast.error("Error adding item.");
  }
};