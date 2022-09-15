import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

//    console.log(props.ingredients);
    const ingredientOutput = ingredients.map(ig => {
        return <span 
        style={{textTransform:'capitalize',display:'inline-block',margin:'5px',padding:'4px'}}
        key={ig.name}>{ig.name}  ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>INR: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );

};
export default order;