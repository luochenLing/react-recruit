import React from "react";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item;
class NavFooter extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount:PropTypes.number.isRequired
  };

  render() {
    let { navList,unReadCount } = this.props;
    navList = navList.filter(nav=>!nav.hide)
    const pathname= this.props.location.pathname;
    // debugger
    return (
      
      <TabBar>
          {
            
              navList.map((nav)=>(
                <Item 
                badge={nav.path==='/message'?unReadCount:0}
                key={nav.path}
                title={nav.text}
                icon={{uri:require(`./images/${nav.icon}.png`)}}
                selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                selected={pathname===nav.path}
                
                onPress={()=>this.props.history.replace(nav.path)}
                ></Item>
              ))
          }
      </TabBar>
    );
  }
}

export default withRouter(NavFooter);
