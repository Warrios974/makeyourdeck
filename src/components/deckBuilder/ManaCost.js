import React from 'react'
import style from "./ManaCost.module.css";

function ManaCost({ manaCost }) {

  var regex = new RegExp('\\w', 'g');

  const costList = manaCost.match(regex)
  
  return (
    <span className={style.manaContainer}>
      {
        costList.map((mana, index) => (
          <img 
            alt='' 
            src={`./assets/icons/${mana}.svg`}  
            className={style.manaImage} 
            key={index}/>
        ))
      }
    </span>
  )
}

export default ManaCost