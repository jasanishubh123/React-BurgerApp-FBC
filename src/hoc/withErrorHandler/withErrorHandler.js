

import React from 'react'
import Modal from '../../component/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

       const[error,clearError] =useHttpErrorHandler(axios);
        
        return (
            
            <Aux>
                <Modal show={error} ModalClosed={clearError}>
                    {error ? error.message : ""}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )

    }



}

export default withErrorHandler