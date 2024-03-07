import axios from 'axios';

export const authAdmin = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthAdmin', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authRp = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthRp', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authFront = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthFront', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authPersAsser = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthPersAsser', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authBanque = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthBanque', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authUser = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token_user')
        try {
            axios.get('http://localhost:3100/checkAuthUser', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authAdminRpFront = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthAdmin-Rp-Front', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}

export const authAdminRp = {
    data() {
        return {
            authorized: true
        }
    },
    created() {
        const token = localStorage.getItem('token')
        try {
            axios.get('http://localhost:3100/checkAuthAdmin-Rp', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then()
            .catch(() => {
                console.log('Authorization denied !')
                this.authorized = false
            })
            } catch(err) {
                console.error('Error checking authentication:', err);
            }
    }
}