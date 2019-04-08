import React, {Component} from "react";
import {connect} from "react-redux";
import {List, Badge} from "antd-mobile"

@connect(
    state => state
)
class Msg extends Component {
    getLast = (arr) => {
        return arr[arr.length -1];
    }

    render(){
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(val => {
            msgGroup[val.chatid] = msgGroup[val.chatid] || []
            msgGroup[val.chatid].push(val);
        });
        const chatList = Object.values(msgGroup)
        console.log(chatList)
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users
        return(
            <div>
                {chatList.map(v => {
                    const last = this.getLast(v);
                    const targetid = v[0].from === userid ? v[0].to : v[0].from;
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                    return (
                        <List key={last._id}>
                            <Item 
                                thumb={require(`../img/${userinfo[targetid].avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetid}`)
                                }}
                            >
                                {last.content}
                                <Brief>{userinfo[targetid].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}

export default Msg;