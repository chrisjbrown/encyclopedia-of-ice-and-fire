export function getAllHouses() {
  return fetch('http://www.anapioficeandfire.com/api/houses?pageSize=50', {
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