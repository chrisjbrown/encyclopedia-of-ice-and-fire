
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import books from './books';
import book from './book';
import houses from './houses';

export default combineReducers({
  drawer,
  cardNavigation,
  books,
  book,
  houses,
});
