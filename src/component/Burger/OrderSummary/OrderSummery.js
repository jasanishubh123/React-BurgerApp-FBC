import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'


const OrderSummeray=props=>{




      const  ingredientsSummary=Object.keys(props.ingredients)
        .map(igKey=>{
        return <li key={igKey+1} ><span style={{textTransform:"capitalize"}}>{igKey}:</span>{props.ingredients[igKey]}</li>
        })
       

        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
    <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button clicked={props.puchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>CONTINUE</Button>
        </Aux>
        )
    

  


}

export default OrderSummeray