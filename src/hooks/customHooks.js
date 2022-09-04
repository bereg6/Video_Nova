import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {hideAddVideo, hideSignIn, hideSignUp, hideVideoPlayer} from "../redux/actions"

export const useRedirect = (authUser, signInName, signUpName) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (authUser && signInName !== "") {
            navigate(`/profile/${authUser.slug}`)
            dispatch(hideSignIn())
        }
        if (authUser && signUpName !== "") {
            navigate(`/profile/${authUser.slug}`)
            dispatch(hideSignUp())
        }
    }, [authUser])
}

export const useHideForm = (formName) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const listener = (e) => {
            const form = document.getElementById(formName).getBoundingClientRect()
            if (form.left > e.pageX || form.right < e.pageX ||
                form.top + window.pageYOffset > e.pageY || form.bottom + window.pageYOffset < e.pageY) {
                document.removeEventListener("click", listener)
                if (formName === "signIn") {
                    document.getElementsByClassName("form")[0].style.transition = "all ease-in-out 0.7s 0s"
                    document.getElementsByClassName("form")[0].style.opacity = "0"
                    setTimeout(() => {
                        dispatch(hideSignIn())
                    }, 300)
                } else if (formName === "signUp") {
                    document.getElementsByClassName("form")[0].style.transition = "all ease-in-out 0.7s 0s"
                    document.getElementsByClassName("form")[0].style.opacity = "0"
                    setTimeout(() => {
                        dispatch(hideSignUp())
                    }, 300)
                } else if (formName === "addVideo") {
                    document.getElementsByClassName("form")[0].style.transition = "all ease-in-out 0.7s 0s"
                    document.getElementsByClassName("form")[0].style.opacity = "0"
                    setTimeout(() => {
                        dispatch(hideAddVideo())
                    }, 300)
                } else if (formName === "videoPlayer") {
                    closePlayer()
                    setTimeout(() => {
                        dispatch(hideVideoPlayer())
                    }, 400)
                }
            }
        }
        setTimeout(() => {
            document.addEventListener("click", listener)
        }, 500)
        return () => {
            document.removeEventListener("click", listener)
        }
    }, [])
}

function closePlayer() {
    const block = document.getElementById("profile__wrapper")
    const blockPosition = block.getBoundingClientRect()
    const currentVideo = document.getElementsByClassName("activeVideo")[0]
    const videoInFocus = currentVideo.getBoundingClientRect()
    const videoPlayer = document.getElementById("videoPlayer")
    const scroll = window.pageYOffset
    videoPlayer.style.left = `${videoInFocus.left - blockPosition.left}px`
    videoPlayer.style.top = `${videoInFocus.top + scroll}px`
    videoPlayer.style.width = `${videoInFocus.width}px`
    videoPlayer.style.height = `${videoInFocus.height}px`
    currentVideo.classList.remove("activeVideo")
}