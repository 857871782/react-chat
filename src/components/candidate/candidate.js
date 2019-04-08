import React, {Component} from "react";
import {connect} from "react-redux";
import UserCard from "../usercard/usercard"

import {getUserList} from "../../redux/chatuser.redux"

@connect(
    state => state.chatuser,
    {getUserList}
)
class Candidate extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.props.getUserList('Boss')
    }

    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>   
    }
}

export default Candidate;