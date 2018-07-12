import React, { Component } from 'react';
import Moment from 'react-moment';
import Loading from '../components/Loading';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {getPatients} from '../actions/dataActions'

class PatientsList extends Component {
    componentDidMount(){
        this.props.getPatients()
    }
    
    render(){
        const {patients} = this.props.data;
        if(!patients || patients.length===0){
            return <Loading />
        }
        return(
            <div>
                <div className="card my-2">
                <div className="card-body">
                <p className="lead float-right">Welcome, <strong>{this.props.auth.user.name}</strong></p>
                <h1 className="display-4">Patients</h1>
                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Records</th>
                        <th>Last Record</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map(({_id, patient, created_at, records, last_record}, index) => (
                        <tr
                        key={_id}
                        >
                        <td>{index+1}</td>
                        <td>{patient.name}</td>
                        <td>
                            {records.length}
                        </td>
                        <td>
                          <Moment format="HH:mm | MMMM Do, YYYY">{last_record}</Moment>
                        </td>
                        <td>
                            <Link to={`/patient/${patient._id}`}>Details</Link>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {patients.length===0 ? (<div className="mt-2 text-center">There's no patient</div>) : null}
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

export default connect(mapStateToProps, {getPatients})(PatientsList)