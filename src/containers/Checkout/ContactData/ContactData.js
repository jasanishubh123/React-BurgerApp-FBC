import React, { useState } from 'react'
import Button from '../../../component/UI/Button/Button'
import Spinner from '../../../component/UI/Spinner/Spinner'
import classes from './ContactData.css'
 import axios from '../../../axios-orders'
import Input from '../../../component/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../../store/actions/index'
import {updateObject} from '../../../shared/utility'



const ContactData=props=> {

     const [orderForm,setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'

            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touch:false
        },

        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'

            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touch:false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'

            },
            value: '',
            validation:{
                required:true,
                minLength:5,
                maxLength:5

            },
            valid:false,
            touch:false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'

            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touch:false
        },

        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'

            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touch:false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }]

            },
            value: 'fastest',
            valid:true,
            validation:{
               
            }
        }
     })

     const [formIsValid,setFormIsValid]=useState(false)

      
       
    

  const  OrderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true })
        const formData={};
        for(let fe in orderForm){
            formData[fe]=orderForm[fe].value
        } 
        const orders = {
            ingredient: props.ings,
            price: props.price,
            orderData: formData,
            userId:props.userId
        }

        props.onOrderBurger(orders,props.token)

    }


  const checkValidity=(value,rules)=>{
        let isValid=true;
            if(!rules){
                return true
            }

           
            if(rules.required){
                isValid=value.trim()!=='' && isValid


            }
            if(rules.minLength){
                isValid=value.length>=rules.minLength && isValid
            }
            if(rules.maxLength){
                isValid=value.length<=rules.maxLength && isValid
            }
           

            return isValid

    }

 const  inputChangedHandler = (event, inputIdentifier) => {
       
        const element = updateObject(orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,orderForm[inputIdentifier].validation),
            touch:true
        })
       
        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier]:element
        })
       
        
        let formIsValid=true;

        for(let inputId in updatedOrderForm){
            formIsValid=updatedOrderForm[inputId].valid && formIsValid
        }

       

        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }

    
        const formElement = []
        for (let key in orderForm) {
            formElement.push({
                id: key,
                config: orderForm[key]

            })
        }

        let form = (
            <form onSubmit={OrderHandler}>

                {formElement.map(fe => (
                    <Input key={fe.id} elementType={fe.config.elementType}
                        elementConfig={fe.config.elementConfig}
                        value={fe.config.value}
                        invalid={!fe.config.valid}
                        shouldValid={fe.config.validation}
                        touched={fe.config.touch}
                        changed={(event) => inputChangedHandler(event, fe.id)} />
                ))}
                <Button btnType="Success" disabled={!formIsValid} >ORDER</Button>
            </form >

        );
        if (props.loading) {

            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}

            </div>
        )
    
}

const mapStateToProps =state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger:(orderData,token)=>dispatch(action.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(ContactData,axios))