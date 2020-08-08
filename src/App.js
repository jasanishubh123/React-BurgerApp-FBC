import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter ,Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as action from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'


const asyncCheckout=asyncComponent(()=>{
   return import('./containers/Checkout/Checkout')
})

const asyncOrder=asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})


class App extends React.Component {


  componentDidMount() {
    this.props.onTryAutoSignup();
    console.log(process.env.NODE_ENV)
  }


  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} ></Route>
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">

        <Layout>

          {routes}



        </Layout>

      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
