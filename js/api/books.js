export function getBook(url) {
  if (!url) {
    throw new Error('getBook requires a url value');
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then((json) => {
    if (json.error) {
      console.error('Error getting book', json.error);
    }
    return json;
  })
  .catch((error) => {
    console.error('Error getting book', error);
  });
}

export function getBookByName(name) {
  if (!name) {
    throw new Error('getBookByName requires a name value');
  }
  return fetch(`http://www.anapioficeandfire.com/api/books?name=${name}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then((json) => {
    if (json.error) {
      console.error('Error getting book', json.error);
    }
    return json;
  })
  .catch((error) => {
    console.error('Error getting book', error);
  });
}

export function getAllBooks() {
  return fetch('http://www.anapioficeandfire.com/api/books', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then((json) => {
    console.log(json);
    if (json.error) {
      console.error('Error getting books', json.error);
    }
    return json;
  })
  .catch((error) => {
    console.error('Error getting books', error);
  });
}
