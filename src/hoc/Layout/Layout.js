import React from 'react'
import Aux from '../Aux/Aux'
import  classes from './Layout.css'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'
import Sidebar from '../../component/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
class Layout extends React.Component{


    state={
        showSide:false
    }
    SideDrawerCloseHandler=()=>{
        this.setState({
            showSide:false
        })
    }

    SideBarToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSide:!prevState.showSide}
        })
    }

    render(){
        return(
            <Aux>
                
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.SideBarToggleHandler}/>
                <Sidebar 
                     isAuth={this.props.isAuthenticated}
                    open={this.state.showSide} 
                    closed={this.SideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
    
        )
    }
   


}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)