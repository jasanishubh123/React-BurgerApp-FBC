import * as actionType from '../actions/actionType'
import {updateObject} from '../../shared/utility'



const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.PURCHASE_INIT:
            return updateObject(state,{purchased: false})
           

        case actionType.PURCHASE_BURGER_START:
            return updateObject(state,{loading: true})
           

        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.ordrData,{ id: action.orderId}) 
              
            return updateObject(state,{
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            })
           
        case actionType.PURCHASE_BURGER_FAIL:
            return updateObject(state,{loading: false})
           

        case actionType.FETCH_ORDER_START:
            return updateObject(state,{loading: true})
            
        case actionType.FETCH_ORDER_SUCCESS:
            return updateObject(state,{
                orders: action.orders,
                loading: false
            })
            
        case actionType.FETCH_ORDER_FAIL:
            return updateObject(state,{
                loading: false
            })
          

        default:
            return state
    }

}

export default reducer