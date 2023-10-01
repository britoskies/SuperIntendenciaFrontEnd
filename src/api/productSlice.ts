import { apiSlice } from "./apiSlice";
import { iProduct } from './../interfaces/models/iProduct';

const productSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<iProduct[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: (updatedProduct) => ({
        url: `/products`,
        params: {id: updatedProduct.id},
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productSlice;
