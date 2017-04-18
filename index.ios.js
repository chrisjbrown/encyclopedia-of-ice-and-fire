
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
	  return global._fetch(uri, options, ...args).then((response) => {
		      console.log('Fetch', { request: { uri, options, ...args }, response });
		          return response;
			    });
};
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
import { AppRegistry } from 'react-native';
import setup from './js/setup';

AppRegistry.registerComponent('NativeStarterKit', setup);
