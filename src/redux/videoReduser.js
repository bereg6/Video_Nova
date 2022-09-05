import {ADD_USER_VIDEOS, ADD_VIDEO, ADD_VIDEOS} from "./types"

const initialState = {
    videos: [],
    userVideos: [],
}

export const videoReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIDEOS:
            return {...state, videos: action.payload}
        case ADD_VIDEO:
            return {...state, videos: state.videos.concat([action.payload])}
        case ADD_USER_VIDEOS:
            return {...state, userVideos: action.payload}
        default: return  state
    }
}