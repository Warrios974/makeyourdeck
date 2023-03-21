import React from 'react'
import { ReactComponent as WhiteManaSvg } from "../../../assets/icons/mtg/W.svg";
import { ReactComponent as BlueManaSvg } from "../../../assets/icons/mtg/U.svg";
import { ReactComponent as RedManaSvg } from "../../../assets/icons/mtg/R.svg";
import { ReactComponent as GreenManaSvg } from "../../../assets/icons/mtg/G.svg";
import { ReactComponent as BlackManaSvg } from "../../../assets/icons/mtg/B.svg";
import { getCardsByColors } from '../../../api/MagicApi';

function SearchAndFilterForm(props) {

  const { setCurrentCards } = props

  const handleClickFilter = async (e,filter) => {
    e.preventDefault()
    const cards = await getCardsByColors(filter)
    setCurrentCards([...cards.data])
  }
    
  return (
    <form className='form formSearchAndFilterDeck'>
      <fieldset className='formSearchAndFilterDeck__search'>
        <label>Chercher</label>
        <input formEncType='texte'></input>
      </fieldset>
      <fieldset className='formSearchAndFilterDeck__filter'>
        <ul>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => handleClickFilter(e,'white')}
            >
              <WhiteManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => handleClickFilter(e,'blue')}
            >
              <BlueManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => handleClickFilter(e,'red')}
            >
              <RedManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => handleClickFilter(e,'green')}
            >
              <GreenManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => handleClickFilter(e,'black')}
            >
              <BlackManaSvg />
            </button> 
          </li>
        </ul>
      </fieldset>
    </form>
  )
}

export default SearchAndFilterForm