import NoContent from "../error/NoContent";
import CategoryCard from "./CategoryCard";
import { useCategories } from "../../hooks/useCategories";

const CategoryList: React.FC = () => {
  const { categories } = useCategories();
  return (
    <>
      {categories ? categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      )) : <NoContent entity="category"/>}
    </>
  );
};

export default CategoryList;
