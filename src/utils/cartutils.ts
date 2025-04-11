import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, addToCart, AddcartFreeSample } from "utils/indexedDB";
import { toast } from "react-toastify";

export const fetchItems = async (isSamplePage: boolean, setItems: (_items: ICart[]) => void) => {
  try {
    if (isSamplePage) {
      const samples = await getFreeSamples();
      setItems(samples);
    } else {
      const wishlist = await getWishlist();
      setItems(wishlist);
    }
  } catch {
    toast.error("Error fetching items.");
  }
};


// utils/updateQuantity.ts
export const updateQuantity = (
  id: number,
  delta: number,
  items: ICart[]
): ICart[] => {
  return items.map((item) =>
    item.id === id
      ? { ...item, requiredBoxes: Math.max(1, (item.requiredBoxes ?? 0) + delta) }
      : item
  );
};


export const handleRemoveItem = async (id: number, isSamplePage: boolean, setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void) => {
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
  isSamplePage: boolean,
  setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void
) => {
  try {
    // Remove the product from current storage
    await handleRemoveItem(Number(product.id), isSamplePage, setItems);

    if (isSamplePage) {
      // Add to free sample store
      const freeSampleProduct = {
        ...product,
        requiredBoxes: 1,
        price: 0,
        totalPrice: 0,
        isfreeSample: true,
      };

      await AddcartFreeSample(freeSampleProduct);
      toast.success("Product added to Free Samples!");
      window.dispatchEvent(new Event("freeSampleUpdated"));
    } else {
      // Add to cart store
      await addToCart(product);
      toast.success("Product added to Cart!");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  } catch {
    toast.error("Error adding item.");
  }
};