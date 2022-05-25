import axiosClient from './axiosClient'

const vehicleApi = {
    getAll: (params) => {
        const url = '/api/vehicles/'
        return axiosClient.get(url, { params })
    },
    getByUserId: (id) => {
        const url = `api/vehicles/get-by-owner/${id}`
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `api/vehicles/${id}`
        return axiosClient.get(url)
    },
    add: (credentials) => {
        const url = `api/vehicles`
        return axiosClient.post(url, credentials)
    },
    update: (id, credentials) => {
        const url = `/api/vehicles/${id}`
        return axiosClient.patch(url, credentials)
    },
    delete: (id) => {
        const url = `/api/vehicles/${id}`
        return axiosClient.delete(url)
    },
}

export default vehicleApi
