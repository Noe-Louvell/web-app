import axios from 'axios'
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:3001'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    isUserLoggedIn() {
        let user = Cookies.get('sessionUser')
        if (user === null) return false
        return true
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()