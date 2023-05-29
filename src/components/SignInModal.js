import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'

library.add(faXmark)

function SignInModal() {

  const { modalState, toggleModals } = useContext(ModalContext)

  return (
    <>
    {
    modalState.signInModal === true &&
    <div className='modal show' style={{display : 'block'}}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Se connecter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Connecter vous</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleModals("close")}>Close</Button>
          <Button variant="primary">Me connecter avec Google</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    }
    </>
  )
}

export default SignInModal