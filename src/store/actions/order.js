import * as actionType from './actionType'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess =(id,orderData)=>{
    return {
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail=(error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionType.PURCHASE_BURGER_START
    }
}


export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token, orderData).then(
            response => {
                // console.log(response.data)
               dispatch(purchaseBurgerSuccess(response.data.name,orderData))
               
            }
        ).catch(err => {
            dispatch(purchaseBurgerFail(err))
         })
    }
}

export const purchaseInit=()=>{
    return{
        type:actionType.PURCHASE_INIT
    }
}

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionType.FETCH_ORDER_FAIL,
        error:error
    }
}


export const fetchOrderStart=()=>{
    return{
        type:actionType.FETCH_ORDER_START
    }
}


export const fetchOrders=(token,userId)=>{
    // console.log("FETCH "+userId)
     return dispatch=>{
         dispatch(fetchOrderStart())

        const  queryParam='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get("/orders.json"+queryParam)
        .then(res=>{
            // console.log(res)
            const fetchOrder=[]
            for(let key in res.data){
                fetchOrder.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrder))
        }).catch(err=>{
            // console.log(err)
           dispatch(fetchOrderFail(err))
        })
          
     }
}
