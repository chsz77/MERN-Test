import React, { Component } from 'react';
import Moment from 'react-moment';
import Loading from '../components/Loading';
import {Link} from 'react-router-dom';
import {getRecord} from '../actions/dataActions'
import {connect} from 'react-redux'

class Record extends Component {
    constructor(props){
        super(props);
        this.state = {record: []}
    }
    
    componentDidMount(){
        const id  = this.props.match.params.id || this.props.auth.user.id
        const recordId  = this.props.match.params.recordId
        this.props.getRecord(id, recordId)
        
    }
    
    render(){
        const {record} = this.props.data
        
        if(!record){
            return <Loading />
        }
        
        return(
            <div>
                <h1 className="display-4">Medical Record</h1>
                
                <p className="lead"><Moment format="MMMM Do, YYYY | HH:mm">{record.created_at}</Moment></p>
                <Link className="btn btn-sm btn-outline-dark" to={this.props.auth.user.user_type === `Patient` ? '/patient' : `/patient/${this.props.match.params.id}`}>Back</Link>

                <ul className="list-group list-group-flush my-3">
                <li className="list-group-item">
                    <h4>Symptoms</h4>
                    <hr/>
                    <div>{record.symptomps}</div>
                </li>
                <li className="list-group-item">
                    <h4>Diagnosis</h4>
                    <hr/>
                    <div>{record.diagnosis}</div>
                </li>
                <li className="list-group-item">
                    <h4>Medication</h4>
                    <hr/>
                    <div>{record.medication}</div>
                </li>
                <li className="list-group-item">
                    <h4>Prescription</h4>
                    <hr/>
                    <ol>
                        {record.prescription.map((pres, index) => (<li key={index}>{pres}</li>))}
                    </ol>
                </li>
                <li className="list-group-item">
                    <h4>Notes</h4>
                    <hr/>
                    <div>{record.note}</div>
                </li>
                </ul>
            </div>
        )
    }    
}

const mapStateToProps = (state) => ({
    data: state.data,
    auth: state.auth
})

export default connect(mapStateToProps, {getRecord})(Record)