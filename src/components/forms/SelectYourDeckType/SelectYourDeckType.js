import React, { useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

  const { stateFilters, stateDeck } = useContext(DeckBuilderContext)
  
  const [filters, setFilters] = stateFilters
  const [currentDeck, setCurrentDeck] = stateDeck

  const formatsList = ['standard','commander', 'modern', 'vintage', 'brawl','duel']

  const onSubmit = (data) => {

    const name = data.name
    const format = data.format
    const isPublic = data.isPublic

    let localFilters = JSON.parse(JSON.stringify(filters))
    localFilters.formats[format] = true

    let localDeck = JSON.parse(JSON.stringify(currentDeck))
    localDeck.name = name
    localDeck.type = format
    localDeck.public = isPublic
    
    if (!localDeck.isInit && localDeck.type !== null) {

      const sixty = ['vintage','standard','modern']
      const hundred = ['commander','brawl','duel']

      const isSixty = sixty.filter((element) => element === format)
      const isHundred = hundred.filter((element) => element === format)

      if (isSixty) {

          let localCards = {
              mainDeck : [{total : 60}],
              reserve : [{total : 15}],
              numberExemple : 4
          } 

          localDeck.cards = localCards
      }

      if (isHundred) {

          let localCards = {
              commander : [],
              mainDeck : [{total : 100}],
              reserve : null,
              numberExemple : 1
          } 

          localDeck.cards = localCards

      }

      localDeck.isInit = true

  }

    setFilters(localFilters)
    setCurrentDeck(localDeck)

  }

  if(!currentDeck.isInit && !isSubmitSuccessful) return  (
    <div className='modal show' style={{display : 'block'}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Init your deck</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <Form.Check // prettier-ignore
              type="switch"
              id="plublic-or-private"
              label="Public"
              {...register('isPublic')}
              defaultChecked={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isSubmitting} variant="primary" type="submit">Create</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Form>
    </div>
  )
}

export default SelectYourDeckType