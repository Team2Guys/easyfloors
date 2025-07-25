import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, addToCart } from "utils/indexedDB";
import { toast } from "react-toastify";

export const fetchItems = async (isSamplePage: boolean, setItems?: (_items: ICart[]) => void) => {
  try {
    if (isSamplePage) {
      const samples = await getFreeSamples();
      if (setItems) {
        setItems(samples);
      } else {
        return samples;
      }
    } else {
      const wishlist = await getWishlist();
      if (setItems) {
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
  product: ICart,
  delta: number,
  items: ICart[],
): ICart[] => {
  return items.map((item) => {
    if (!(
      item.id === product.id &&
      item.selectedColor?.color === product.selectedColor?.color
    )) return item;

    // Handle Accessories (quantity is in meters)
    if (item.category?.toLowerCase() === 'accessories' || item.category === "Accessory") {
      const metres = Math.max(1, (item.requiredBoxes ?? 1) + delta);
      const unitPrice = item.price ?? 0; // price per metre
      const totalPrice = +(unitPrice * metres).toFixed(2);

      return {
        ...item,
        requiredBoxes: metres,
        squareMeter: metres,
        totalPrice,
      };
    }

    // Handle Tiles and other products (based on square meters)
    const newArea = Math.max(1, +(item.squareMeter + delta).toFixed(2));
    const sqmPerBox = Number(item.boxCoverage) || 1;
    const areaInSqm = item.unit === "sqft" ? newArea / 10.764 : newArea;

    const boxesNeeded = Math.ceil(areaInSqm / sqmPerBox);
    const unitPrice = item.pricePerBox ?? 0;
    const totalPrice = +(unitPrice * boxesNeeded).toFixed(2);

    return {
      ...item,
      requiredBoxes: boxesNeeded,
      squareMeter: newArea,
      totalPrice,
    };
  });
};



export const handleRemoveItem = async (product: ICart, setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void, isSamplePage?: boolean) => {
  try {
    const compositeKey = product.category?.toLowerCase().trim() === 'accessories' ? `${product.id}-${product.selectedColor?.color}` : `${product.id}`;
    if (isSamplePage) {
      await removeFreeSample(compositeKey);
      window.dispatchEvent(new Event("freeSampleUpdated"));
    } else {
      await removeWishlistItem(compositeKey);
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
    setItems((_prev) =>
      _prev.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.selectedColor?.color === product.selectedColor?.color
          )
      )
    );
  } catch {
    toast.error("Error removing item.");
  }
};

export const handleAddToCart = async (
  product: ICart,
  setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void
) => {
  try {
    await handleRemoveItem(product, setItems);
    await addToCart(product);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch {
    toast.error("Error adding item.");
  }
};