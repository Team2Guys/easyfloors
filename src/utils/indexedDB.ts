import { ICart } from "types/prod";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ecommerceDB", 3); 
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
  
export const addToCart = async (product: ICart): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");

    const existingProduct = await new Promise<ICart | undefined>((resolve, reject) => {
      const request = store.get(product.id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (existingProduct) {
      product.requiredBoxes = (existingProduct?.requiredBoxes ?? 0) + (product.requiredBoxes ?? 1);
    } else {
      product.requiredBoxes = product.requiredBoxes ?? 1;
    }

    await new Promise<void>((resolve, reject) => {
      const request = store.put(product);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    window.dispatchEvent(new Event("cartUpdated"));

  } catch (error) {
    throw error;
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
  
  export const getCartItem = async (id: number): Promise<ICart | undefined> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  export const removeCartItem = async (id: number): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");
  
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      window.dispatchEvent(new Event("cartUpdated"));
  
    } catch (error) {
      throw error;
    }
  };
  
  
  export const addToWishlist = async (product: ICart): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction("wishlist", "readwrite");
      const store = tx.objectStore("wishlist");
  
      const existingProduct = await new Promise<ICart | undefined>((resolve, reject) => {
        const request = store.get(product.id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      if (existingProduct) {
        product.requiredBoxes = (existingProduct?.requiredBoxes ?? 0) + (product.requiredBoxes ?? 1);
      } else {
        product.requiredBoxes = product.requiredBoxes ?? 1;
      }
  
      await new Promise<void>((resolve, reject) => {
        const request = store.put(product);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      window.dispatchEvent(new Event("wishlistUpdated"));
  
    } catch (error) {
      throw error;
    }
  };

  export const removeWishlistItem = async (id: number): Promise<void> => {
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

  export const getWishlistItem = async (id: number): Promise<ICart | undefined> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("wishlist", "readonly");
        const store = tx.objectStore("wishlist");
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw error;
    }
  };


  import { toast } from "react-toastify";

  export const addToFreeSample = async (product: ICart): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction("freeSample", "readwrite");
      const store = tx.objectStore("freeSample");
  
      // Get all samples
      const samples: ICart[] = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      // Check if the user has already added 5 samples
      if (samples.length >= 5) {
        toast.error("You can only add up to 5 free samples.");
        return;
      }
  
      // Check if the product already exists
      const existingProduct = samples.find((item) => item.id === product.id);
      if (existingProduct) {
        toast.info("This sample is already added.");
        return;
      }
  
      // Ensure requiredBoxes is always 1
      product.requiredBoxes = 1;
  
      // Set price and total price to 0
      product.price = 0;
      product.totalPrice = 0;
  
      // Add the sample
      await new Promise<void>((resolve, reject) => {
        const request = store.put(product);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
  
      // Notify the app that the sample list has been updated
      window.dispatchEvent(new Event("freeSampleUpdated"));
  
      // Show success message
      toast.success("Sample added successfully.");
    } catch (error) {
      console.error("Error adding free sample:", error);
      toast.error("Error adding free sample.");
    }
  };
  

// Remove a free sample item
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

// Get all free sample items
export const getFreeSamples = async (): Promise<ICart[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("freeSample", "readonly");
      const store = tx.objectStore("freeSample");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    throw error;
  }
};
