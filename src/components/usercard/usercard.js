import React, {Component} from "react";
import PropTtypes from "prop-types";
import {WingBlank, WhiteSpace, Card} from "antd-mobile";
import {withRouter} from "react-router-dom";

@withRouter
class UserCard extends Component{
    static propTypes = {
        userlist: PropTtypes.array.isRequired
    }

    handleClick = (data) => {
        this.props.history.push(`/chat/${data._id}`)
    }
    render(){
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(item => (
                    item.avatar?
                        (<Card key={item._id} onClick={() => this.handleClick(item)}>
                            <Card.Header 
                                title={item.user} 
                                thumb={require(`../img/${item.avatar}.png`)}
                                extra={<span>{item.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {item.type === "Boss" ? <div style={{fontWeight: 800,marginBottom: 5}}>公司：{item.company}</div> : null}
                                {item.desc.split('\n').map(v => (
                                    <div key={v}>{v}</div>
                                ))}
                                {item.type === "Boss" ? <div>薪资：{item.money}</div> : null}
                            </Card.Body>
                        </Card>) : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard;