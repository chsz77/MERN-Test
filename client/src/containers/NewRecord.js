import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {newRecord} from '../actions/inputActions';

//New Record
class NewRecord extends Component {
    constructor() {
    super();
    this.state = {
      symptomps: '',
      medication: '',
      diagnosis: '',
      prescription: [''],
      note: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleNewPres = this.handleNewPres.bind(this)
    this.handleChangePres = this.handleChangePres.bind(this)
    }
    
    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    
    handleNewPres(e) {
        const {prescription} = this.state;
        this.setState({prescription: [...prescription, '']})
    }
    
    handleChangePres(event) {
      const index = Number(event.target.name.split('-')[1]);
      const prescription = this.state.prescription.map((pres, i) => (
        i === index ? event.target.value : pres  
      ))
      this.setState({prescription});
    } 
    
    onSubmit(e) {
        e.preventDefault();
        
        const record = {
          symptomps: this.state.symptomps,
          medication: this.state.medication,
          diagnosis: this.state.diagnosis,
          prescription: this.state.prescription,
          note: this.state.note
        };
        
        // console.log(record)
        const id = this.props.match.params.id
        this.props.newRecord(record, id, this.props.history);
    }
    
    render(){
        let inputs = this.state.prescription.map((pres, index) => (
          <div 
            className = "input-group" 
            key={`pres-${index}`}>
             <div className="input-group-prepend">
                <span className="input-group-text">{index+1}</span>
            </div>
            <input
              type="text" 
              name={`pres-${index}`}
              className="form-control"
              value={pres}
              onChange={this.handleChangePres}
           />
          </div>
          ))
        
        return(
            <div className="col-md-9 my-4">
                <h1 className="display-4">Add a New Record</h1>
                <Moment className="lead" format="MMMM do, YYYY"/>
                <hr/>
                <form className="form-group" onSubmit={this.onSubmit}>
                    <label>Symptomps:</label>
                     <textarea onChange={this.onChange} value={this.state.symptomps}
                        name="symptomps" 
                        className="form-control" 
                        rows="5"
                    />
                    <br/>
                    <label>Diagnosis:</label>
                     <textarea onChange={this.onChange} value={this.state.diagnosis} 
                        name="diagnosis" 
                        className="form-control" 
                        rows="5"
                    ></textarea>
                    <br/>
                    <label>Medication:</label>
                     <textarea onChange={this.onChange} value={this.state.medication}
                        name="medication" 
                        className="form-control" 
                        rows="5"
                    ></textarea>
                    <br/>
                    <label>Prescription:</label>
                    <div>{inputs}
                    <div className="btn float-right mt-2 btn-sm btn-dark float right" onClick={this.handleNewPres}>+</div>
                    </div>
                    <br/>
                    <label>Notes:</label>
                     <textarea onChange={this.onChange} value={this.state.note} 
                        name="note" 
                        className="form-control" 
                        rows="5"
                    ></textarea>
                    <br/>
                    <div className="my-3">
                    <input type="submit" className="btn btn-dark px-4"value="Submit"/>
                    <Link className="btn btn-outline-dark ml-2" to={`/patient/${this.props.match.params.id}`}>Back</Link>
                    </div>
                </form> 
            </div>
        )
    }
}

export default connect(null, {newRecord})(withRouter(NewRecord));
