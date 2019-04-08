import React, {Component} from "react";
import Logo from "../../components/logo/logo";
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Radio,
} from "antd-mobile";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {register} from "../../redux/user.redux"
import wrapperComponent from "../../components/wrappercomponent/wrappercomponent";

@connect(
    state => state.user,
    {register}
)
@wrapperComponent
class Register extends Component {

    componentDidMount(){
        this.props.handleChange("type","Candidate")
    }

    handleRegister = () => {
        this.props.register(this.props.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户:</InputItem>
                        <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码:</InputItem>
                        <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码:</InputItem>
                    </List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <WhiteSpace size="lg"/>
                    <List>
                        <RadioItem
                            checked={this.props.state.type === 'Candidate'}
                            onChange={() => {
                            this.props.handleChange('type', 'Candidate')
                        }}>应聘者</RadioItem>
                        <RadioItem
                            checked={this.props.state.type === 'Boss'}
                            onChange={() => {
                            this.props.handleChange('type', 'Boss')
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