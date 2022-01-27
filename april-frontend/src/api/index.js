import axios from 'axios'

class ApiService {

    http = null

    constructor() {
        this.http = axios.create({
            baseURL: 'http://localhost:4000/'
        })
    }

    login({ email, password}) {
        return this.http.post('api/login', { email, password })
    }
}

export default ApiService