/**
 * 主界面路由组件
 */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";
import Dashen from "../dashen/dashen";
import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import NaveFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";
import { getRedirectTo } from "../../utils";
import { getUser } from "../../redux/action";
import { NavBar } from "antd-mobile";


class Main extends React.Component {
  navList = [
    {
      path: "/dashen",
      component: Dashen,
      title: "老板列表",
      icon: "laoban",
      text: "老板"
    },
    {
      path: "/laoban",
      component: Laoban,
      title: "大神列表",
      icon: "dashen",
      text: "大神"
    },
    {
      path: "/message",
      component: Message,
      title: "消息列表",
      icon: "message",
      text: "消息"
    },
    {
      path: "/personal",
      component: Personal,
      title: "用户中心",
      icon: "personal",
      text: "个人"
    }
  ];

  componentDidMount() {
    const userid = Cookies.get("userid");
    const { _id } = this.props.user;
    if (userid && !_id) {
      this.props.getUser();
    }
  }

  render() {
    //自动登录
    const userid = Cookies.get("userid");
    if (!userid) {
      return <Redirect to="/login"></Redirect>;
    }
    const { user,unReadCount } = this.props;
    if (!user._id) {
      return null;
    } else {
      let path = this.props.location.pathname;
      if (path === "/") {
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}></Redirect>;
      }
    }

    const navlist = this.navList;
    const path = this.props.location.pathname;
    //当前nav，没有跳转到404
    const currentNav = navlist.find(nav => nav.path === path);
    if (currentNav) {
      if (user.type === "laoban") {
        navlist[0].hide=true;
      } else {
        navlist[1].hide=true;
      }
    }
    return (
      <div>
        {currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null}
        <Switch>
          {navlist.map((nav, index) => (
            <Route
              key={index}
              path={nav.path}
              component={nav.component}
            ></Route>
          ))}
          <Route path="/laobaninfo" component={LaobanInfo}></Route>
          <Route path="/dasheninfo" component={DashenInfo}></Route>
          <Route path="/chat/:userid" component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        
        {currentNav ? <NaveFooter unReadCount={unReadCount} navList={navlist}></NaveFooter> : null}
      </div>
    );
  }
}
export default connect(state => ({ user: state.user,unReadCount:state.chat.unReadCount }), { getUser })(Main);
