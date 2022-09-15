import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses=[classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    console.log(props);
    switch (props.ElementType) {

        case ("input"):
            inputElement = <input {...props.ElementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed} />;
            break;
        case ("textarea"):
            inputElement = <textarea {...props.ElementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed} />;
            break;
        case ("select"):
            inputElement = <select
                {...props.ElementConfig}
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed}>
                {props.ElementConfig.options.map(option => (
                    <option value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default:
            inputElement = <input  onChange={props.changed}/>;
            break;  
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}


export default input