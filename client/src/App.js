import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profileforms/CreateProfile';
import EditProfile from './components/profileforms/EditProfile';
import AddExpertise from './components/profileforms/AddExpertise';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Blogs from './components/blogs/Blogs';
import Blog from './components/blog/Blog';
import PrivateRoute from './components/routing/PrivateRoute';
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import NotFound from './components/layout/NotFound';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

library.add(fab, faCheckSquare, faCoffee);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //when it is loaded or mounted [] makes it run only once otherwise it will keep running. search for useEffect hooks

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/createprofile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/editprofile' component={EditProfile} />
              <PrivateRoute
                exact
                path='/addexpertise'
                component={AddExpertise}
              />
              <PrivateRoute exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/blogs' component={Blogs} />
              <PrivateRoute exact path='/blogs/:id' component={Blog} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
