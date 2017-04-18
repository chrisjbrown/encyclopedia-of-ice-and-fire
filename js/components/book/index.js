
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { View, Image } from 'react-native';
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
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { setBook, clearBook } from '../../actions/book';
import { getBook } from '../../api/books';
import styles from './styles';

const {
  popRoute,
} = actions;

class Book extends Component {

  static propTypes = {
    book: React.PropTypes.shape(),
    bookUrl: React.PropTypes.string.isRequired,
    openDrawer: React.PropTypes.func.isRequired,
    setBook: React.PropTypes.func.isRequired,
    clearBook: React.PropTypes.func.isRequired,
    popRoute: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    book: {},
  }

  componentDidMount() {
    getBook(this.props.bookUrl).then((book) => {
      this.props.setBook(book);
    });
  }

  componentWillUnmount() {
    this.props.clearBook();
  }

  renderBook = () => {
    const { book } = this.props;
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <Image
            style={{
              width: 200,
              height: 301,
            }}
            source={{ uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg` }}
          />
        </View>
        <List>
          <ListItem key={book.isbn}>
            <Text>{book.name}</Text>
          </ListItem>
          <ListItem>
            <Text>ISBN: </Text>
            <Text>{book.isbn}</Text>
          </ListItem>
          <ListItem>
            <Text>Authors: </Text>
            <Text>{book.authors.join(', ')}</Text>
          </ListItem>
          <ListItem>
            <Text>Number of pages: </Text>
            <Text>{book.numberOfPages}</Text>
          </ListItem>
          <ListItem>
            <Text>Publisher: </Text>
            <Text>{book.publisher}</Text>
          </ListItem>
          <ListItem>
            <Text>Country: </Text>
            <Text>{book.country}</Text>
          </ListItem>
          <ListItem>
            <Text>Media Type: </Text>
            <Text>{book.mediaType}</Text>
          </ListItem>
          <ListItem>
            <Text>Release Date: </Text>
            <Text>{book.released}</Text>
          </ListItem>
        </List>
      </View>
    );
  }

  render() {
    const { book } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.popRoute(this.props.navigation.key)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{ book.name }</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          {
            !book.isbn ?
              <Spinner />
              : this.renderBook()
          }
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    setBook: book => dispatch(setBook(book)),
    clearBook: () => dispatch(clearBook()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  book: state.book.book,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Book);
