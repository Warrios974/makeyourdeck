export const getCardsByColors = async (filter) => {

  const call = await fetch(`https://api.scryfall.com/cards/search?q=c%3A${filter}`)

  /*.then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/
  const data = await call.json()

  return data

}

export const getCards = async (URI) => {

  const call = await fetch(URI)

  /*.then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/
  const data = await call.json()

  return data

}

export const getAutocomplete = async (value) => {

  const uri = 'https://api.scryfall.com/cards/autocomplete?q='

  const url = uri + value

  const call = await fetch(url)

  /*.then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/
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
