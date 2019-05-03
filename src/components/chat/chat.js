import React, {Component} from "react";
import {List, InputItem, NavBar, Icon} from "antd-mobile";
import {connect} from "react-redux";
import {getMsgList, sendMsg, recvMsg, readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util"

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }   
    }

    componentWillUnmount(){
        const to = this.props.match.params.user; 
        this.props.readMsg(to)
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        if(msg === ""){
            return;
        }
        this.props.sendMsg(from, to, msg);
        this.setState({text: ''})
    }

    render(){
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[userid]){
            return null;
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
        return (
            <div id="chat-page">
                <NavBar 
                    mode="dark" 
                    icon={<Icon type="left"/>} 
                    onLeftClick={() => {
                        this.props.history.goBack();
                    }}
                >{users[userid].name}</NavBar>
                <div style={{marginBottom: 45}}>
                {chatmsgs.map(item => {
                    const avatar = require(`../img/${users[item.from].avatar}.png`)
                    return item.from === userid ? (
                        <List key={item._id}>
                            <Item thumb={avatar}>{item.content}</Item>
                        </List>
                    ) : (
                        <List key={item._id}>
                            <Item 
                                className="chat-me"
                                extra={<img src={avatar} alt="avatar"/>}
                            >{item.content}</Item>
                        </List>
                    )
                })}
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={val => {
                                this.setState({text: val})
                            }}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        >                           
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;