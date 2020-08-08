import * as actionTypes from './actionType'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingName: name
    }
}


export const setIngredients = (ingredients) => {
    // console.log("SET")
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}


export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}


export const initIngredient = () =>  {
    // console.log("init")
    
      return dispatch => {
        //  console.log("JJJ")
        axios.get("https://my-burger-cba15.firebaseio.com/ingredients.json")
            .then(response => {
                // console.log(response.data)
                   dispatch(setIngredients(response.data))
            }).catch(error => {
                // console.log("HEY")
                 dispatch(fetchIngredientFailed())
            })
     }


}