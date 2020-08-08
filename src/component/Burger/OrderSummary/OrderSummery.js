import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'


class OrderSummeray extends React.Component{


    componentWillUpdate(){
        

    }

    render(){
      const  ingredientsSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
        return <li key={igKey+1} ><span style={{textTransform:"capitalize"}}>{igKey}:</span>{this.props.ingredients[igKey]}</li>
        })
       

        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
    <p><strong>Total Price : {this.props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button clicked={this.props.puchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={this.props.purchaseContinue} btnType='Success'>CONTINUE</Button>
        </Aux>
        )
    }

  


}

export default OrderSummeray