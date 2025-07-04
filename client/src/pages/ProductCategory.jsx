import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();
    
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
    const filterProducts=products.filter((product)=>product.category.toLowerCase()===category)
    return (
      <div className="mt-16 ">
        {searchCategory && (
          <div className="flex flex-col w-max">
            <p className="text-2xl md:text-3xl font-medium">
              {searchCategory.text.toLocaleUpperCase()}
            </p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>

            {filterProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 mt-6 gap-4 ">
                {filterProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (<div className="flex items-center justify-center h-[60vh]">
                 <p className="text-2xl font-medium text-primary">No products found in this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default ProductCategory;
