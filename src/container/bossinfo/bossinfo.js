import React, {Component} from "react";
import {NavBar,InputItem, TextareaItem, Button} from "antd-mobile";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import AvatarSelector from "../../components/avata-selector/avatar-selector"
import {update} from "../../redux/user.redux"

import "./bossinfo.css";

@connect(
    state => state.user,
    {update}
)
class BossInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: '',
        }
    }

    handleChange = (key,val) => {
        this.setState({
            [key]: val
        })
    }

    selectAvatar = (imgName) => {
        this.setState({
            avatar: imgName
        });
    }

    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">Boss完善信息</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem onChange={v => this.handleChange('title',v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChange('company',v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChange('money',v)}>薪资</InputItem>
                <TextareaItem rows={3} autoHeight title="职位要求" onChange={v => this.handleChange('desc',v)}></TextareaItem>
                <Button 
                    type="primary" 
                    className="save_btn"
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}

export default BossInfo