import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.3,
    bacon: 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalPrice: 4,
        purchaseable: false,
        readyToPurchase: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-app-aba71-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients: response.data});
        })
        .catch(error=>{this.setState({error: true})});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        )
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);
        this.setState({ purchaseable: sum > 0 })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice - priceReduction;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        )
        this.updatePurchaseState(updatedIngredients);
    }

    readyToPurchaseHandler = () => {
        this.setState({ readyToPurchase: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ readyToPurchase: false })
    }

    purchaseContinueHandler = () => {
        //alert
        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) +'='+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString= queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
        search: '?'+ queryString});
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        let orderSummary=null;

        let burger=this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if(this.state.ingredients){
            burger=(
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    orderingNow={this.readyToPurchaseHandler}
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable} />
                </Aux>
            );

            orderSummary=
            <OrderSummary
            purchasedCancelled={this.purchaseCancelHandler}
            purchasedContinue={this.purchaseContinueHandler}
            TotalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients} />
        }

        if(this.state.loading){
            orderSummary =<Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.readyToPurchase} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);