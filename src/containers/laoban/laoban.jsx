import React from "react";
import {connect} from 'react-redux';
import UserList from '../../components/user-list/user-list';
import {getUserList} from '../../redux/action';
class Laoban extends React.Component {
  componentDidMount(){
    this.props.getUserList('dashen');
  }
  render() {
    return <UserList userList={this.props.userList} />
  }
}

export default connect(state=>({userList:state.userList}),{getUserList})(Laoban);
