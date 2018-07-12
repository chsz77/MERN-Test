import React, {Component} from 'react';
import {registerPatient} from '../actions/inputActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class NewPatient extends Component {
    constructor() {
    super();
    
    this.state = {
      age: '',
      sex: 'Male',
      blood: '',
      address: '',
      email: '',
      phone: '',
      photo: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        const newPatient = {
          age: this.state.age,
          sex: this.state.sex,
          blood: this.state.blood,
          address: this.state.address,
          email: this.state.email,
          phone: this.state.phone,
          photo: this.state.photo
        };
        
        console.log(newPatient)
        this.props.registerPatient(newPatient, this.props.history);
    }
    
    render(){
        return (
            <div className="col-lg-9">
                <h1 className="display-4">Add a New Patient</h1>
                <form className="form-group" onSubmit={this.onSubmit}>
                    <label>Date of Birth</label>
                        <input onChange={this.onChange} value={this.state.age}
                        className="form-control" 
                        type="date" 
                        name="age"
                    /><br/>
                    <label>Sex</label>
                    <select className="form-control" onChange={this.onChange} value={this.state.sex} name="sex">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <br/>
                    <label>Blood Type</label>
                    <input onChange={this.onChange} value={this.state.blood}
                        className="form-control" 
                        type="text" 
                        name="blood"
                    /><br/>
                    <label>Address</label>
                    <textarea onChange={this.onChange} value={this.state.address}
                        rows="7" 
                        className="form-control" 
                        name="address"
                    /><br/>
                    <label>Phone</label>
                    <input onChange={this.onChange} value={this.state.phone}
                        className="form-control" 
                        type="text" 
                        name="phone"
                    /><br/>
                    <label>Email</label>
                    <input onChange={this.onChange} value={this.state.email}
                        className="form-control" 
                        type="email" 
                        name="email"
                    /><br/>
                    <label>Photo</label>
                    <input onChange={this.onChange} value={this.state.photo}
                        className="form-control" 
                        type="text" 
                        name="photo"
                    /><br/>
                    <div className="my-3">
                    <input className="btn btn-dark" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect(null, {registerPatient})(withRouter(NewPatient));