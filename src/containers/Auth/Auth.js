import React from 'react'
import Input from '../../component/UI/Input/Input'
import Button from '../../component/UI/Button/Button'
import classes from './Auth.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import {updateObject} from '../../shared/utility'

class Auth extends React.Component {

    state = {
        controls: {
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
        },
        isSignup: true
    }


    componentDidMount(){

        if(!this.props.building && this.props.authRedirectPath !=="/" ){
            this.props.onsetAuthRedirectPath()
        }

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    checkValidity(value, rules) {
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

    inputChangedHandler = (event, controlName) => {
        // console.log("Hello")
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if(this.props.loading){
            form=<Spinner/>
        }
        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
            <p>{this.props.error.message}</p>
            )
        }

        let authRedirect=null;
        if(this.props.isAuth){

            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>

                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger" >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }


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