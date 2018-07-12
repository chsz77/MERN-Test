import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
    constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
        
        const userData = {
          username: this.state.username,
          password: this.state.password,
        };
        
        this.props.loginUser(userData);
    }
    
    componentDidMount() {
        const {isAuthenticated, user} = this.props.auth
        
        if (isAuthenticated && user.user_type==='Doctor') {
            this.props.history.push('/doctor');
        } else if (isAuthenticated && user.user_type==='Admin'){
            this.props.history.push('/admin')
        } else if (isAuthenticated && user.user_type==='Patient' && user.registered){
            this.props.history.push('/patient') 
        } else if (isAuthenticated && user.user_type==='Patient'){
            this.props.history.push('/newpatient') 
        } 
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated && nextProps.auth.user.user_type==='Doctor') {
            nextProps.history.push('/doctor');
        } else if (nextProps.auth.isAuthenticated && nextProps.auth.user.user_type==='Admin'){
            nextProps.history.push('/admin') 
        } else if (nextProps.auth.isAuthenticated && nextProps.auth.user.registered){
            nextProps.history.push('/patient')
        } else if (nextProps.auth.isAuthenticated && nextProps.auth.user.user_type==='Patient'){
            nextProps.history.push('/newpatient')
        } 

        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }

    render(){
        const { errors } = this.state;
        
        return(
            <div>
                <div className="text-center">
                    <h1 className="display-4">Hospital Patient Center</h1>
                    <p className="lead">Login to see your <strong>Medical Records</strong>
                    <span> or contact <strong>Hospital Admin</strong> to create a new account</span>
                    </p>
                </div>
                <div className="col-lg-5 col-md-7 mx-auto mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h3>Login</h3>
                            <hr/>
                            <form className="form-group" onSubmit={this.onSubmit}>
                                <label>Username:</label><br/>
                                <input 
                                    value={this.state.username}
                                    onChange={this.onChange} 
                                    className={classnames('form-control form-control-lg', {
                                                  'is-invalid': errors.username
                                                })}
                                    type="text" 
                                    name="username"
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">{errors.username}</div>
                                )}
                                <br/>
                                <label>Password:</label><br/>
                                <input 
                                    value={this.state.password}
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
                                <button className="btn btn-block btn-dark">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
