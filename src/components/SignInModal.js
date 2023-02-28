import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faXmark)

function SignInModal() {

  const { modalState, toggleModals } = useContext(ModalContext)

  return (
    <>
    {
    modalState.signInModal === true &&
      <div className='modal'>
        <div className='modal__containe'>
            <div className='modal__header'>
              <h5>Se connecter</h5>
              <button 
              className='btn btn__close'
                onClick={() => toggleModals("close")}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" size='lg'/>
              </button>
            </div>
            <div className='modal__body'>
              <button>Me connecter avec Google</button>
            </div>
        </div>
        <div 
          className='modal__overlay' 
          onClick={() => toggleModals("close")}>
        </div>
      </div>
    }
    </>
  )
}

export default SignInModal