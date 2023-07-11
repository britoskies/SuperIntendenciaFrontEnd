import { useEffect, useState } from "react";
import { GenericService } from "../services/genericService";
import { iCategory } from "./../interfaces/models/iCategory";

export const useCategories = () => {
  const [categories, setCategories] = useState<iCategory[]>([]);
  const categoryService = new GenericService<iCategory>();

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const fetchedcategories = await categoryService.getAll("/categories");
        setCategories(fetchedcategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  }, []);

  const createCategory = async (category: iCategory) => {
    try {
      const createdCategory = await categoryService.add(
        "/categories",
        category
      );
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const updateCategory = async (id: string, category: iCategory) => {
    try {
      await categoryService.update(`/categories/${id}`, category);
      setCategories((prevCategories) =>
        prevCategories.map((prevCategory) =>
          prevCategory.id?.toString() === id
            ? { ...prevCategory, ...category }
            : prevCategory
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryService.delete(`/categories/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter(
          (prevCategory) => prevCategory.id?.toString() !== id
        )
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const getCategory = async (id: string) => {
    try {
      const category = await categoryService.getById(`/categories/${id}`);
      setCategories([category]);
    } catch (error) {
      console.error("Error obtaining specific category:", error);
    }
  };

  return {
    categories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
