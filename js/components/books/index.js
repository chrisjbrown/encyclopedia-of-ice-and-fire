
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
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
import { setBooks } from '../../actions/books';
import { getAllBooks } from '../../api/books';
import styles from './styles';

const {
  popRoute,
  pushRoute,
} = actions;

class Books extends Component {

  static propTypes = {
    books: React.PropTypes.arrayOf(React.PropTypes.object),
    openDrawer: React.PropTypes.func,
    setBooks: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    getAllBooks().then((books) => {
      this.props.setBooks(books);
    });
  }

  pushRoute(route, url) {
    this.props.pushRoute({ key: route, data: url }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.popRoute(this.props.navigation.key)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Books</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          <List>
            {
              this.props.books.length === 0 ?
                <Spinner />
                :
                this.props.books.map(book =>
                  <ListItem key={book.isbn} onPress={() => this.pushRoute('book', book.url)}>
                    <Thumbnail square size={80} source={{ uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg` }} />
                    <Body>
                      <Text>{book.name}</Text>
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
    setBooks: books => dispatch(setBooks(books)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  books: state.books.books,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Books);
