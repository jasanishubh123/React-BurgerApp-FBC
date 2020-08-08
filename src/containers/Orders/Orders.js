import React from 'react'
import Order from '../../component/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../component/UI/Spinner/Spinner'

class Orders extends React.Component{

    componentDidMount(){
        // axios.get("/orders.json")
        // .then(res=>{
        //     const fetchOrder=[]
        //     for(let key in res.data){
        //         fetchOrder.push({
        //             ...res.data[key],
        //             id:key
        //         })
        //     }
        //     this.setState({loading:false , orders:fetchOrder})
        // }).catch(err=>{
        //     this.setState({loading:false})
        // })
        //   console.log("UserID "+this.props.userId )
        this.props.onfetchOrder(this.props.token,this.props.userId)
    }

     render(){
         let orders=<Spinner/>
         if(!this.props.loading){
            orders=(
                this.props.orders.map(order=>(
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