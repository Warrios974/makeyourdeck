import React, { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'

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
              <button onClick={() => toggleModals("close")}>Fermer</button>
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