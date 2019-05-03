import React ,{Component} from "react";
import {withRouter} from "react-router-dom"

import logoImg from "./logo.png"
import "./logo.css"

@withRouter
class Logo extends Component {
    render(){
        const pathname = this.props.history.location.pathname;
        return (
            <div className="logo-container">
                {pathname === "/login" ? "登录" : "注册"}
            </div>
        )
    }
}

export default Logo