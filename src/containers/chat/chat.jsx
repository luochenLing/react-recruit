import React from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Grid, Icon } from "antd-mobile";
import { sendMsg, readMsg } from "../../redux/action";
import QueueAmim from "rc-queue-anim";

const Item = List.Item;

class Chat extends React.Component {
  state = {
    content: "",
    isShow: false
  };

  componentWillMount() {
    const emojis = [
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😚",
      "😙",
      "😋",
      "🤑",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😚",
      "😙",
      "😋",
      "🤑",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😚",
      "😙",
      "😋",
      "🤑"
    ];
    this.emojis = emojis.map(item => ({ text: item }));
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg(from, to);
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg(from, to);
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  toogleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({
      isShow
    });
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
  };

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content;
    if (content) {
      this.props.sendMsg({ from, to, content });
    }
    this.setState({ content: "" });
  };

  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    const meId = user._id;
    if (!users[meId]) {
      return null;
    }

    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join("_");
    //过滤chatMsgs数组，找到只符合自己的一个人的聊天信息
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

    const targetHeader = users[targetId].header;
    const targetIcon = targetHeader
      ? require(`../../assets/images/${targetHeader}.jpg`)
      : null;

    const meHeader = users[meId].header;
    const meIcon = meHeader
      ? require(`../../assets/images/${meHeader}.jpg`)
      : null;

    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left"></Icon>}
          className="sticky-header"
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
          <QueueAmim type="alpha" delay={100}>
            {msgs.map(msg => {
              if (targetId === msg.from) {
                return (
                  <Item className="chat-me" key={msg._id} thumb={targetIcon}>
                    {msg.content}
                  </Item>
                );
              } else {
                return (
                  <Item
                    className="chat-me"
                    key={msg._id}
                    extra={<img alt="头像" src={meIcon}></img>}
                  >
                    {msg.content}
                  </Item>
                );
              }
            })}
          </QueueAmim>
        </List>
        <div className="am-tab-bar">
          <InputItem
            onChange={val => this.setState({ content: val })}
            placeholder="请输入"
            value={this.state.content}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                <span onClick={this.toogleShow} style={{ marginRight: 5 }}>
                  😃
                </span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          ></InputItem>
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={item => {
                this.setState({ content: this.state.content + item.text });
              }}
            ></Grid>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user, chat: state.chat }), {
  sendMsg,
  readMsg
})(Chat);
