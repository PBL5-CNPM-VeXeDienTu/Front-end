import axiosClient from './axiosClient'

const vehicleApi = {
    getListByParams: (params) => {
        let url = '/api/vehicles?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListByUserId: (id) => {
        const url = `api/vehicles/get-by-owner/${id}`
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `api/vehicles/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `api/vehicles`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/vehicles/${id}`
        return axiosClient.patch(url, credentials)
    },
    softDeleteById: (id) => {
        const url = `/api/vehicles/${id}`
        return axiosClient.delete(url)
    },
    verifyById: (id, credentials) => {
        const url = `/api/vehicles/${id}/verify`
        return axiosClient.patch(url, credentials)
    },
}

export default vehicleApi
