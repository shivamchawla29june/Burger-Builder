import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:0
    }

    UNSAFE_componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={}
        let price=0;
        for(let param of query.entries()){
            //console.log(param);
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                ingredients[param[0]]=+param[1];
            }
            
        }
        //console.log(query.entries());
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    CheckoutCancelled =() =>{
        this.props.history.goBack();
    }
    
    CheckoutContinued =() =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutContinued={this.CheckoutContinued}
                checkoutCancelled={this.CheckoutCancelled}/>
                <Route path={this.props.match.url+'/contact-Data'} 
                render={(props) => (<ContactData price={this.state.totalPrice}ingredients={this.state.ingredients} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;