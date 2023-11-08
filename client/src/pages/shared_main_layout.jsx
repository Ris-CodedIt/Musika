import NavigationBar from "../components/navigation_bar"
import HomePageSlider from "../components/home_page_slider"


const SharedMainLayout = ()=>{
    return (
        <>
        <NavigationBar/>
        <div className="main">
            <div className="slide-main-container">
              <HomePageSlider/>
            </div>  
        </div>
        </>
    )
}


export default SharedMainLayout