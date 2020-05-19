/**
 * 注册路由组件
 */
import React from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Radio,
  Button,
  WhiteSpace
} from "antd-mobile";

import { connect } from "react-redux";
import { register } from "../../redux/action";
import { Redirect } from "react-router-dom";
import Logo from "../../components/logo/logo";
const ListItem = List.Item;

class Register extends React.Component {
  state = {
    username: "", //用户名
    password: "", //密码
    password2: "", //确认密码
    type: "" //用户类型 大神/老板
  };
  register = () => {
    this.props.register(this.state);
  };
  toLogin = () => {
    this.props.history.replace("/login");
  };
  //输入数据改变处理
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  render() {
    const { type } = this.state;
    const { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return (
      <div>
        <NavBar>鲸&nbsp;选</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入用户名"
              onChange={val => {
                this.handleChange("username", val);
              }}
            >
              用户名:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              onChange={val => {
                this.handleChange("password", val);
              }}
              type="password"
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入确认密码"
              onChange={val => {
                this.handleChange("password2", val);
              }}
              type="password"
            >
              确认密码:
            </InputItem>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "dashen"}
                onChange={() => this.handleChange("type", "dashen")}
              >
                大神
              </Radio>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "laoban"}
                onChange={() => this.handleChange("type", "laoban")}
              >
                老板
              </Radio>
            </ListItem>
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp; 册
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }), { register })(Register);
