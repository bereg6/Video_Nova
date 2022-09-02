import React, {useEffect} from "react"
import "./style.css"
import Header from "../../partials/header/header"
import Footer from "../../partials/footer/footer"
import Button from "../../primitives/button/button"
import SignUp from "../../partials/forms/signUp/signUp"
import SignIn from "../../partials/forms/signIn/signIn"
import UsersBlock from "../../partials/usersBlock/usersBlock"
import {connect, useDispatch} from "react-redux"
import {addUsers, addVideos, showSignIn} from "../../redux/actions"
import {useRedirect} from "../../hooks/customHooks"
import {blur, unBlur} from "../../functions"

function Home({usersData, authUser, signInName, signUpName, signIn, signUp, showSignIn}) {
    const dispatch = useDispatch()
    useRedirect(authUser, signInName, signUpName)

    useEffect(() => {
        if (usersData.length === 0) {
            dispatch(addUsers())
            dispatch(addVideos())
        }
    }, [])

    useEffect(() => {
        if (signUp || signIn) {
            blur()
        } else {
            unBlur()
        }
    }, [signUp, signIn])

        return (
            <div id="page" className="page">
                <Header/>
                {signUp && <SignUp/>}
                {signIn && <SignIn/>}
                <div className="home" id="home">
                    <div className="home__heading">
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            <h1 style={{color: "#000000", paddingRight: "10px"}}>Welcome To </h1>
                            <h1 style={{color: "#FF6363"}}>VideoNova</h1>
                        </div>
                        <p style={{marginTop: "20px", marginBottom: "50px"}}>Create videos with a single click. Add
                            subtitles, transcribe audio and more</p>
                        <Button text={"Start Now"} onClick={showSignIn}/>
                    </div>
                    <div className="home__userCards">
                        <div className="userCards__heading">
                            <h2>Best Creators</h2>
                            <img src={"images/Star.png"} alt=""/>
                        </div>
                        {usersData.length === 0 ? <h1>Loading...</h1> : <UsersBlock/>}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }


const mapStateToProps = (state) => {
    return {
        usersData: state.users.users,
        videosData: state.videos.videos,
        authUser: state.authorize.authUser,
        signInName: state.forms.signInName,
        signUpName: state.forms.signUpName,
        signIn: state.app.signIn,
        signUp: state.app.signUp,
    }
}
const mapDispatchToProps = {
    showSignIn,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)