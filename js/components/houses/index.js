
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Modal, View, TouchableHighlight, Switch } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Spinner,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { setHouses } from '../../actions/houses';
import { getAllHouses } from '../../api/houses';
import styles from './styles';

const {
  popRoute,
  pushRoute,
} = actions;

class Houses extends Component {

  static propTypes = {
    houses: React.PropTypes.arrayOf(React.PropTypes.object),
    openDrawer: React.PropTypes.func,
    setHouses: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      hasAncestralWeapons: false,
      hasDiedOut: false,
      hasSeats: false,
      hasTitles: false,
      hasWords: false,
    };
  }

  componentDidMount() {
    getAllHouses().then((houses) => {
      this.props.setHouses(houses);
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  pushRoute(route, url) {
    this.props.pushRoute({ key: route, data: url }, this.props.navigation.key);
  }

  render() {
    const { hasAncestralWeapons, hasDiedOut, hasSeats, hasTitles, hasWords } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.popRoute(this.props.navigation.key)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Houses</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          <Button
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <Text>Refine</Text>
          </Button>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <List>
                  <ListItem>
                    <Text>AncestralWeapons</Text>
                    <Switch value={this.state.hasAncestralWeapons} />
                  </ListItem>
                </List>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
          <List>
            {
              this.props.houses.length === 0 ?
                <Spinner />
                :
                this.props.houses.map(house =>
                  <ListItem key={house.isbn} onPress={() => this.pushRoute('house', house.url)}>
                    <Thumbnail square size={80} source={{ uri: `https://covers.openlibrary.org/b/isbn/${house.isbn}-M.jpg` }} />
                    <Body>
                      <Text>{house.name}</Text>
                    </Body>
                  </ListItem>
                )
            }
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    setHouses: houses => dispatch(setHouses(houses)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  houses: state.houses.houses,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Houses);
