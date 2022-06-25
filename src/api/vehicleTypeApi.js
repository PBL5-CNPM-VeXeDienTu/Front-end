import axiosClient from './axiosClient'

const vehicleTypeApi = {
    getAll: (params) => {
        let url = '/api/vehicle-types?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/vehicle-types`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/vehicle-types/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id) => {
        const url = `/api/vehicle-types/${id}`
        return axiosClient.delete(url)
    },
}

export default vehicleTypeApi
