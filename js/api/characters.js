export default function getAllCharacters() {
  return fetch('http://www.anapioficeandfire.com/api/characters/', {
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
