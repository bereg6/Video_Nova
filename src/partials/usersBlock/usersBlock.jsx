import React from "react"
import {connect} from "react-redux"
import UserCard from "../userCard/userCard"

function UsersBlock({usersData}) {
    return(
        <div className="userCards__wrapper">
            {usersData.map((user) =>
                <div className="userCards__card" key={user.id}>
                    <UserCard user={user}/>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usersData: state.users.users,
    }
}
export default connect(mapStateToProps)(UsersBlock)