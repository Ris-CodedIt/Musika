

const NavigationBar = ()=>{
    const logged_in = false
    return(
    <div className="navigationbar">
      
            <div className="logo-div">
                <div className="logo-icon-div"><i className="bi bi-basket3"></i></div>
                <div className="logo-name-div">MUSIKA</div>
            </div>
            <div className="navigationbar-link-section">
                <div className="link">Link</div>
                <div className="link">Link</div>
                <div className="link">Link</div>
                <div className="link">Link</div>
            </div>
            <div className="navigation-user-name-or-login">
                <div className="username-text">Annonymous</div>
                <div className="profile-image"><i className="bi bi-person-circle"></i></div>
                {/* <button className="sign-in-btn"> Sign In</button> */}
            </div>


    </div>
    )
    
}


export default NavigationBar