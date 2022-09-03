import {
    HIDE_ADD_VIDEO,
    HIDE_ALERT, HIDE_LOADING, HIDE_PASS,
    HIDE_SIGN_IN, HIDE_SIGN_UP, HIDE_VIDEO_PLAYER, SHOW_ADD_VIDEO, SHOW_ADD_VIDEO_LOADING,
    SHOW_ALERT, SHOW_LOADING, SHOW_PASS,
    SHOW_SIGN_IN,
    SHOW_SIGN_UP, SHOW_SUCCESSFUL, SHOW_VIDEO_PLAYER,
} from "./types"

const initialState = {
    alert: null,
    signIn: false,
    signUp: false,
    addVideo: false,
    videoPlayer: false,
    addVideoLoading: false,
    loading: false,
    visiblePass: false,
    successful: false,
}

export const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return  {...state, alert: action.payload}
        case HIDE_ALERT:
            return  {...state, alert: null}
        case SHOW_SIGN_IN:
            return {...state, signIn: true, signUp: false, alert: null, visiblePass: false, loading: false}
        case HIDE_SIGN_IN:
            return {...state, signIn: false, visiblePass: false, alert: false}
        case SHOW_SIGN_UP:
            return {...state, signUp: true, signIn: false, alert: null, visiblePass: false}
        case HIDE_SIGN_UP:
            return {...state, signUp: false, visiblePass: false, loading: false}
        case SHOW_ADD_VIDEO:
            return {...state, addVideo: true}
        case HIDE_ADD_VIDEO:
            return {...state, addVideo: false, addVideoLoading: false, loading: false, alert: null, successful: false}
        case SHOW_VIDEO_PLAYER:
            return {...state, videoPlayer: true}
        case HIDE_VIDEO_PLAYER:
            return {...state, videoPlayer: false}
        case SHOW_ADD_VIDEO_LOADING:
            return {...state, addVideoLoading: true}
        case SHOW_LOADING:
            return {...state, loading: true}
        case HIDE_LOADING:
            return {...state, loading: false}
        case SHOW_SUCCESSFUL:
            return {...state, successful: true}
        case SHOW_PASS:
            return  {...state, visiblePass: true}
        case HIDE_PASS:
            return  {...state, visiblePass: false}
        default: return state
    }
}