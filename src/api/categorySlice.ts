import { apiSlice } from "./apiSlice";
import { iCategory } from './../interfaces/models/iCategory';

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<iCategory[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    createCategory: build.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation({
      query: (updatedCategory) => ({
        url: `/categories`,
        params: {id: updatedCategory.id},
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categorySlice;
