import NoContent from "../error/NoContent";
import CategoryCard from "./CategoryCard";
//import { useCategories } from "../../hooks/useCategories";
import { useGetCategoriesQuery } from "../../api/categorySlice";
import { iCategory } from "../../interfaces/models/iCategory";

const CategoryList: React.FC = () => {
  const { data, isError } = useGetCategoriesQuery();
  return (
    <>
      {!isError ? (
        data?.map((category: iCategory) => (
          <CategoryCard key={category.id} category={category} />
        ))
      ) : (
        <NoContent entity="category" />
      )}
    </>
  );
};

export default CategoryList;
