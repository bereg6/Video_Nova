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
import {addUsers, addVideos, showAddVideo} from "../../redux/actions"
import {blur, unBlur} from "../../functions"
import VideoPlayer from "../../primitives/videoPlayer/videoPlayer"

function Profile({usersData, videosData, authUser, signInName, signUpName,
                  signIn, signUp, addVideo, showAddVideo, videoPlayer}) {
    useRedirect(authUser, signInName, signUpName)
    const dispatch = useDispatch()
    let params = useParams()

    let thisUser
    let thisVideos = []
        if (usersData.length === 0 && videosData.length === 0) {
            Data()
                .then(() => {
                    usersData.map(user => user.slug === params.user ? thisUser = user : "")
                    videosData.map(video => thisUser.id === video.userId ? thisVideos.push(video) : thisVideos)
                })
        } else if (authUser.slug === params.user) {
            thisUser = authUser
            videosData.map(video => thisUser.id === video.userId ? thisVideos.push(video) : thisVideos)
        } else {
            usersData.map(user => user.slug === params.user ? thisUser = user : "")
            videosData.map(video => thisUser.id === video.userId ? thisVideos.push(video) : thisVideos)
        }

    useEffect(() => {
        if (signUp || signIn || addVideo || videoPlayer) {
            blur()
        } else {
            unBlur()
        }
    }, [signUp, signIn, addVideo, videoPlayer])

    async function Data() {
        usersData = await dispatch(addUsers())
        videosData = await dispatch(addVideos())
        return {usersData, videosData}
    }

    return(
    <div className="page">
        {signIn && <SignIn/>}
        {signUp && <SignUp/>}
        {addVideo && <AddVideo/>}
        {videoPlayer && <VideoPlayer/>}
        <Header/>
        <div className="profile__wrapper" id="profile__wrapper">
        {usersData.length !==0 && videosData.length !== 0 ? <div className="profile" id="profile">
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
                    {thisVideos.length === 0 ? <h1>No videos</h1>
                        : thisVideos.map(({url, title, description, id}) =>
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
        videosData: state.videos.videos,
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
    showAddVideo,
}
export default connect(mapStateToProps, mapDispatchIoProps)(Profile)