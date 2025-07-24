import { ICart } from "types/prod";
import { toast } from "react-toastify";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ecommerceDB", 4); 
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("wishlist")) {
        db.createObjectStore("wishlist", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("freeSample")) {
        db.createObjectStore("freeSample", { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
  
export const addToCart = async (product: ICart): Promise<boolean> => {
  try {
    // Validate box quantity
    if (!product.requiredBoxes || product.requiredBoxes <= 0) {
      toast.error("Please enter a valid box quantity (at least 1).");
      return false;
    }

    const db = await openDB();
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");

    // For Accessories, we may need to treat same ID but different color as a different item
    let existingProduct: ICart | undefined;

    if (product.category?.toLowerCase().trim() === 'accessories') {
      // Get all items and search by ID + color
      const allItems: ICart[] = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      existingProduct = allItems.find(
        (item) => (item.id === product.id) && (item.selectedColor?.color === product.selectedColor?.color)
      );

    } else {
      // For non-accessories, just get by ID
      existingProduct = await new Promise<ICart | undefined>((resolve, reject) => {
        const request = store.get(product.id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    // Handle stock
    let newRequiredBoxes = product.requiredBoxes || 1;
    if (existingProduct) {
      newRequiredBoxes += existingProduct.requiredBoxes || 0;
    }

    if (newRequiredBoxes > product.stock) {
      toast.error(`Cannot add more than ${product.stock} boxes.`);
      return false;
    }

    const idKey =  (product.category?.toLowerCase() === 'accessories' && !existingProduct)
      ? `${product.id}-${product.selectedColor?.color}`
      : product.id;

    const updatedProduct = {
      ...product,
      id: idKey,
      requiredBoxes: newRequiredBoxes,
      totalPrice: product.pricePerBox * newRequiredBoxes,
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put(updatedProduct);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    window.dispatchEvent(new Event("cartUpdated"));
    return true;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return false;
  }
};



  export const getCart = async (): Promise<ICart[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  

  
  export const removeCartItem = async (id: string | number): Promise<void> => {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction("cart", "readwrite");
        const store = tx.objectStore("cart");
        const request = store.delete(id);
  
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => resolve();
      });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      throw error;
    }
  };
  
  
export const addToWishlist = async (product: ICart): Promise<boolean> => {
  try {
    const db = await openDB();
    const tx = db.transaction('wishlist', 'readwrite');
    const store = tx.objectStore('wishlist');

    let existingProduct: ICart | undefined;

    if (product.category?.toLowerCase().trim() === 'accessories') {
      // Check if this accessory (with same ID + color) already exists
      const allItems: ICart[] = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      existingProduct = allItems.find(
        (item) => (item.id === product.id) && (item.selectedColor?.color === product.selectedColor?.color)
      );
    } else {
      // For non-accessories: just check by ID
      existingProduct = await new Promise((resolve, reject) => {
        const request = store.get(product.id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }


    if (existingProduct) {
      return false;
    }

    const wishlistId =
      product.category?.toLowerCase().trim() === 'accessories' ? `${product.id}-${product.selectedColor?.color}` : product.id;

    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        ...product,
        id: wishlistId,
        requiredBoxes: product.requiredBoxes ?? 1,
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    window.dispatchEvent(new Event('wishlistUpdated'));
    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};


  export const removeWishlistItem = async (id: number | string): Promise<void> => {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction("wishlist", "readwrite");
        const store = tx.objectStore("wishlist");
        const request = store.delete(id);
  
        request.onsuccess = () => {
          tx.oncomplete = () => resolve();
        };
        request.onerror = () => reject(request.error);
      });
  
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      throw error;
    }
  };
  

  export const getWishlist = async (): Promise<ICart[]> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("wishlist", "readonly");
        const store = tx.objectStore("wishlist");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw error;
    }
  };

  export const addToFreeSample = async (product: ICart): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction("freeSample", "readwrite");
      const store = tx.objectStore("freeSample");

      const samples: ICart[] = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      if (samples.length >= 5) {
        toast.error("You can only add up to 5 free samples.");
        return;
      }
  
      product.requiredBoxes = 1;
      product.price = 0;
      product.totalPrice = 0;

      await new Promise<void>((resolve, reject) => {
        const request = store.put(product);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      window.dispatchEvent(new Event("freeSampleUpdated"));

    } catch (error) {
      toast.error("Error adding free sample.");
      throw error;
    }
  };
  
  export const removeFreeSample = async (id: number): Promise<void> => {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("freeSample", "readwrite");
      const store = tx.objectStore("freeSample");
      const request = store.delete(id);

      request.onsuccess = () => {
        tx.oncomplete = () => resolve();
      };
      request.onerror = () => reject(request.error);
    });

    window.dispatchEvent(new Event("freeSampleUpdated"));
  } catch (error) {
    throw error;
  }
};

export const getFreeSamples = async (): Promise<ICart[]> => {
  try {
    const db = await openDB();

    if (!db.objectStoreNames.contains("freeSample")) {
      return [];
    }

    const tx = db.transaction("freeSample", "readonly");
    const store = tx.objectStore("freeSample");
    const request = store.getAll();

    return await new Promise<ICart[]>((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    return []; 
    throw error;
  }
};
