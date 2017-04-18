
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, ListItem } from 'native-base';

import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    closeDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route);
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <ListItem button onPress={() => { this.navigateTo('home'); this.props.closeDrawer(); }} >
          <Text>Books</Text>
        </ListItem>
        <ListItem button onPress={() => { this.navigateTo('houses'); this.props.closeDrawer(); }} >
          <Text>Houses</Text>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: route => dispatch(navigateTo(route)),
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(SideBar);
