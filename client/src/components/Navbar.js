import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.history.push("/login")
        this.props.logoutUser();
    }
        
    render(){
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                href=""
                onClick={this.onLogoutClick.bind(this)}
                className="btn btn-dark"
              >
                Logout
              </a>
            </li>
          </ul>
        );
        
        return(
        <nav className="navbar navbar-expand-sm navbar-light">
            {isAuthenticated ? authLinks : null}
        </nav>
        )
    }
    
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));