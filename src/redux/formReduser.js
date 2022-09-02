import {
    LINK,
    DESCRIPTION,
    RE_PASS,
    TITLE,
    CLEAR_ALL_FIELDS,
    SIGN_IN_NAME,
    SIGN_IN_PASS,
    SIGN_UP_PASS,
    SIGN_UP_NAME,
    PRE_URL,
} from "./types"

const initialState = {
    signInName: "",
    signInPass: "",
    signUpName: "",
    signUpPass: "",
    rePass: "",
    link: "",
    title: "",
    description: "",
    preUrl: "",
}

export const formReduser = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_NAME:
            return {...state, signInName: action.payload}
        case SIGN_IN_PASS:
            return {...state, signInPass: action.payload}
        case SIGN_UP_NAME:
            return {...state, signUpName: action.payload}
        case SIGN_UP_PASS:
            return {...state, signUpPass: action.payload}
        case RE_PASS:
            return {...state, rePass: action.payload}
        case LINK:
            return {...state, link: action.payload}
        case TITLE:
            return {...state, title: action.payload}
        case DESCRIPTION:
            return {...state, description: action.payload}
        case CLEAR_ALL_FIELDS:
            return {...state, signInName: "", signInPass: "", signUpName: "", signUpPass: "",
                rePass: "", link: "", description: "", title: "", preUrl: ""}
        case PRE_URL:
            return {...state, preUrl: action.payload}
        default: return state
    }
}