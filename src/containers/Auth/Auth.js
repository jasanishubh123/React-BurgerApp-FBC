import React, { useState, useEffect } from 'react'
import Input from '../../component/UI/Input/Input'
import Button from '../../component/UI/Button/Button'
import classes from './Auth.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import {updateObject} from '../../shared/utility'

const Auth=props=> {


 const[controls,setControls]=useState({
   
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'

            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'

            },
            value: '',
            validation: {
                required: true,

                minLength: 6
            },
            valid: false,
            touched: false
        }
    
 })

    const[isSignup,setIsSignup]=useState(true)

    const {building,authRedirectPath,onsetAuthRedirectPath}=props

    useEffect(()=>{

        if(!building && authRedirectPath !=="/" ){
            onsetAuthRedirectPath()
        }

    },[building,authRedirectPath,onsetAuthRedirectPath])

  
   const switchAuthModeHandler = () => {
       

        setIsSignup(!isSignup)
    }

  const  checkValidity=(value, rules)=> {
        // console.log(value + " " + rules.isEmail)
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        // console.log(isValid)

        return isValid;
    }

  const inputChangedHandler = (event, controlName) => {
        // console.log("Hello")
        const updatedControls = updateObject(controls,{
            [controlName]: updateObject(controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        setControls(updatedControls)

        
    }

  const  submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value,isSignup);
    }

    
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValid={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
        ));

        if(props.loading){
            form=<Spinner/>
        }
        let errorMessage=null;

        if(props.error){
            errorMessage=(
            <p>{props.error.message}</p>
            )
        }

        let authRedirect=null;
        if(props.isAuth){

            authRedirect=<Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>

                </form>
                <Button
                    clicked={switchAuthModeHandler}
                    btnType="Danger" >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    


}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !==null,
        building:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onsetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);