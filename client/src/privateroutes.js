import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
            if(!auth.isAuthenticated){
                return <Redirect to="/login" />
            } else if (auth.isAuthenticated === true && auth.user.user_type !== "Doctor" && auth.user.user_type !== "Admin" && auth.user.registered){
                return <Redirect to="/patient"/>
            }
            return <Component {...props} />
        }  
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
