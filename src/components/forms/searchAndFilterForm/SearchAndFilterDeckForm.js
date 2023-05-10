import React, { useContext, useState } from 'react'
import { ReactComponent as WhiteManaSvg } from "../../../assets/icons/mtg/W.svg";
import { ReactComponent as BlueManaSvg } from "../../../assets/icons/mtg/U.svg";
import { ReactComponent as RedManaSvg } from "../../../assets/icons/mtg/R.svg";
import { ReactComponent as GreenManaSvg } from "../../../assets/icons/mtg/G.svg";
import { ReactComponent as BlackManaSvg } from "../../../assets/icons/mtg/B.svg";
import { ReactComponent as ColorlessManaSvg } from "../../../assets/icons/mtg/C.svg";
import { getAutocomplete, getCardsByColors, initSortCards } from '../../../api/MagicApi';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../../contexts/searchContext';

function SearchAndFilterForm(props) {

  const { stateFilters } = useContext(SearchContext)
  
  const [filters , setFilters] = stateFilters
  
  const [colorsStates, setColorsStates] = useState({
    white : false,
    blue : false,
    black : false,
    red : false,
    green : false,
    colorless : false,
    multicolor : false
  })

  const [listNameCard, setListNameCard] = useState([])
    
  const addAFilter = (e,filter,value) => {

    e.preventDefault()

    const inputNameCard = document.getElementById('searchInNane')

    let localFilters = JSON.parse(JSON.stringify(filters))
    let localColorsStates = { ...colorsStates }

    if (filter === 'color') {

      if (localColorsStates[value] === false) {
        localColorsStates[value] = true
      }else{
        localColorsStates[value] = false
      }

    }

    if (filter === 'oracle' && (value.length > 3 || value.length === 0)) {
      localFilters.oracle = value
    }

    if (filter === 'oracle' && (value.length <= 3)) {
      localFilters.oracle = undefined
    }

    if (filter === 'name') {

      inputNameCard.value = value
      localFilters.name = value

      setListNameCard([])
      
    }

    if (localColorsStates !== localFilters.colors) localFilters.colors = localColorsStates

    setColorsStates(localColorsStates)
    setFilters(localFilters)

  }

  const searchCardName = async (value) => {

    if ((value.length >= 2 || value.length === 0)) {

      const data = await getAutocomplete(value)
  
      const list = data.data
  
      setListNameCard(list)
  
    }
  }

  return (
    <form className='form formSearchAndFilterDeck'>
      <fieldset className='formSearchAndFilterDeck__search'>
        <div className='searchSelect'>
          <label htmlFor='searchInNane'>Name</label>
          <input id='searchInNane' formEncType='texte' onChange={(e) => searchCardName(e.target.value)}></input>
          <ul className='searchSelect__items__group'>
            { listNameCard.length > 0 && listNameCard.map((name) => (
                <li className='searchSelect__item' key={name} onClick={(e) => addAFilter(e,'name',name)}>
                  {name}
                </li>
              ))
            }
          </ul>
        </div>
        <label htmlFor='searchInDescription'>Search in description</label>
        <input id='searchInDescription' formEncType='texte' onChange={(e) => addAFilter(e,'oracle',e.target.value)}></input>
      </fieldset>
      <fieldset className='formSearchAndFilterDeck__filter'>
        <ul>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color','white')}
            >
              <WhiteManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'blue')}
            >
              <BlueManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'black')}
            >
              <BlackManaSvg/>
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'red')}
            >
              <RedManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'green')}
            >
              <GreenManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'colorless')}
            >
              <ColorlessManaSvg />
            </button> 
          </li>
          <li>
            <button 
            className='btn btn__mana'
            onClick={(e) => addAFilter(e,'color', 'multicolor')}
            >
              <ColorlessManaSvg />
            </button> 
          </li>
        </ul>
      </fieldset>
    </form>
  )
}

export default SearchAndFilterForm