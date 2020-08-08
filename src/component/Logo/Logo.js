import React from 'react'
import LogoImg from '../../assets/burger-logo.png'

import classes from './Logo.css'
const logo=(props)=>{

    return(
        <div className={classes.Logo}>
            <img src={LogoImg} alt="Logo"/>
        </div>
    )

}

export default logo