import axiosClient from './axiosClient'

const parkingLotApi = {
    getListByParams: (params) => {
        let url = '/api/parking-lots?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
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
        const url = 'api/parking-lots'
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/parking-lots/${id}`
        return axiosClient.patch(url, credentials)
    },
    verifyById: (id, credentials) => {
        const url = `/api/parking-lots/${id}/verify`
        return axiosClient.patch(url, credentials)
    },
    softDeleteById: (id) => {
        const url = `/api/parking-lots/${id}`
        return axiosClient.delete(url)
    },
}

export default parkingLotApi
