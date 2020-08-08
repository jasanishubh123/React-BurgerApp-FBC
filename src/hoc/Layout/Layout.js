import React, { useState } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'
import Sidebar from '../../component/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
const Layout = props => {

    const [showSide, setShowSide] = useState(false)

    const SideDrawerCloseHandler = () => {
        setShowSide(false)
    }

    const SideBarToggleHandler = () => {
        setShowSide((prevState) => {
            return { showSide: !prevState.showSide }
        })
    }


    return (
        <Aux>

            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={SideBarToggleHandler} />
            <Sidebar
                isAuth={props.isAuthenticated}
                open={showSide}
                closed={SideDrawerCloseHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>

    )




}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)