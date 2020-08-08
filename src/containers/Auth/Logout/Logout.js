import React, { useEffect } from 'react'
import * as action from '../../../store/actions/index'
import{Redirect} from 'react-router-dom'
import{connect} from 'react-redux'
const Logout=props=> {
    
    const {onLogout}=props
    useEffect(()=>{
        onLogout();
    },[onLogout])

   

    
        return(
            <Redirect to="/"/>
        )
    
    

}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(action.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout)