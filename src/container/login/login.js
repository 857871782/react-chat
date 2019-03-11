import React, {Component} from "react";
import Logo from "../../components/logo/logo";
import {List, InputItem, WingBlank, WhiteSpace, Button} from "antd-mobile"; 

export default class Login extends Component{
    register = () => {
        this.props.history.push('/register');
    }

    render(){
        return (
            <div>
                <Logo />
                <h2>登陆页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem type="password">密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}