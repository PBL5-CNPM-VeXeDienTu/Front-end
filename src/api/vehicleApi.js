import axiosClient from './axiosClient'

const vehicleApi = {
    getListByParams: (params) => {
        const url = `/api/vehicles?limit=${params.limit}&page=${params.page}`
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
    deleteById: (id) => {
        const url = `/api/vehicles/${id}`
        return axiosClient.delete(url)
    },
}

export default vehicleApi
