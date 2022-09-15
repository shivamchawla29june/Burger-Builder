import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm:{
            Name:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            Street:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Street',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            Zipcode:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'ZIP code',
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength:10
                },
                valid: false,
                touched: false
            },
            Country:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Country',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            Email:{
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Your Email',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            DeliveryMethod:{
                elementType:'select',
                elementConfig: {
                    options:[{value:"Fastest", displayValue:"Fastest"},{value:"Cheapest", displayValue:"Cheapest"}]
                },
                validation:{},
                valid:true,
                value:''
            },
        },
        formisValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("Here");
        this.setState({ loading: true });
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => (
            this.setState({ loading: false })
        ));
    }

    checkValidity(value,rules){
        let isValid=true;

        if(!rules){
            return true;
        }
        if(rules.required){
            isValid= value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid= value.length >=rules.minLength && isValid;
        }

        
        if(rules.minLength){
            isValid= value.length <=rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm={
            ...this.state.orderForm
        }

        const updatedformElement={...updatedOrderForm[inputIdentifier]
        };
        
        updatedformElement.value=event.target.value;
        updatedformElement.valid=this.checkValidity(updatedformElement.value, updatedformElement.validation);
        updatedformElement.touched=true;
        //console.log(updatedformElement);
        updatedOrderForm[inputIdentifier]=updatedformElement;
        let formisValid =true;
        for(let inputIdentifier in updatedOrderForm){
            formisValid=updatedOrderForm[inputIdentifier].valid && formisValid;
        }
        this.setState({orderForm: updatedOrderForm, formisValid: formisValid})
    }

    render() {

        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form =(
                <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement =>(
                    <Input 
                        key={formElement.id}
                        label={formElement.id}
                        ElementType={formElement.config.elementType}
                        ElementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        value={formElement.config.value} 
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) =>this.inputChangedHandler(event, formElement.id)}/>)
                )}                    
                <Button btnType="Success" disabled={!this.state.formisValid}>ORDER</Button>
            </form>
        );
        
        if(this.state.loading){
            form= <Spinner />
        }

        return (
            <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
        )
    }
}

export default ContactData;