import NavigationBar from "../components/navigation_bar"

import MainContainer from "../mini_pages/main_container"
import ProductLandingPage from "./product_landing_page"


const SharedMainLayout = ()=>{
    return (
        <>
        <NavigationBar/>
        <ProductLandingPage/>
        </>
    )
}


export default SharedMainLayout