import React, {useEffect} from "react"
import "./style.css"
import "../../index.css"
import Header from "../../partials/header/header"
import Button from "../../primitives/button/button"
import Video from "../../partials/video/video"
import AddVideo from "../../partials/forms/addVideo/addVideo"
import Footer from "../../partials/footer/footer"
import {connect, useDispatch} from "react-redux"
import {useParams} from "react-router-dom"
import SignIn from "../../partials/forms/signIn/signIn"
import SignUp from "../../partials/forms/signUp/signUp"
import {useRedirect} from "../../hooks/customHooks"
import {addUsers, showAddVideo, addUserVideos} from "../../redux/actions"
import {blur, unBlur} from "../../functions"
import VideoPlayer from "../../primitives/videoPlayer/videoPlayer"

function Profile({usersData, authUser, signInName, signUpName, userVideos,
                     signIn, signUp, addVideo, showAddVideo, videoPlayer, addUserVideos}) {
    useRedirect(authUser, signInName, signUpName)
    const dispatch = useDispatch()
    let params = useParams()
    let thisUser

    if (usersData.length === 0/* && videosData.length === 0*/) {
        dispatch(addUsers())
    } else {
        usersData.map(user => user.slug === params.user ? thisUser = user : "")
    }

    useEffect(() => {
        if (thisUser) {
            fetchUserVideos(thisUser.id)
        }
    }, [thisUser])

    useEffect(() => {
        if (signUp || signIn || addVideo || videoPlayer) {
            blur()
        } else {
            unBlur()
        }
    }, [signUp, signIn, addVideo, videoPlayer])

    async function fetchUserVideos(id) {
        userVideos = await dispatch(addUserVideos(id))
    }

    return(
        <div className="page">
            {signIn && <SignIn/>}
            {signUp && <SignUp/>}
            {addVideo && <AddVideo/>}
            {videoPlayer && <VideoPlayer/>}
            <Header/>
            <div className="profile__wrapper" id="profile__wrapper">
                {thisUser ? <div className="profile" id="profile">
                    <img src={thisUser.userPic} alt={""} style={{
                        width: "154px", height: "154px", overflow: "hidden",
                        borderRadius: "77px", margin: "98px 0 20px"
                    }}/>
                    <h1>{thisUser.userName}</h1>
                    <div className="profile__videos">
                        <div className="videosHeader">
                            <div className="videosHeader__userName">
                                <h2 style={{marginRight: "10px"}}>{`${thisUser.userName}'s Videos`}</h2>
                                <img src={"../images/Play.png"} alt={""}/>
                            </div>
                            {authUser.id === thisUser.id ? <Button text={"Add video"} onClick={showAddVideo}/>
                                : <Button text={"Add video"} disabled/>}
                        </div>
                        <div className="videosWrapper">
                            {userVideos.length === 0 ? <h1>No videos</h1>
                                : userVideos.map(({url, title, description, id}) =>
                                    <div style={{margin: "0 14px 28px"}}  key={id}>
                                        <Video src={url} heading={title} description={description} id={id}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div> : <div><h1>Loading...</h1></div>}
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usersData: state.users.users,
        userVideos: state.videos.userVideos,
        authUser: state.authorize.authUser,
        signInName: state.forms.signInName,
        signUpName: state.forms.signUpName,
        signIn: state.app.signIn,
        signUp: state.app.signUp,
        addVideo: state.app.addVideo,
        videoPlayer: state.app.videoPlayer,
    }
}
const mapDispatchIoProps = {
    showAddVideo, addUserVideos,
}
export default connect(mapStateToProps, mapDispatchIoProps)(Profile)