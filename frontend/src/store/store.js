import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  isLoading: false,

  // Error handling
  error: null,

  // Product details
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
      const response = await fetch("http://localhost:5000/api/products", {
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

  // Update an existing product
  updateProduct: async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
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

// Admin login
export const useAdminStore = create((set) => ({
  admin: false,
  setAdmin: (admin) => set({ admin: admin }),

  adminDetails: {
    name: "",
    email: "",
    password: "",
    secretCode: "",
    rememberMe: false,
  },
  setAdminDetails: (adminDetails) => set({ adminDetails: adminDetails }),
}));
