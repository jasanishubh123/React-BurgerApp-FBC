import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/backdrop'
import Aux from '../../../hoc/Aux/Aux'
const sideDrawer = (props) => {

    let attachedclasses=[classes.sideDrawer,classes.Close]
    if(props.open){
        attachedclasses=[classes.sideDrawer,classes.Open]
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedclasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer