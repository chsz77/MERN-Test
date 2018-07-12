import {GET_PATIENTS, GET_RECORDS, GET_RECORD} from '../actions/types'

const initialState = {}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PATIENTS:
            return {...state, patients: action.payload}
        case GET_RECORDS: 
            return {...state, patient: action.payload}
        case GET_RECORD:
            return {...state, record: action.payload}
        default:
            return state
    }
}
