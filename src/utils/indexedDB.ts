import { ICart } from "types/prod";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ecommerceDB", 2); 
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("wishlist")) {
        db.createObjectStore("wishlist", { keyPath: "id" });
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