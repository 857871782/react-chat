import React, {Component} from "react";
import {connect} from "react-redux";
import {NavBar} from "antd-mobile";
import {Switch, Route} from "react-router-dom"
import NavLinkBar from "../navlink/navlink";
import {getMsgList, recvMsg} from "../../redux/chat.redux";

import Boss from "../../components/boss/boss";
import Candidate from "../../components/candidate/candidate";
import User from "../../components/user/user";
import Msg from "../../components/msg/msg"

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboard extends Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        
    }
    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: "avatar1",
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'Candidate'
            },
            {
                path: '/candidate',
                text: 'boss',
                icon: "avatar2",
                title: 'BOSS列表',
                component: Candidate,
                hide: user.type === 'Boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: "avatar3",
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: "avatar4",
                title: '个人中心',
                component: User,
            }
        ]
        return (
            <div>
                <NavBar className="fixd-header" mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(item => (
                            <Route key={item.path} path={item.path} component={item.component}></Route>
                        ))}
                    </Switch> 
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;