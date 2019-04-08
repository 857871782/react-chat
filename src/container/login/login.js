import React, {Component} from "react";
import Logo from "../../components/logo/logo";
import {List, InputItem, WingBlank, WhiteSpace, Button} from "antd-mobile"; 
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {login} from "../../redux/user.redux";
import wrapperComponent from "../../components/wrappercomponent/wrappercomponent";

@connect(
    state => state.user,
    {login}
)
@wrapperComponent
class Login extends Component{

    register = () => {
        this.props.history.push('/register');
    }

    handleLogin = () => {
        this.props.login(this.props.state);
    }

    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <WhiteSpace size="lg"/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;