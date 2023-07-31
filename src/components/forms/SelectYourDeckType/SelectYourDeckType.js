import React, { useContext } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Button, Form, Modal } from 'react-bootstrap'
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as yup from "yup";
import { initDeck } from '../../../search/deck'

library.add(faXmark)

const schema = yup.object({
  name: yup.string().matches(/^[a-zA-Z0-9 ]+$/i, 'Is not in correct format').min(3).required(),
  format: yup.string().matches(/^commander$|^vintage$|^standard$|^modern$|^brawl$|^duel$/i, 'Not conforme').required(),
  isPublic: yup.boolean(),
}).required();

function SelectYourDeckType() {

  const { register, handleSubmit, formState : { errors }, formState } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  })

  const { isSubmitting, isSubmitSuccessful } = formState

  const { stateFilters, stateDeck, stateCurrentSelect, getAutocompleteList, getSingleCard } = useContext(DeckBuilderContext)
  
  const [filters, setFilters] = stateFilters
  const [currentSelect, setCurrentSelect] = stateCurrentSelect
  const [currentDeck, setCurrentDeck] = stateDeck

  const formatsList = ['standard','commander', 'modern', 'vintage', 'brawl','duel']

  const onSubmit = async (data) => {

    const name = data.name
    const format = data.format
    const isPublic = data.isPublic

    let localFilters = JSON.parse(JSON.stringify(filters))
    localFilters.formats = [format]

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
        localFilters.types.push('legendary')
        localFilters.types.push('creature')
      }
      if (!isCommanderDeck) localDeck.isInit = true

    }

    setFilters(localFilters)
    setCurrentDeck(localDeck)

  }

  if(!currentDeck.isInit && !isSubmitSuccessful) return  (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Init your deck</h1>
      <Form.Group controlId="deckName" >
        <Form.Label>Deck name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Gruul Aggro"
          className='my-3'
          name='Name'
          {...register('name')}
          defaultValue={'Gruul Agro'}
          />
          {errors.name && <span>{errors.name.message}</span>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Choisi ton format</Form.Label>
        <Form.Select 
          aria-label="Default select example" 
          className='my-3'
          {...register('format')}
          defaultValue={'standard'}
          >
          <option>Select your format</option>
            { formatsList.map((format) => (
                <option key={format} value={format}>{format}</option>
              ))
            }
        </Form.Select>
          {errors.format && <span>{errors.format.message}</span>}
      </Form.Group>
      <Form.Group>
        <Form.Check // prettier-ignore
          type="switch"
          id="plublic-or-private"
          label="Public"
          {...register('isPublic')}
          defaultChecked={true}
        />
      </Form.Group>
      <Button disabled={isSubmitting} variant="primary" type="submit" >Create</Button>
    </Form>
  )
}

export default SelectYourDeckType