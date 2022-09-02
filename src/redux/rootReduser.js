import {combineReducers} from "redux"
import {userReduser} from "./userReduser"
import {videoReduser} from "./videoReduser"
import {appReduser} from "./appReduser"
import {authorizeReduser} from "./authorizeReduser"
import {formReduser} from "./formReduser"

export const rootReduser = combineReducers({
    users: userReduser,
    videos: videoReduser,
    app: appReduser,
    authorize: authorizeReduser,
    forms: formReduser,
})