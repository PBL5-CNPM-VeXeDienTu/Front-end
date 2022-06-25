import axiosClient from './axiosClient'

const parkingHistoryApi = {
    getListByParams: (params) => {
        let url = '/api/parking-histories?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListByParkingLotUserId: (id, params) => {
        let url = `/api/parking-histories/get-by-user/${id}?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListParkingVehicle: (id, params) => {
        const url = `/api/parking-histories/get-by-user/${id}?is_parking=${params.is_parking}`
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `/api/parking-histories/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/parking-histories`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/parking-histories/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/parking-histories/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default parkingHistoryApi
