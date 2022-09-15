import { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch} from 'react-router-dom';

class App extends Component {
  //function App() {
  render() {
    return (
     
      <div>
        <Layout>
          <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
     
    );
  }
}

export default App;
