import {combineReducers} from "redux"
import usersReduceres from "./reducer"

const rootReducer = combineReducers({
    data:usersReduceres,
})

export default rootReducer;