import { useEffect } from "react";
import { useGetProductsQuery } from "../../api/productSlice";
import NoContent from "../error/NoContent";
import ProductCard from "./ProductCard";
import { iProduct } from "./../../interfaces/models/iProduct";

const ProductList: React.FC = () => {
  const { data, isError } = useGetProductsQuery();
  return (
    <>
      {!isError ? (
        data?.map((product: iProduct) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <NoContent entity="product" />
      )}
    </>
  );
};

export default ProductList;
