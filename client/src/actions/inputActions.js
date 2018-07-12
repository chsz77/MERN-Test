import axios from 'axios'

const API = `https://aqueous-wave-72791.herokuapp.com`

export const registerPatient = (newPatient, history) => dispatch => {
  axios
    .post(API, newPatient)
    .then(res => history.push('/patient'))
    .catch(err => console.log(err))
};

export const newRecord = (record, id, history) => dispatch => {
  axios.post(`${API}/${id}/records`, record)
  .then(res => history.push(`/patient/${id}`))
  .catch(err => console.log(err))
}