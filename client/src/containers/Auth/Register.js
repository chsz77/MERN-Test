import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      user_type: 'Patient',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        const newUser = {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          user_type: this.state.user_type
        };
        
        if(this.props.auth.user.user_type==='Admin'){
            alert(`A new ${this.state.user_type} account is created`);
            this.props.registerUser(newUser);
        }
        
        
        this.props.registerUser(newUser, this.props.history);
    }
    
    componentDidMount() {
        if (this.props.auth.isAuthenticated && this.props.auth.user.user_type !== 'Admin') {
          this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }

    
    render(){
        const { errors } = this.state;
        
        return(
            <div className="my-4">
                <div className="text-center">
                    <h1 className="display-4">Lord Administrator Page</h1>
                </div>
                <div className="col-lg-6 col-md-9 mx-auto mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h3>Register a New Account</h3>
                            <hr/>
                            <form className="form-group" onSubmit={this.onSubmit}>
                                <label>Username:</label><br/>
                                <input 
                                    value={this.state.username}
                                    onChange={this.onChange} 
                                    className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.username})} 
                                    type="text" 
                                    name="username"
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                    <br/>
                                <label>Name:</label><br/>
                                <input 
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name})}  
                                    type="text" 
                                    name="name" 
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                    <br/>
                                <label>Account Type:</label>
                                <select 
                                    className="form-control"
                                    onChange={this.onChange} name="user_type">
                                      <option value="Admin">Administrator</option>
                                      <option value="Doctor">Doctor</option>
                                      <option selected value="Patient">Patient</option>
                                </select>
                                <br/>
                                
                                <label>Password:</label>
                                <input value={this.state.password}
                                    onChange={this.onChange} 
                                    className={classnames('form-control form-control-lg', {
                                      'is-invalid': errors.password
                                    })} 
                                    type="password" 
                                    name="password"
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                    <br/>
                                <button className="btn btn-block btn-dark">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));