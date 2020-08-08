import React,{useEffect , Suspense} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter ,Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as action from './store/actions/index'



const Checkout=React.lazy(()=>{
   return import('./containers/Checkout/Checkout')
})

const Order=React.lazy(()=>{
  return import('./containers/Orders/Orders')
})

const Auth=React.lazy(()=>{
  return import('./containers/Auth/Auth')
})


 const App= props => {

  const {onTryAutoSignup}=props


  useEffect(()=>{

    onTryAutoSignup();
  },[onTryAutoSignup])



  

    let routes = (
      <Switch>
        <Route path="/auth" render={(props)=><Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" render={(props)=><Auth {...props} />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout"render={(props)=><Checkout {...props} />} />
          <Route path="/orders" render={(props)=><Order {...props} />} ></Route>
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">

        <Layout>

          <Suspense fallback={<p>Loading...</p>} >{routes}</Suspense>

        </Layout>

      </div>
    );
  

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
