import axiosClient from './axiosClient'

const checkoutApi = {
    checkout: (credentials) => {
        const url = '/api/checkout'
        return axiosClient.post(url, credentials)
    },
}

export default checkoutApi
