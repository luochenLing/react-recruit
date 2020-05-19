import React from "react";
import Proptypes from "prop-types";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import { withRouter } from "react-router-dom";
import QueueAmim from "rc-queue-anim";

const Header = Card.Header;
const Body = Card.Body;
class UserList extends React.Component {
  static propTypes = {
    userList: Proptypes.array.isRequired
  };
  render() {
    const { userList } = this.props;
    return (
      <WingBlank style={{ marginBottom: 50, marginTop: 50 }}>
        <QueueAmim type="left" delay={100}>
          {userList.map(user => (
            <div key={user._id}>
              <WhiteSpace />
              <Card
                onClick={() => this.props.history.push(`/chat/${user._id}`)}
              >
                <Header
                  thumb={require(`../../assets/images/${user.header}.jpg`)}
                  extra={user.username}
                  thumbStyle={{ width: "100%" }}
                >
                  <Body>
                    <div>职位:{user.post}}</div>
                    {user.company ? <div>公司:{user.company}}</div> : null}
                    {user.salary ? <div>月薪:{user.salary}}</div> : null}
                    <div>描述:{user.info}</div>
                  </Body>
                </Header>
              </Card>
            </div>
          ))}
        </QueueAmim>
      </WingBlank>
    );
  }
}

export default withRouter(UserList);
