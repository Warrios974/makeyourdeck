export const UrlAPI = 'https://api.scryfall.com/'

export const getCards = async (URI) => {

  let cards

  await fetch(URI)
  .then((response) => response.json())
  .then((data) => {
    cards = data
  })
  .catch((error) => {
    cards = error
  })
  
  console.log('====');
  console.log('URI',URI);
  console.log('====');

  return cards

}

export const getAutocomplete = async (value) => {

  const uri = UrlAPI + 'cards/autocomplete?q='

  const url = uri + value

  const call = await fetch(url)

  const data = await call.json()

  return data

}

export const initSortCards = (data) => {
  
  if (data && data.length > 2) {

    const sortData = data.sort((a, b) => a.cmc - b.cmc)
    
    return sortData

  }

  return data

}
