import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../component/Burger/Burger'
import BurgerControls from '../../component/Burger/BuildControls/BuildControls'
import Modal from '../../component/UI/Modal/Modal'
import { connect } from 'react-redux'
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummery'

import axios from  '../../axios-orders'
import Spinner from '../../component/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

export class BurgerBuilder extends React.Component {

    state = {
       
      
        // purchasable: true,
        purchasing: false
        // loading: false,
        // error:false
    }

    componentDidMount() {

       

        // axios.get("https://my-burger-cba15.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         console.log(response.data)
        //     }).catch(error=>{this.setState({error:true})})
            this.props.onInitIngredients();
    }
    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({ purchasing: true })
        }else{
            this.props.onSetRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
        
    }

    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient).map(
            igKey => {
                return ingredient[igKey]
            }
        ).reduce((sum, ele) => {
            return sum + ele;
        }, 0)

        return  sum > 0 

    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const UpdateIngredient = {
    //         ...this.state.ingredients
    //     };
    //     UpdateIngredient[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({ totalPrice: newPrice, ingredients: UpdateIngredient })
    //     this.updatePurchaseState(UpdateIngredient);
    // }

    // removeIngredientHandler = (type) => {

    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount <= 0)
    //         return;
    //     const updatedCount = oldCount - 1;

    //     const UpdateIngredient = {
    //         ...this.state.ingredients
    //     };
    //     UpdateIngredient[type] = updatedCount
    //     const priceRemove = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceRemove
    //     this.setState({ totalPrice: newPrice, ingredients: UpdateIngredient })
    //     this.updatePurchaseState(UpdateIngredient)

    // }
    puchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // this.setState({ loading: true })
        // // alert('Continue')
        // const orders = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Shubham Jasani',
        //         address: {
        //             street: "Happy Palace",
        //             zipCode: "395006",
        //             country: "India"
        //         },
        //         email: "jasanishubh@gmail.com"
        //     }
        // }

        // axios.post('/orders.json', orders).then(
        //     response => { this.setState({ loading: false, purchasing: false }) }
        // ).catch(err => { this.setState({ loading: false, purchasing: false }) })

        // const queryParam=[]

        // for(let i in this.state.ingredients){
        //     queryParam.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParam.push("price="+this.props.price)
        // const queryString=queryParam.join('&')
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let keys in disableInfo) {
            disableInfo[keys] = disableInfo[keys] <= 0
        }
        let OrderS = null;

       
        let burger = this.props.error? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                   />
                </Aux>);

            OrderS = <OrderSummary
                price={this.props.price.toFixed(2)}
                purchaseContinue={this.purchaseContinueHandler}
                puchaseCancelled={this.puchaseCancelHandler}
                ingredients={this.props.ings} />;

        }
      

        return (
            <Aux>
                <Modal ModalClosed={this.puchaseCancelHandler} show={this.state.purchasing}>
                    {OrderS}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps= state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token !== null

    }
}

const mapDispatchToProps= dispatch =>{
    return{
        onIngredientAdded:(ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));