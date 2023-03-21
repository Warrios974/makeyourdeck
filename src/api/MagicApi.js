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
