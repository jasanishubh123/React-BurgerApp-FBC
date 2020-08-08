import React from 'react'
import classes from './Modal.css'
import Backdrop from '../Backdrop/backdrop'
import Aux from '../../../hoc/Aux/Aux'


const Modal=props=>{


    // shouldComponentUpdate(nextProps,nextState){
    //     return nextProps.show!==this.props.show || nextProps.children!==this.props.children
    // }

    

    
        return(
            <Aux>
            <Backdrop clicked={props.ModalClosed} show={props.show}/>
            <div className={classes.Modal}
            style={{transform:props.show?'translateY(0)':'translateY(-100vh)',
                    opacity:props.show?'1':'0'
    
            }} >
    
                {props.children}
            </div>
            
        </Aux>
        )
    }

    

export default React.memo(Modal,(prevProps,nextProps)=> nextProps.show===prevProps.show && nextProps.children===prevProps.children)