import { ICart } from "types/prod";

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
      if (!db.objectStoreNames.contains("cartfreeSample")) {
        db.createObjectStore("cartfreeSample", { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
  
export const addToCart = async (product: ICart): Promise<boolean> => {
  try {
    // First check if requiredBoxes is 0 or negative
    if (!product.requiredBoxes || product.requiredBoxes <= 0) {
      toast.error("Please enter a valid box quantity (at least 1).");
      return false;
    }

    const db = await openDB();
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");

    const existingProduct = await new Promise<ICart | undefined>((resolve, reject) => {
      const request = store.get(product.id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    let newRequiredBoxes = product.requiredBoxes || 1;

    if (existingProduct) {
      newRequiredBoxes += existingProduct.requiredBoxes || 0;
    }

    if (newRequiredBoxes > product.stock) {
      toast.error(`Cannot add more than ${product.stock} boxes.`);
      return false; 
    }

    const updatedProduct = {
      ...product,
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
    throw error;
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
      console.warn("Object store 'freeSample' does not exist.");
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



export const AddcartFreeSample = async (product: ICart): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction("cartfreeSample", "readwrite");
    const store = tx.objectStore("cartfreeSample");

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
    window.dispatchEvent(new Event("cartfreeSampleUpdated"));

  } catch (error) {
    toast.error("Error adding free sample.");
    throw error;
  }
};
export const getFreeSamplesCart = async (): Promise<ICart[]> => {
  try {
    const db = await openDB();

    if (!db.objectStoreNames.contains("cartfreeSample")) {
      return [];
    }

    const tx = db.transaction("cartfreeSample", "readonly");
    const store = tx.objectStore("cartfreeSample");
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

export const cartremoveFreeSample = async (id: number): Promise<void> => {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("cartfreeSample", "readwrite");
      const store = tx.objectStore("cartfreeSample");
      const request = store.delete(id);

      request.onsuccess = () => {
        tx.oncomplete = () => resolve();
      };
      request.onerror = () => reject(request.error);
    });

    window.dispatchEvent(new Event("cartfreeSampleUpdated"));
  } catch (error) {
    throw error;
  }
};