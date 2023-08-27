import { useState } from "react";
import { GenericService } from "../services/genericService";
import { iProduct } from "./../interfaces/models/iProduct";

export const useProducts = () => {
  const [products, setProducts] = useState<iProduct[]>([]);
  const productService = new GenericService<iProduct>();

  const getAllProducts = async () => {
    try {
      const fetchedProducts = await productService.getAll("/products");
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const createProduct = async (product: iProduct) => {
    try {
      const createdProduct = await productService.add("/products", product);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async (id: string, product: iProduct) => {
    try {
      await productService.update(`/products/${id}`, product);
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id?.toString() === id
            ? { ...prevProduct, ...product }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((prevProduct) => prevProduct.id?.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const product = await productService.getById(`/products/${id}`);
      setProducts([product]);
    } catch (error) {
      console.error("Error obtaining specific product:", error);
    }
  };

  return { products, getProduct, getAllProducts, createProduct, updateProduct, deleteProduct };
};
