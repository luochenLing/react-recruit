/**
 * 登录路由组件
 */
import React from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Button,
  WhiteSpace
} from "antd-mobile";
import { connect } from "react-redux";
import { login } from "../../redux/action";
import { Redirect } from "react-router-dom";
import Logo from "../../components/logo/logo";

class Login extends React.Component {
  state = {
    username: "", //用户名
    password: "", //密码
  };
  login = () => {
    this.props.login(this.state);
  };
  toRegister = () => {
    this.props.history.replace("/register");
  };
  //输入数据改变处理
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  render() {
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
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state=>({user:state.user}),{login})(Login)