import axiosClient from './axiosClient'

const parkingHistoryApi = {
    getListByParams: (params) => {
        const url = `/api/parking-histories?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getListByParkingLotUserId: (id, params) => {
        const url = `/api/parking-histories/get-by-user/${id}?limit=${params.limit}&page=${params.page}`
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
