import React,{ Component } from "react";

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state= {
        orders:[],
        loading: false
    }
    componentDidMount(){
        axios.get('/orders.json').then(res =>{
            const fetchOrder=[]
            for(let key in res.data){
                fetchOrder.push({...res.data[key],id:key})
            }
            this.setState({loading: false,orders: fetchOrder})
        }).catch(error =>{
            this.setState({loading: false});
        })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order 
                    price={order.price}
                    ingredients={order.ingredients}
                    key={order.id}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);