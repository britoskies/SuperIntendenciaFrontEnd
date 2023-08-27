import { useEffect } from "react";
import NoContent from "../error/NoContent";
import { useProducts } from "./../../hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const { products, getAllProducts } = useProducts();

  useEffect(() => {
    getAllProducts();
  },[])
  
  return (
    <>
      {products ? products.map((product, index) => (
        <ProductCard key={index} product={product} />
      )) : <NoContent entity="product"/>}
    </>
  );
};

export default ProductList;
