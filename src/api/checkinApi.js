import axiosClient from './axiosClient'

const checkinApi = {
    checkin: (credentials) => {
        const url ='/api/checkin'
        return axiosClient.post(url, credentials)
    },
}

export default checkinApi
