import * as actionType from '../actions/actionType'

import { updateObject } from '../../shared/utility'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const addIng = (state, action) => {
    const updatedIngredient = { [action.ingName]: state.ingredients[action.ingName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
        building:true
    }
    return updateObject(state, updatedState)
}
const removeIng = (state, action) => {
    const updatedIngredientRemove = { [action.ingName]: state.ingredients[action.ingName] - 1 }
    const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove);
    const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName],
        building:true
    }
    return updateObject(state, updatedStateRemove)
}

const setIng = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building:false
    })
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return addIng(state, action)
        case actionType.REMOVE_INGREDIENT:
            return removeIng(state, action)
        case actionType.SET_INGREDIENT:
            return setIng(state, action)
        case actionType.FETCH_INGREDIENT_FAILED:
            return updateObject(state, { error: true })
        
        default:
            return state;


    }



}

export default reducer