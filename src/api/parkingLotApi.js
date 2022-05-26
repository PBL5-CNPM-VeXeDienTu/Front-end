import axiosClient from './axiosClient'

const parkingLotApi = {
    getListByParams: (params) => {
        const url = `/api/parking-lots?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getListByUserId: (id) => {
        const url = `api/parking-lots/get-by-owner/${id}`
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `api/parking-lots/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `api/parking-lots`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/parking-lots/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id) => {
        const url = `/api/parking-lots/${id}`
        return axiosClient.delete(url)
    },
}

export default parkingLotApi
