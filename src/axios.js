import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-5e57f/us-central1/api' // api url (cloud function)
})
export default instance