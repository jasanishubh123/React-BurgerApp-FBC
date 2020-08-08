
import React from 'react'
import CheckoutSummery from '../../component/Order/CheckoutSummery/CheckoutSummery'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import {connect} from 'react-redux'


const Checkout=props=>{

    
   

  const  checkoutCancel=()=>{
        props.history.goBack();

    }
   const  checkoutContinue=()=>{
        props.history.replace("/checkout/contact-data")

    }

    
        let summery=<Redirect to="/" />
       
        if(props.ings){
            const purchasedRedirect= props.purchasing?<Redirect to="/"/>:null
            summery=(
                <>
                {purchasedRedirect}
                <CheckoutSummery checkoutCancel={checkoutCancel} checkoutContinue={checkoutContinue} ingredients={props.ings}  />
                <Route path={props.match.path+'/contact-data'} component={ContactData} />   
                </>
            )
        }
        return summery;
    

}


const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchasing:state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout)