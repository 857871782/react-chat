import React, {Component} from "react";
import Logo from "../../components/logo/logo";
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Radio
} from "antd-mobile";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'Candidate' //注册用户类型
        }
    }

    handleChange = (key, val) => {
        this.setState({[key]: val})
    }

    handleRegister = () => {
        console.log(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <h2>注册页面</h2>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <RadioItem
                            checked={this.state.type === 'Candidate'}
                            onChange={() => {
                            this.handleChange('type', 'Candidate')
                        }}>应聘者</RadioItem>
                        <RadioItem
                            checked={this.state.type === 'Boss'}
                            onChange={() => {
                            this.handleChange('type', 'Boss')
                        }}>Boss</RadioItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}