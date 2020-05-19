import React from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";
class HeaderSelector extends React.Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  };

  state = {
    icon: null
  };

  constructor(props) {
    super(props);
    this.headerList = [];
    for (let i = 0; i < 6; i++) {
      //var obj=props[i];
      this.headerList.push({
        text: "头像" + (i + 1),
        code:`head-img${i+1}`,
        icon: require(`../../assets/images/head-img${i + 1}.jpg`)
      });
    }
  }

  handleClick = ({ code, icon }) => {
    this.setState({ icon });
    this.props.setHeader(code);
  };
  render() {
    const { icon } = this.state;
    const listHeader = icon ? (
      <div>
        已选择头像:<img alt="头像" style={{ width: "50px" }} src={icon}></img>
      </div>
    ) : (
      "请选择头像"
    );
    return (
      <List renderHeader={() => listHeader}>
        <Grid
          onClick={this.handleClick}
          columnNum={3}
          data={this.headerList}
        ></Grid>
      </List>
    );
  }
}

export default HeaderSelector;
