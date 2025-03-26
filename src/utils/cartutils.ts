import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, addToCart as saveToCart } from "utils/indexedDB";
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

export const updateQuantity = (id: number, index: number, setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void) => {
  setItems((_prevItems) =>
    _prevItems.map((item) =>
      item.id === id ? { ...item, requiredBoxes: Math.max(1, (item.requiredBoxes ?? 0) + index) } : item
    )
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

export const handleAddToCart = async (product: ICart, isSamplePage: boolean, setItems: (_callback: (_prevItems: ICart[]) => ICart[]) => void) => {
  try {
    await saveToCart(product);
    await handleRemoveItem(product.id, isSamplePage, setItems);
    toast.success("Product added to cart successfully!");
    window.dispatchEvent(new Event("freeSampleUpdated"));
  } catch {
    toast.error("Error adding item.");
  }
};
