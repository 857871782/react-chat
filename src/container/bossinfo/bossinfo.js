import React, {Component} from "react";
import {NavBar,InputItem, TextareaItem, Button} from "antd-mobile";

import AvatarSelector from "../../components/avata-selector/avatar-selector"
import Input from "antd-mobile/lib/input-item/Input";

export default class BossInfo extends Component {
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
        console.log(this.state)
    }

    render(){
        return (
            <div>
                <NavBar mode="dark">Boss完善信息</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem onChange={v => this.handleChange('title',v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChange('company',v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChange('money',v)}>薪资</InputItem>
                <TextareaItem rows={3} autoHeight title="职位要求" onChange={v => this.handleChange('desc',v)}></TextareaItem>
                <Button></Button>
            </div>
        )
    }
}