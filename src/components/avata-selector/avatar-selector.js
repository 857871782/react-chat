import React, {Component} from "react";
import {Grid, List} from "antd-mobile"
import PropTtypes from "prop-types"

export default class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTtypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            icon: '',
            text: ''
        }
    }

    render() {
        const avatarList = [
            "avatar1",
            "avatar2",
            "avatar3",
            "avatar4",
            "avatar5",
            "avatar6"
        ].map(val => ({
            icon: require(`../img/${val}.png`),
            text: val
        }));
        const gridHeader = this.state.text
            ? (
                <div>
                    <span>已选择头像</span>
                    <img
                        style={{
                        width: '20px'
                    }}
                        src={this.state.icon}
                        alt="avatar"/>
                </div>
            )
            : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={() => gridHeader}> 
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elem => {
                        this.props.selectAvatar(elem.text)
                        this.setState({
                            icon: elem.icon,
                            text: elem.text
                        })
                    }}></Grid>
                </List>
            </div>
        )

    }
}