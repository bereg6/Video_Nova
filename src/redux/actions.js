import {
    ADD_USERS,
    ADD_VIDEOS,
    HIDE_ALERT,
    SHOW_ALERT,
    SIGN_IN,
    SIGN_UP,
    SHOW_SIGN_IN,
    SHOW_ADD_VIDEO,
    SHOW_SIGN_UP,
    HIDE_SIGN_IN,
    HIDE_ADD_VIDEO,
    HIDE_SIGN_UP,
    RE_PASS,
    LINK,
    TITLE,
    DESCRIPTION,
    CLEAR_ALL_FIELDS,
    SIGN_IN_NAME,
    SIGN_IN_PASS,
    SIGN_UP_NAME,
    SIGN_UP_PASS,
    ADD_VIDEO,
    SHOW_LOADING,
    HIDE_LOADING,
    SHOW_ADD_VIDEO_LOADING, PRE_URL, SHOW_SUCCESSFUL, HIDE_PASS, SHOW_PASS, SHOW_VIDEO_PLAYER, HIDE_VIDEO_PLAYER,
} from "./types"
import {customHistory} from "../index"

/*----------appReduser----------*/

export function showAlert(text) {
    return {
        type: SHOW_ALERT,
        payload: text,
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT,
    }
}

export function showSignIn() {
    return dispatch => {
        dispatch(clearAllFields())
        dispatch({type: SHOW_SIGN_IN})
    }
}
export function hideSignIn() {
    return dispatch => {
        dispatch(clearAllFields())
        dispatch({type: HIDE_SIGN_IN})
    }
}
export function showSignUp() {
    return dispatch => {
        dispatch(clearAllFields())
        dispatch({type: SHOW_SIGN_UP})
    }
}
export function hideSignUp() {
    return dispatch => {
        dispatch(clearAllFields())
        dispatch({type: HIDE_SIGN_UP})
    }
}
export function showAddVideo() {
    return dispatch => {
        dispatch({type: SHOW_ADD_VIDEO})
    }
}
export function hideAddVideo() {
    return dispatch => {
        dispatch(clearAllFields())
        dispatch({type: HIDE_ADD_VIDEO})
    }
}
export function showVideoPlayer() {
    return {
        type: SHOW_VIDEO_PLAYER
    }
}
export function hideVideoPlayer() {
    return {
        type: HIDE_VIDEO_PLAYER
    }
}
export function showLoading() {
    return {
        type: SHOW_LOADING
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADING
    }
}
export function showAddVideoLoading() {
    return {
        type: SHOW_ADD_VIDEO_LOADING
    }
}
export function showSuccessful() {
    return {
        type: SHOW_SUCCESSFUL
    }
}
export function showPass() {
    return {
        type: SHOW_PASS
    }
}
export function hidePass() {
    return {
        type: HIDE_PASS
    }
}

/*----------formReduser----------*/

export function funcSignInName(text) {
    return {
        type: SIGN_IN_NAME,
        payload: text,
    }
}
export function funcSignInPass(text) {
    return {
        type: SIGN_IN_PASS,
        payload: text,
    }
}
export function funcSignUpName(text) {
    return {
        type: SIGN_UP_NAME,
        payload: text,
    }
}
export function funcSignUpPass(text) {
    return {
        type: SIGN_UP_PASS,
        payload: text,
    }
}
export function funcRePass(text) {
    return {
        type: RE_PASS,
        payload: text,
    }
}
export function funcLink(text) {
    return {
        type: LINK,
        payload: text,
    }
}
export function funcTitle(text) {
    return {
        type: TITLE,
        payload: text,
    }
}
export function funcDescription(text) {
    return {
        type: DESCRIPTION,
        payload: text,
    }
}
export function funcPreUrl(preUrl) {
    return {
        type: PRE_URL,
        payload: preUrl,
    }
}
export function clearAllFields() {
    return {
        type: CLEAR_ALL_FIELDS,
    }
}

/*----------userReduser----------*/

export function addUsers() {
    return async dispatch => {
        const response = await fetch("https://wonderful-app-lmk4d.cloud.serverless.com/user")
        const json = await response.json()
        dispatch({type: ADD_USERS, payload: json})
    }
}

/*----------videoReduser----------*/

export function addVideos() {
    return async dispatch => {
        const response = await fetch("https://wonderful-app-lmk4d.cloud.serverless.com/video")
        const json = await response.json()
        dispatch({type: ADD_VIDEOS, payload: json})
    }
}
export function addVideo(data, token) {
    return async dispatch => {
        dispatch(showLoading())
        try {
            const response = await fetch("https://wonderful-app-lmk4d.cloud.serverless.com/video",
               {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                })
            const json = response.json()
            if (json.type === "unauthorized") {
                dispatch(showAlert(json.message))
            } else {
                dispatch({type: ADD_VIDEO, payload: json})
                dispatch(hideLoading())
                dispatch(showSuccessful())
                dispatch(addVideos())
            }
        } catch (e) {
            showAlert(e.message)
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
        }
    }
}

/*----------authorizeReduser----------*/

export function auth(data) {
    return async dispatch => {
        try {
            const response = await fetch("https://wonderful-app-lmk4d.cloud.serverless.com/auth",
           {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            if (json.type === "notfound") {
                dispatch(showAlert(json.message))
                dispatch(funcSignInPass(""))
            } else {
                customHistory.push(`/profile/${json.slug}`)
                dispatch({type: SIGN_IN, payload: json})
            }
        } catch (e) {
            showAlert(e.message)
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)}
    }
}
export function reg(data) {
    return async dispatch => {
        dispatch(showLoading())
        try {
            const response = await fetch("https://wonderful-app-lmk4d.cloud.serverless.com/register",
           {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            if (json.type === "exists") {
                dispatch(showAlert(json.message))
                dispatch(hideLoading())
                dispatch(clearAllFields())
            } else {
                customHistory.push(`/profile/${json.slug}`)
                dispatch({type: SIGN_UP, payload: json})
                dispatch(hideLoading())
                dispatch(addUsers())
            }
        } catch (e) {
            showAlert(e.message)
            dispatch(hideLoading())
            setTimeout(() => {
                dispatch(hideAlert())
            }, 3000)
        }
    }
}