
import React from 'react'
import CheckoutSummery from '../../component/Order/CheckoutSummery/CheckoutSummery'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import {connect} from 'react-redux'


class Checkout extends React.Component{

    // state={
    //     ingredients:{
    //         salad:1,
    //         cheese:1,
    //         meat:1,
    //         bacon:1
    //     },
    //     price:0
    // }

    // componentWillMount(){

    //     const queryParam=new URLSearchParams(this.props.location.search)
    //     const ingredients={}
    //     let price=0
    //     for(let param of queryParam.entries()){

    //             if(param[0]==='price'){
    //                 price=param[1]
    //             }else{
    //                 ingredients[param[0]]=+param[1]
    //             }
    //             //[salad,1]
                

    //     }

    //     this.setState({ingredients:ingredients,price:price})
    //     console.log(this.state.ingredients)

    // }


   

    checkoutCancel=()=>{
        this.props.history.goBack();

    }
    checkoutContinue=()=>{
        this.props.history.replace("/checkout/contact-data")

    }

    render(){
        let summery=<Redirect to="/" />
       
        if(this.props.ings){
            const purchasedRedirect= this.props.purchasing?<Redirect to="/"/>:null
            summery=(
                <>
                {purchasedRedirect}
                <CheckoutSummery checkoutCancel={this.checkoutCancel} checkoutContinue={this.checkoutContinue} ingredients={this.props.ings}  />
                <Route path={this.props.match.path+'/contact-data'} component={ContactData} />   
                </>
            )
        }
        return summery;
    }

}


const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchasing:state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout)