import HomePageSlider from "../components/home_page_slider"
import CategoryFilter from "../components/category_filter"
import AllCategoryContainer from "../components/AllCategoriesContainer"
import ProductsContainer from "../components/ProductsContainer"

const MainContainer = () => {
  return (
        <div className="main">
            <div className="slide-main-container">
              <HomePageSlider/>
            </div>
            <div className="category-filter-section">
               <CategoryFilter/>
            </div>
            <div className="mini-page-container">
                {/* <ProductsContainer/> */}
                <AllCategoryContainer/>
            </div>
            
        </div>

  )
}

export default MainContainer