import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Containers
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import PatientsList from './containers/PatientsList';
import RecordsList from './containers/RecordsList';
import Record from './containers/Record';
import NewRecord from './containers/NewRecord';
import NewPatient from './containers/NewPatient';
import PrivateRoute from './privateroutes';

const Routes = () => (
    <Switch>
        <PrivateRoute path="/newpatient" component={NewPatient}/>
        <Route path="/patient/:id/records/:recordId" component={Record}/>
        <PrivateRoute path="/patient/:id/new" component={NewRecord}/>
        <PrivateRoute path="/patient/:id" component={RecordsList}/>
        <Route path="/patient" component={RecordsList}/>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Register} />
        <PrivateRoute path="/doctor" component={PatientsList}/>
        <Route exact path='/' component={Login}/>
    </Switch>
)

export default Routes