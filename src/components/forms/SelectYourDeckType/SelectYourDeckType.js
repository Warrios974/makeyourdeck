import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ModalContext } from '../../../contexts/modalContext'
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext'

function SelectYourDeckType(props) {

  const { stateFilters, stateDeck } = useContext(DeckBuilderContext)
  
  const [filters, setFilters] = stateFilters
  const [currentDeck, setCurrentDeck] = stateDeck

  const [nameDeck, setNameDeck] = useState(undefined)
  const [nameDeckError, setNameDeckError] = useState({
    error : false,
    textError : null
  })
  const [gameFormat, setGameFormat] = useState(undefined)
  const [gameFormatError, setGameFormatError] = useState({
    error : false,
    textError : null
  })

  const formatsList = [
    'standard','commander', 'modern', 'vintage', 'brawl'
  ]
  
  useEffect(() => {
    const initComponent = async () => {

        return fetch
    }
    initComponent()
}, [])

  const handleSubmit = (e) => {

    e.preventDefault()

    const name = nameDeck
    const format = gameFormat

    var regex = new RegExp("^[a-zA-Z0-9 ]+$");

    if (name === '' || name === undefined) {

      setNameDeckError({
        error : true,
        textError : "The name can't be void"
      })

      return false
    }

    if (regex.test(name) === false) {

      setNameDeckError({
        error : true,
        textError : "The can't containe special caracteres"
      })

      return false
    }

    if (name || name !== undefined) {

      setNameDeckError({
        error : false,
        textError : null
      })

    }
    
    if (format === undefined || format === 'Select your format') {

      setGameFormatError({
        error : true,
        textError : "Select a format please"
      })

      return false
    }
    
    if (format !== undefined || format !== 'Select your format') {

      let isIntheList = false

      formatsList.forEach(elem => {
        if (format === elem) {
          isIntheList = true
        }
      });

      if (isIntheList) {
        setGameFormatError({
          error : false,
          textError : null
        })
      }

      if (!isIntheList) {
        setGameFormatError({
          error : true,
          textError : "This format isn't in the list"
        })

        return false
      }
    }

    let localFilters = JSON.parse(JSON.stringify(filters))
    localFilters.formats[format] = true

    let localDeck = JSON.parse(JSON.stringify(currentDeck))
    localDeck.name = name
    localDeck.isInit = true

    setFilters(localFilters)
    setCurrentDeck(localDeck)

  }

  if(!currentDeck.isInit) return  (
    <div className='modal show' style={{display : 'block'}}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Init your deck</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Label>Deck name</Form.Label>
              <Form.Control type="text" placeholder="Gruul Aggro" required onChange={(e) => setNameDeck(e.target.value)} className='my-3'/>
                <span>{nameDeckError.textError}</span>
              <Form.Select aria-label="Default select example" required onChange={(e) => setGameFormat(e.target.value)} className='my-3'>
                <option>Select your format</option>
                  { formatsList.map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))
                  }
              </Form.Select>
                <span>{gameFormatError.textError}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Create</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Form>
    </div>
  )
}

export default SelectYourDeckType