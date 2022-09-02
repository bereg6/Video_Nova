import React from "react"
import "./style.css"
import Button from "../../primitives/button/button"
import {connect} from "react-redux"

function UserCard (props) {
    let countLikes = 0
    let countVideos = 0
    if (props.videosData) {
        props.videosData.map(({userId}) => (props.user.id === userId) ? countVideos += 1 : countVideos)
    } else {
        countVideos = 0
    }

    return(
        <div className="userCard" id={props.user.userName}>
            <div className="userCard__image"><img src={props.user.userPic} alt="" /></div>
            <h3 className="userCard__userName">{props.user.userName}</h3>
            <div className="userCard__titleWrapper">
                <div className="titleVideos">
                    <div className="titleVideos__icon">
                        <img src={"images/video-count.png"} alt={""}/>
                    </div>
                    {countVideos} videos
                </div>
                <div className="titleLikes">
                    <div className="titleLikes__icon">
                        <img src={"images/Likes.png"} alt={""}/>
                    </div>
                    {countLikes} likes
                </div>
            </div>
            <Button text={"To profile"} id={props.user.slug}></Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        videosData: state.videos.videos
    }
}
export default connect(mapStateToProps)(UserCard)