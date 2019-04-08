import React, {Component} from "react";
import {connect} from "react-redux";
import {Result, List, WhiteSpace, Button, Modal} from "antd-mobile";
import browserCookies from "browser-cookies";
import {logoutSubmit} from "../../redux/user.redux";
import {Redirect} from "react-router-dom"

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends Component{
   
    logout = () => {
        const alert = Modal.alert;
        alert("注销","确认退出登陆吗",[
            {text: "取消", onPress: () => console.log("cancel")},
            {text: "确认", onPress: () => {
                browserCookies.erase("userid");
                this.props.logoutSubmit();
            }}
        ])
    }

    render(){
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.avatar ? 
            (
                <div>
                    <Result 
                        img={<img style={{width: 50}} src={require(`../img/${props.avatar}.png`)} alt="avatar"/>}
                        title={props.user}
                        message={props.type === 'Boss' ? props.company : null}
                    />
                    <WhiteSpace />
                    <List renderHeader={() => '简介'}>
                        <Item multipleLine>
                            {props.title}
                            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <Button onClick={this.logout}>退出</Button>
                </div>
            ) : <Redirect to={props.redirectTo}/>
    }
}

export default User;