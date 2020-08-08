import React ,{useEffect} from 'react'
import Order from '../../component/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../component/UI/Spinner/Spinner'

 const Orders=props=>{



    const{onfetchOrder,token,userId}=props

    useEffect(()=>{
        onfetchOrder(token,userId)
    },[onfetchOrder,token,userId])

   

    
         let orders=<Spinner/>
         if(!props.loading){
            orders=(
                props.orders.map(order=>(
                    <Order key={order.id} 
                            price={order.price}
                            ingredient={order.ingredient} />
                ))
            ) 
         }
        return(
            <>
                {orders}
            </>
        )
    
}


const mapDispatchToProps=dispatch=>{
    return{
        onfetchOrder:(token,userId)=>dispatch(action.fetchOrders(token,userId))
    }

}
const mapStateToProps=state=>{

    return{
        orders:state.order.orders,
        loading:state.order.loading ,
        token:state.auth.token,
        userId:state.auth.userId
    }

}


export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios))