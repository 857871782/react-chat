import React, {Component} from "react";
import Logo from "../../components/logo/logo";
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Radio,
    Toast
} from "antd-mobile";
import {connect} from "react-redux"
import {register} from "../../redux/user.redux"

@connect(
    state => state.user,
    {register}
)
class Register extends Component {
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
        this.props.register(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    </List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
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

export default Register;