import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavBar, InputItem, Button, TextareaItem } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import { updateUser } from "../../redux/action";
class DashenInfo extends React.Component {
  state = {
    header: "", //头像
    post: "", //职位
    info: "" //信息
  };
  setHeader = header => {
    this.setState({
      header
    });
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  save = () => {
    this.props.updateUser(this.state);
  };
  render() {
    const { header, type } = this.props.user;
    if (header) {
      //有头像，信息完善
      const path = type === "dashen" ? "/dashen" : "/laoban";
      return <Redirect to={path}></Redirect>;
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem
          onChange={val => {
            this.handleChange("post", val);
          }}
          placeholder="请输入求职岗位"
        >
          求职岗位:
        </InputItem>
        <TextareaItem
          title="个人介绍"
          rows={3}
          onChange={val => {
            this.handleChange("info", val);
          }}
          placeholder="请输入个人介绍"
        ></TextareaItem>
        <Button onClick={this.save} type="primary">
          保&nbsp;&nbsp;&nbsp;存
        </Button>
      </div>
    );
  }
}
export default connect(state => ({ user: state.user }), { updateUser })(
  DashenInfo
);
