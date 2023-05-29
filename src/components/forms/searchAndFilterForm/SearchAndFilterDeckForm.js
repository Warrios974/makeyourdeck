import React, { useContext, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
/*import { ReactComponent as WhiteManaSvg } from "../../../assets/icons/mtg/W.svg";
import { ReactComponent as BlueManaSvg } from "../../../assets/icons/mtg/U.svg";
import { ReactComponent as RedManaSvg } from "../../../assets/icons/mtg/R.svg";
import { ReactComponent as GreenManaSvg } from "../../../assets/icons/mtg/G.svg";
import { ReactComponent as BlackManaSvg } from "../../../assets/icons/mtg/B.svg";
import { ReactComponent as ColorlessManaSvg } from "../../../assets/icons/mtg/C.svg";*/
import { getAutocomplete } from '../../../api/MagicApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { DeckBuilderContext } from '../../../contexts/deckBuilderContext';

library.add(faXmark)

function SearchAndFilterForm() {
  
  const { stateFilters } = useContext(DeckBuilderContext)

  const [filters, setFilters] = stateFilters
  
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
  
  const inputNameCard = document.getElementById('formGridName')

  const typeList = [
    'planeswalker',
    'creature',
    'instant',
    'sorcery',
    'enchantment',
    'artifact',
    'land',
    'battle'
  ]

  const manaObject = [
    {
      name :'white',
      svgUrl : '../../../assets/icons/mtg/W.svg'
    },
    {
      name :'blue',
      svgUrl : '../../../assets/icons/mtg/U.svg'
    },
    {
      name :'black',
      svgUrl : '../../../assets/icons/mtg/B.svg'
    },
    {
      name :'red',
      svgUrl : '../../../assets/icons/mtg/R.svg'
    },
    {
      name :'green',
      svgUrl : '../../../assets/icons/mtg/G.svg'
    },
    {
      name :'colorless',
      svgUrl : '../../../assets/icons/mtg/C.svg'
    },
    {
      name :'multicolor ',
      svgUrl : '../../../assets/icons/mtg/G.svg'
    }
  ]
    
  const addAFilter = (e,filter,value) => {

    e.preventDefault()

    let localFilters = JSON.parse(JSON.stringify(filters))
    let localColorsStates = { ...colorsStates }
    let localTypes = { 
      planeswalker : false,
      creature : false,
      instant : false,
      sorcery : false,
      enchantment : false,
      artifact : false,
      land : false,
      battle : false 
    }

    if (filter === 'color') {

      if (localColorsStates[value] === false) {
        localColorsStates[value] = true
      }else{
        localColorsStates[value] = false
      }

    }

    if (filter === 'oracle') {
      localFilters.oracle = value
    }

    if (filter === 'name') {

      inputNameCard.value = value
      localFilters.name = value

      setListNameCard([])
      
    }

    if (filter === 'type' ) {

      if (value === 'Choose a type ...') {
        localFilters.types = localTypes
      }
      if (value !== 'Choose a type ...') {
        localTypes[value] = true
      }

      localFilters.types = localTypes
      
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

  const removeCardName = async () => {

    let localFilters = JSON.parse(JSON.stringify(filters))
    localFilters.name = ''
    inputNameCard.value = ''
    
    setFilters(localFilters)

  }

  return (
    <Form>
      <Form.Group>
        <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridName" className='position-relative'>
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <Form.Control type='text' onChange={(e) => searchCardName(e.target.value)}/>
                <ListGroup className='position-absolute'>
                  { listNameCard.length > 0 && listNameCard.map((name) => (
                    <ListGroup.Item action key={name} onClick={(e) => addAFilter(e,'name',name)}>
                    {name}
                    </ListGroup.Item>
                    ))
                  }
                </ListGroup>
              <InputGroup.Text onClick={(e) => removeCardName()}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSearchDescription">
            <Form.Label>Search in description</Form.Label>
            <Form.Control type='text' onChange={(e) => addAFilter(e,'oracle',e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridType">
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e) => addAFilter(e,'type',e.target.value)}>
              <option>Choose a type ...</option>
              { typeList.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridColors" className='d-flex align-items-center'>
            <Row>
              { manaObject.map((color) => (
                  <Col 
                    key={color.name} 
                    onClick={(e) => addAFilter(e,'color',color.name)} 
                    value={color.name}
                  >
                    {color.name}
                  </Col>
                ))
              }
            </Row>
          </Form.Group>
        </Row>
      </Form.Group>
    </Form>
  )
}

export default SearchAndFilterForm