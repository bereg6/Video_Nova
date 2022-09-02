import {SIGN_IN, SIGN_UP} from "./types"

const initialState = {
    authUser: "",
}

export const authorizeReduser = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, authUser: action.payload}
        case SIGN_UP:
            return {...state, authUser: action.payload}
        default:
            return state
    }
}