import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {hideAddVideo, hideSignIn, hideSignUp} from "../redux/actions"

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
                    dispatch(hideSignIn())
                } else if (formName === "signUp") {
                   dispatch(hideSignUp())
                } else if (formName === "addVideo") {
                    dispatch(hideAddVideo())
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