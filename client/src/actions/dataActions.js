import axios from 'axios';
import {GET_PATIENTS, GET_RECORDS, GET_RECORD} from './types';

const API = `https://aqueous-wave-72791.herokuapp.com/api/main/patients`

export const getPatients = () => dispatch => {
    axios.get(API)
        .then(res => {dispatch({
            type: GET_PATIENTS,
            payload: res.data
        })})
}

export const getRecords = (id) => dispatch => {
    axios.get(`${API}/${id}`)
        .then(res => {dispatch({
            type: GET_RECORDS,
            payload: res.data
        })})
}

export const getRecord = (id, recordId) => dispatch => {
    axios.get(`${API}/${id}/records/${recordId}`)
        .then(res => {dispatch({
            type: GET_RECORD,
            payload: res.data
        })})
}

// export const deleteRecord = (recordId) => dispatch => {
//     axios.delete(`${API}/delete/records/${recordId}`)
//         .then(res => dispatch ({
//             type: DELETE_RECORD,
//             payload: recordId
//         }))
// }
