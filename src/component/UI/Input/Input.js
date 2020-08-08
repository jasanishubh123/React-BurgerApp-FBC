
import React from 'react'
import classes from './Input.css'

const input = (props) => {
   const inputClasses=[classes.ip]
    let inputElement = null;

    if(props.invalid && props.shouldValid && props.touched){
        inputClasses.push(classes.Invalid)
    }    

    switch (props.elementType) {
        case ('input'):
            inputElement = <input  onChange={props.changed} value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} />;
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed}  value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
            case('select'):
            inputElement=(<select  onChange={props.changed}  value={props.value} className={inputClasses.join(' ')}  >
                                {props.elementConfig.options.map(option=>(
                                    <option key={option.value} value={option.value} >{option.displayValue}</option>
                                ))}
                            </select>)
            break
        default:
            inputElement = <input value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} />
    }

    return (


        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input