

const NavigationBar = ()=>{
    const logged_in = false
    return(
    <div className="navigationbar">
        <div className="top-part">
            <p className="email-text"><i className="bi bi-envelope"></i> shumbatarisait@gmail.com</p>
            <p className="address-text"><i className="bi bi-geo-alt"></i> 263 Zim Rd, Harare, Zimbabwe</p>
            <p className="contacts-text"><i className="bi bi-telephone"></i> +263 784 529 737/ 774 222 019</p>
        </div>
        <div className="bottom-part">
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
                {/* <div className="username-text">Annonymous</div>
                <div className="profile-image"><i className="bi bi-person-circle"></i></div> */}
                <button className="sign-in-btn"> Sign In</button>
            </div>
        </div>

    </div>
    )
    
}


export default NavigationBar