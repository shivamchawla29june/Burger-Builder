import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentDidUpdate(){
        //console.log('Update Order Summary');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p> A delicious burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Your Price is: {this.props.TotalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchasedCancelled}>CANCEL</Button>
            <Button btnType="Success"clicked={this.props.purchasedContinue}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;