import NavigationBar from "../components/navigation_bar"
import HomePageSlider from "../components/home_page_slider"
import CategoryFilter from "../components/category_filter"


const SharedMainLayout = ()=>{
    return (
        <>
        <NavigationBar/>
        <div className="main">
            <div className="slide-main-container">
              <HomePageSlider/>
            </div>
            <div className="category-filter-section">
               <CategoryFilter/>
            </div>
            
        </div>
        </>
    )
}


export default SharedMainLayout