import React, {useEffect} from "react"
import "../style.css"
import Field from "../../../primitives/field/field"
import Button from "../../../primitives/button/button"
import {connect, useDispatch} from "react-redux"
import {
    funcDescription,
    funcLink,
    funcTitle,
    hideAddVideo,
    showAlert,
    addVideo,
    showLoading, showAddVideoLoading, funcPreUrl, hideAlert
} from "../../../redux/actions"
import Alert from "../../../primitives/field/alert"
import Loading from "../../../primitives/loading/loading"
import {useHideForm} from "../../../hooks/customHooks"

function AddVideo({hideAddVideo, funcTitle, funcDescription, funcLink, alert, addVideoLoading, loading, preUrl, successful,
                   authUser ,showAlert, link, title, description, addVideo, showAddVideoLoading, funcPreUrl, hideAlert}){
    const dispatch = useDispatch
    const token = authUser.authToken
    useHideForm("addVideo")

    useEffect(() => {
        const thisLink = document.getElementById("link")
        thisLink.value = link
        const thisTitle = document.getElementById("title")
        thisTitle.value = title
        const thisDescription = document.getElementById("description")
        thisDescription.value = description
        thisLink.oninput = () => dispatch(funcLink(thisLink.value))
        thisTitle.oninput = () => dispatch(funcTitle(thisTitle.value))
        thisDescription.oninput = () => dispatch(funcDescription(thisDescription.value))
    }, [link, title, description])

    function funcAddVideo() {
        const linkToArr = link.split("/")
        const preUrl = linkToArr.pop().split("=").pop()
        if (link === "" || title === "" || description === "") {
            showAlert("Fields can't be empty.")
        } else if (linkToArr.join("/") === "https://youtube.com" ||
            linkToArr.join("/") === "https://www.youtube.com" ||
            linkToArr.join("/") === "https://youtu.be" ||
            linkToArr[0] === "youtube.com" ||
            linkToArr[0] === "www.youtube.com") {
            setTimeout(() => {
                hideAlert()
                funcPreUrl(preUrl)
                showAddVideoLoading()
            }, 200)
        } else {
            showAlert("This is not a YouTube link.")
        }
    }

    function addVideoToServer() {
        const data = {
            url: `https://youtube.com/embed/${preUrl}`,
            title: title,
            description: description
        }
        addVideo(data, token)
    }

    return(
        <div className="form" id={"addVideo"}>
            <div className="form__heading">
                <h1 style={{paddingRight: "10px"}}>Add</h1>
                <h1 style={{color: "#FF6363", paddingRight: "10px"}}>New</h1>
                <h1>Video</h1>
            </div>
            {alert && <Alert text={alert}/>}
            {!addVideoLoading ?
                <div>
                <Field id="link" label={"Youtube Link"}/>
                <Field id="title" label={"Name of video"}/>
                <Field id="description" label={"Description"}/>
                </div>
                : <div style={{position: "relative"}}>
                    {loading && <div className="loadingBlock">
                        <div>
                        <Loading size={"big"}/>
                        </div>
                    </div>}
                    {successful && <div className="loadingBlock">
                        <div>
                            <img src={"../images/successful.png"}
                                 style={{width: "100%", height: "100%"}} alt={""}/>
                        </div>
                    </div>}
                    <img src={`https://img.youtube.com/vi/${preUrl}/hqdefault.jpg`}
                        style={{width: "314px",
                        height: "178px",
                        borderRadius: "14px",
                        overflow: "hidden", marginBottom: "22px"}} alt='Demo video'/>
                </div>
            }
            {!addVideoLoading ? <div className="form__buttons">
                <div><Button text={"Cancel"} transparent onClick={hideAddVideo}/></div>
                <Button text={"Submit"} onClick={funcAddVideo}/>
                </div>
                : <div style={{display: "flex", justifyContent: "center"}}>
                    {!loading ? <div>
                            {!successful ? <Button text={"Start Now"} onClick={addVideoToServer}/>
                            : <div>
                                    <h2 style={{marginBottom: "50px"}}>Successful</h2>
                                    <Button text={"To Video"} onClick={hideAddVideo}/>
                            </div>}
                        </div>
                    :<div>
                        <h2 style={{marginBottom: "50px"}}>Loading...</h2>
                        <Button text={"Start Now"} disabled/>
                    </div>}
                </div>}

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        link: state.forms.link,
        title: state.forms.title,
        description: state.forms.description,
        preUrl: state.forms.preUrl,
        alert: state.app.alert,
        authUser: state.authorize.authUser,
        addVideoLoading: state.app.addVideoLoading,
        loading: state.app.loading,
        successful: state.app.successful,
    }
}
const mapDispatchToProps = {
        hideAddVideo, funcTitle, funcDescription, funcLink, showAlert, addVideo, showLoading, showAddVideoLoading, funcPreUrl, hideAlert
}
export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)