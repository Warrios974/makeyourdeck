import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext'
import { initDeck } from '../../../search/deck'
import Select from 'react-select';
import Switch from 'react-switch';
import styleForm from '../Form.module.css'
import globalStyle from '../../../utils/styles/global.module.css'
import { colorStyles } from '../../../utils/styles/react-select-style'

library.add(faXmark)

function SelectYourDeckType() {

  const { stateFilters, stateDeck, stateCurrentSelect, getAutocompleteList, getSingleCard } = useContext(DeckBuilderContext)
  
  const [filters, setFilters] = stateFilters
  const [currentSelect, setCurrentSelect] = stateCurrentSelect
  const [currentDeck, setCurrentDeck] = stateDeck

  const [formData, setFormData] = useState({
    name: 'Gruul agro',
    format: 'standard',
    isPublic: true
  })
  const [errors, setErrors] = useState({
    name: null,
    message: null,
  })

  const options = [
    { label: 'Standard', value: 'standard' },
    { label: 'Commander', value: 'commander' },
    { label: 'Modern', value: 'modern' },
    { label: 'Vintage', value: 'vintage' },
    { label: 'Brawl', value: 'brawl' },
    { label: 'Duel', value: 'duel' },
    { label: 'Oathbreaker', value: 'oathbreaker' },
  ];

  const handleInputsChange = (name, value) => {
    if (name === 'name') {
      const nameRegex = /^[a-zA-Z0-9\s]*$/;
      
      if (!nameRegex.test(value)) {
        // Le champ "name" contient des caractères non autorisés
        // Vous pouvez gérer l'erreur de votre choix ici, par exemple, afficher un message d'erreur
        setErrors({name: true , message: 'Le champ "Nom" contient des caractères non autorisés.'});
        return;
      }

    }else if (name === 'fromat') {
      const allowedFormats = ['standard', 'commander', 'modern', 'vintage', 'brawl', 'duel', 'oathbreaker'];
      if (!allowedFormats.includes(value)) {
        // La valeur de "format" n'est pas dans la liste autorisée
        // Vous pouvez gérer l'erreur de votre choix ici, par exemple, afficher un message d'erreur
        setErrors({name: true , message: 'Le champ "Format" ne correspond pas à la liste autorisée.'});
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {

    const data = formData

    const name = data.name
    const format = data.format
    const isPublic = data.isPublic

    let localFilters = JSON.parse(JSON.stringify(filters))
    localFilters.formats.push(format)
    let localDeck = JSON.parse(JSON.stringify(currentDeck))

    localDeck.name = name
    localDeck.public = isPublic
    
    if (!localDeck.isInit) {
      
      localDeck.type = format
      localDeck = initDeck(name, format, localDeck)
      
      const isCommanderDeck = localDeck.cards.commander === null ? false : true
      if (isCommanderDeck) {
        localDeck.isInit = false
        setCurrentSelect('commander')
      }
      if (!isCommanderDeck) localDeck.isInit = true
    }

    setFilters(localFilters)
    setCurrentDeck(localDeck)

  }

  if(!currentDeck.isInit) return  (
    <form onSubmit={() => handleSubmit()}>
      <h1>Init your deck</h1>
      <div
          className={styleForm.inputGroup}
          >
        <label htmlFor="monChampTexte">Deck name</label>
        <input 
          className={styleForm.inputText}
          type="text" 
          id="monChampTexte" 
          name="name" 
          onChange={(e) => handleInputsChange('name', e.target.value)}
          value={formData.name} 
          aria-label="Champ de texte pour le nom" 
          required
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div
          className={styleForm.inputGroup}
          >
        <label htmlFor="nameFormatSelect">Sélectionnez un format :</label>
        <Select
            id="nameFormatSelect"
            name="format"
            onChange={(e) => handleInputsChange('format', e.value)}
            defaultInputValue={formData.format}
            options={options}
            aria-label="Champ de sélection du format de jeu"
            styles={colorStyles}
            required
          />
          {errors.format && <span>{errors.format.message}</span>}
      </div>
      <div
          className={styleForm.inputGroup}
          >
        <label>
          Est-ce un deck public ?
          <Switch
            id="publicSwitch"
            onChange={(value) => handleInputsChange('isPublic', value)}
            defaultChecked={formData.isPublic}
            checked={formData.isPublic}
            aria-label="Interrupteur pour la confidentialité"
            required
          />
        </label>
        <p>Le contenu est {formData.isPublic ? 'public' : 'non public'}.</p>
      </div>
      <button className={`${globalStyle.btn} ${globalStyle.btnPrimary}`} variant="primary" type="submit" >Créer</button>
    </form>
  )
}

export default SelectYourDeckType