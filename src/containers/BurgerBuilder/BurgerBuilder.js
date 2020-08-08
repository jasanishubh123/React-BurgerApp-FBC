import React, { useEffect,useState,useCallback } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../component/Burger/Burger'
import BurgerControls from '../../component/Burger/BuildControls/BuildControls'
import Modal from '../../component/UI/Modal/Modal'
import {  useDispatch ,useSelector } from 'react-redux'
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummery'

import axios from  '../../axios-orders'
import Spinner from '../../component/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'



 const BurgerBuilder=props=>{



    const dispatch=useDispatch();

   const onIngredientAdded=ingName=> dispatch(burgerBuilderActions.addIngredient(ingName))
    const  onIngredientRemove=ingName=> dispatch(burgerBuilderActions.removeIngredient(ingName))
   const onInitIngredients = useCallback(
       ()=>dispatch(burgerBuilderActions.initIngredient())
       ,[dispatch]
       )
   const onInitPurchase=()=>dispatch(burgerBuilderActions.purchaseInit())
   const onSetRedirectPath=(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))



    const[purchasing,setPurchasing]=useState(false)


   const ings= useSelector(state=>{
        return  state.burgerBuilder.ingredients
    })

    const price=useSelector(state=>{
        return state.burgerBuilder.totalPrice
    })

    const error=useSelector(state=>{
        return state.burgerBuilder.error
    })

    const isAuth=useSelector(state=>{
       return state.auth.token !== null
    })


    useEffect(()=>{
        onInitIngredients();
    },[onInitIngredients])
   
   
  const  purchaseHandler = () => {
        if(isAuth){
            setPurchasing(true)
        }else{
            onSetRedirectPath("/checkout")
            props.history.push("/auth")
        }
        
    }

   const updatePurchaseState=ingredient=> {
        const sum = Object.keys(ingredient).map(
            igKey => {
                return ingredient[igKey]
            }
        ).reduce((sum, ele) => {
            return sum + ele;
        }, 0)

        return  sum > 0 

    }
   
  const  puchaseCancelHandler = () => {
        setPurchasing(false)
    }
  const  purchaseContinueHandler = () => {
       
        onInitPurchase()
        props.history.push('/checkout')
    }

    
        const disableInfo = {
            ...ings
        }
        for (let keys in disableInfo) {
            disableInfo[keys] = disableInfo[keys] <= 0
        }
        let OrderS = null;

       
        let burger = error? <p>Ingredients can't be loaded</p> : <Spinner />

        if (ings) {
            burger = (
                <Aux>
                    <Burger ingredients={ings} />
                    <BurgerControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemove={onIngredientRemove}
                        disabled={disableInfo}
                        purchasable={updatePurchaseState(ings)}
                        price={price}
                        ordered={purchaseHandler}
                        isAuth={isAuth}
                   />
                </Aux>);

            OrderS = <OrderSummary
                price={price.toFixed(2)}
                purchaseContinue={purchaseContinueHandler}
                puchaseCancelled={puchaseCancelHandler}
                ingredients={ings} />;

        }
      

        return (
            <Aux>
                <Modal ModalClosed={puchaseCancelHandler} show={purchasing}>
                    {OrderS}
                </Modal>
                {burger}
            </Aux>
        );
    
}




export default withErrorHandler(BurgerBuilder, axios);