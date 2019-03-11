import React ,{Component} from "react";

import logoImg from "./logo.png"
import "./logo.css"

export default class Logo extends Component {
    render(){
        return (
            <div className="logo-container">
                <img src={logoImg} alt="logo" />
            </div>
        )
    }
}