import React from "react"
import "./style.css"
import Logo from "../../primitives/logo/logo"
import Button from "../../primitives/button/button"
import {connect} from "react-redux"
import {showSignUp} from "../../redux/actions"

function Header({authUser, showSignUp}) {
    return(
        <div className="header" id="header">
            <Logo />
            {!authUser ? <Button text="Sign Up" transparent onClick={showSignUp} />
                : (<div className="header__userLogo">
                    <div className="userLogo__img">
                        <img src={authUser.userPic} alt=""/>
                    </div>
                    <span>{authUser.userName}</span>
                </div> ) }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {authUser: state.authorize.authUser}
}
const mapDispatchToProps = {
    showSignUp,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)