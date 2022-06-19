import axiosClient from './axiosClient'

const vehicleTypeApi = {
    getAll: () => {
        const url = `/api/vehicle-types`
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
    deleteById: (id, credentials) => {
        const url = `/api/vehicle-types/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default vehicleTypeApi
