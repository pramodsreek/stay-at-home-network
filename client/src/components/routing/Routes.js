import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profileforms/CreateProfile';
import EditProfile from '../profileforms/EditProfile';
import AddExpertise from '../profileforms/AddExpertise';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Blogs from '../blogs/Blogs';
import Blog from '../blog/Blog';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/createprofile' component={CreateProfile} />
        <PrivateRoute exact path='/editprofile' component={EditProfile} />
        <PrivateRoute exact path='/addexpertise' component={AddExpertise} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/blogs' component={Blogs} />
        <PrivateRoute exact path='/blogs/:id' component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
