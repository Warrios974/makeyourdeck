import React from 'react'

function ManaCost({ manaCost }) {

  var regex = new RegExp('\\w', 'g');

  const costList = manaCost.match(regex)
  
  return (
    <span>
      {
        costList.map((mana) => (
          <img alt='' src={`./assets/icons/${mana}.svg`} />
        ))
      }
    </span>
  )
}

export default ManaCost