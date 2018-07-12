import React, { Component } from 'react';
import Moment from 'react-moment';
import Loading from '../components/Loading';
import {Link} from 'react-router-dom';
import {getRecords} from '../actions/dataActions'
import {connect} from 'react-redux'

class RecordsList extends Component {
    
    componentDidMount(){
        const id  = this.props.match.params.id || this.props.auth.user.id
        this.props.getRecords(id)
    }
    
    render(){
        const id  = this.props.match.params.id || this.props.auth.user.id
        const {patient} = this.props.data
        if(!patient){
            return <Loading />
        }
        
        const {user} = this.props.auth;
        const button = (
            <div className="float-right btn-group">
                <Link to={`/patient/${id}/new`} className="btn btn-outline-dark">New Record</Link>
                <Link to="/doctor/" className="btn btn-outline-dark">Back</Link>
            </div>
        );
        
        return(
            <div>
                <div className="card">
                <div className="card-body">
                    {user.user_type==="Doctor" ? button : null}
                <h1 className="display-4">{patient.patient.name}</h1>
                <hr/>
                <div className="row">
                <div className="col-md-3 d-none d-md-block">    
                    <img className="img-fluid" alt={patient._id} src={patient.photo}/>
                </div>
                <div className="col-md-9">
                    <p>Age: <strong><Moment fromNow ago>{patient.age}</Moment></strong></p>
                    <p>Sex: <strong>{patient.sex}</strong></p>    
                    <p>Blood type: <strong>{patient.blood}</strong></p>    
                    <p>Phone: <strong>{patient.phone}</strong></p>
                    <p>Address: <strong>{patient.address}</strong></p>
                    <p>Email: <strong>{patient.email}</strong></p>
                </div> 
                </div>
                </div>
                </div>
                <div className="card my-3">
                <div className="card-body">
                <h3>Records</h3>
                <table className="table"> 
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th> 
                            <th>Time</th> 
                            <th>Doctor</th>
                            <th>Details</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {patient.records.map((record, index) => (
                        <tr key={record._id}>
                            <td>{index+1}</td>
                            <td><Moment format="MMMM Do, YYYY">{record.created_at}</Moment></td>
                            <td><Moment format="HH:mm">{record.created_at}</Moment></td>
                            <td>{record.doctor}</td>
                            <td>
                                <Link to={`/patient/${id}/records/${record._id}`}>Details</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                 {patient.records.length === 0 ? (<div className="mt-2 text-center">There is no record</div>) : null}
                </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    auth: state.auth
})

export default connect(mapStateToProps, {getRecords})(RecordsList)
