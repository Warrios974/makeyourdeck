import React, { useContext, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ReactComponent as WhiteManaSvg } from "../../../assets/icons/mtg/W.svg";
import { ReactComponent as BlueManaSvg } from "../../../assets/icons/mtg/U.svg";
import { ReactComponent as RedManaSvg } from "../../../assets/icons/mtg/R.svg";
import { ReactComponent as GreenManaSvg } from "../../../assets/icons/mtg/G.svg";
import { ReactComponent as BlackManaSvg } from "../../../assets/icons/mtg/B.svg";
import { ReactComponent as ColorlessManaSvg } from "../../../assets/icons/mtg/C.svg";
import { getAutocomplete } from '../../../api/MagicApi';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext';
import style from './searchAndFilterForm.module.css'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { colorStyles } from '../../../utils/styles/react-select-style'
import styleForm from '../Form.module.css'

library.add(faXmark)

function SearchAndFilterForm() {
  
  const { stateFilters, setLoadingData } = useContext(DeckBuilderContext)

  const [filters, setFilters] = stateFilters

  const [listNameCard, setListNameCard] = useState([])
  
  const inputNameCard = document.getElementById('formGridName')

  const filterColorWhite = filters.colors.includes('white')
  const filterColorBlue = filters.colors.includes('blue')
  const filterColorBlack = filters.colors.includes('black')
  const filterColorRed = filters.colors.includes('red')
  const filterColorGreen = filters.colors.includes('green')

  const typeList = [
    { value: 'planeswalker', label: 'Planeswalker' },
    { value: 'creature', label: 'Creature' },
    { value: 'instant', label: 'Instant' },
    { value: 'sorcery', label: 'Sorcery' },
    { value: 'enchantment', label: 'Enchantment' },
    { value: 'artifact', label: 'Artifact' },
    { value: 'land', label: 'Land' },
    { value: 'battle', label: 'Battle' },
    { value: 'legendary', label: 'Legendary' }
  ]

  const rariryList = [
    { value: 'common', label: 'Commun' },
    { value: 'uncommon', label: 'Uncommun' },
    { value: 'rare', label: 'Rare' },
    { value: 'mythic', label: 'Mythic' }
  ]

  const manaObject = [
    {
      name :'white',
      svgUrl : '../../../assets/icons/mtg/W.svg',
      component : <WhiteManaSvg />
    },
    {
      name :'blue',
      svgUrl : '../../../assets/icons/mtg/U.svg',
      component : <BlueManaSvg />
    },
    {
      name :'black',
      svgUrl : '../../../assets/icons/mtg/B.svg',
      component : <BlackManaSvg />
    },
    {
      name :'red',
      svgUrl : '../../../assets/icons/mtg/R.svg',
      component : <RedManaSvg />
    },
    {
      name :'green',
      svgUrl : '../../../assets/icons/mtg/G.svg',
      component : <GreenManaSvg />
    },
    {
      name :'colorless',
      svgUrl : '../../../assets/icons/mtg/C.svg',
      component : <ColorlessManaSvg />
    },
    {
      name :'multicolor',
      svgUrl : '../../../assets/icons/mtg/G.svg',
      component : <ColorlessManaSvg />
    }
  ]

  const addAFilter = (e,filter,value) => {

    e !== null && e.preventDefault()

    let localFilters = JSON.parse(JSON.stringify(filters))

    if (filter === 'color'){ 

      let colors = [...localFilters.colors]

      if(localFilters.colors.includes(value)){
        let newColors = colors.filter((color) => color !== value)
        localFilters.colors = newColors
      }else{
        localFilters.colors.push(value)
      }

    }

    if (filter === 'oracle') localFilters.oracle = value

    if (filter === 'name') {

      localFilters.name = value
      setListNameCard([])
      
    }

    if (filter === 'type') {

      if (value !== 'Choose a type ...') {
        localFilters.types = value
      }
      
    }

    if (filter === 'rarity'){
      
      localFilters.rarities = value

    }

    setFilters(localFilters)

  }

  const searchCardName = async (searchValue, callback) => {

    if ((searchValue.length >= 2 || searchValue.length === 0)) {

      const data = await getAutocomplete(searchValue)
  
      const list = data.data

      let newList = []
      
      list.forEach(name => {
        newList.push({value: name, label: name})
      });

      return newList
  
    }
  }

  const onInputTypeChange = (data) => {
    let list = []

    data.forEach(element => {
      list.push(element.value)
    });

    addAFilter(null,'type',list)
  };

  const onInputNameChange = (data) => {
    const value = data !== null ? data.value : ''
    addAFilter(null,'name',value)
  };

  const onInputRarityChange = (data) => {
    let list = []

    data.forEach(element => {
      list.push(element.value)
    });

    addAFilter(null,'rarity',list)
  };

  return (
    <form className={style.form}>
      <div className={style.row}>
        <div
          className={`${styleForm.inputGroup} ${style.groupe}`}>
          <label htmlFor='searchByName'>Nom de la carte</label>
          <AsyncSelect
            onChange={onInputNameChange}
            loadOptions={searchCardName}
            isClearable
            isSearchable
            name='searchByName'
            id='searchByName'
            styles={colorStyles}
          />
        </div>
        <div
          className={`${styleForm.inputGroup} ${style.groupe}`}>
          <label
            htmlFor='description'
          >
          Search in description
          </label>
          <input 
            className={styleForm.inputText}
            type='text' 
            id='description'
            placeholder='Exemple : +1/+1'
            onChange={(e) => addAFilter(e,'oracle',e.target.value)}
            />
        </div>
        <div
          className={`${styleForm.inputGroup} ${style.groupe}`}>
          <label htmlFor='searchBytypes'>Type de carte</label>
          <Select
            closeMenuOnSelect={false}
            onChange={onInputTypeChange}
            isMulti
            options={typeList}
            isClearable
            isSearchable
            id='searchBytypes'
            name="searchBytypes"
            styles={colorStyles}
          />
        </div>
      </div>
      <div className={style.row}>
      <div
          className={`${styleForm.inputGroup} ${style.groupe}`}>
          <label htmlFor='searchByRarity'>Rareté</label>
          <Select
            closeMenuOnSelect={false}
            onChange={onInputRarityChange}
            isMulti
            options={rariryList}
            isClearable
            isSearchable
            styles={colorStyles}
            name="searchByRarity"
            id='searchByRarity'
          />
        </div>
        <div
          className={`${styleForm.inputGroup} ${style.groupe}`}>
          <label>Colors</label>
            <div
            className={`${style.groupeColor}`}
            >
            { manaObject.map((color) => (
                  <div 
                    key={color.name} 
                    onClick={(e) => addAFilter(e,'color',color.name)}
                    className={`${filters.colors.includes(color.name) ? style.btnActive : ''}` }
                  >
                    {color.component}
                  </div>
                ))
              }
            </div>
          </div>
      </div>
    </form>
  )
}

export default SearchAndFilterForm