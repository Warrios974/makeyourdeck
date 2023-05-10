import React, { useState } from 'react'


function SelectYourDeckType() {

  const [nameDeck, setNameDeck] = useState(undefined)
  const [gameFormat, setGameFormat] = useState(undefined)

  const handleSubmit = (e) => {

    e.preventDefault()

    const name = nameDeck
    const format = gameFormat

    console.log('====');
    console.log('name',name);
    console.log('format',format);
    console.log('====');
  }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <fieldset>
                <label htmlFor='nameDeck'>Deck name</label>
                <input id='nameDeck' formEncType='texte' onChange={(e) => setNameDeck(e.target.value)}></input>
                <label htmlFor='gameFormat'>Game format</label>
                <select id="gameFormat" onChange={(e) => setGameFormat(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="commander">Commander</option>
                  <option value="modern">Modern</option>
                  <option value="vintage">Vintage</option>
                  <option value="brawl">Brawl</option>
                </select>
                <button type='submit'>Validé</button>
            </fieldset>
        </form>
    </div>
  )
}

export default SelectYourDeckType