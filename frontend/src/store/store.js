import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  isLoading: false,
  error: null,
  productDetails: {
    name: "",
    price: "",
    image: "",
  },
  setProductDetails: (productDetails) =>
    set({ productDetails: productDetails }),

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      set({ products: data.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    if (!productData.name || !productData.price || !productData.image)
      return { success: false, message: "Please provide product data" };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
        }),
      });
      return await response.json();
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Update an existing product
  updateProduct: async (id, updatedData) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedData,
        }),
      });
      return await response.json();
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        isLoading: false,
      }));
      return await response.json();
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
