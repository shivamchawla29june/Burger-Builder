import React, { Component } from 'react';
import Aux from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler =() => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler =() => {
        const currentToggleState=this.state.showSideDrawer;
        this.setState(
            {
                showSideDrawer: !currentToggleState
                
            }
        )
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>);
    }
}

export default Layout;