import axiosClient from './axiosClient'

const packageApi = {
    getAll: (params) => {
        const url = '/api/packages'
        return axiosClient.get(url, { params })
    },
    getPackageById: (id) => {
        const url = `/api/packages/${id}`
        return axiosClient.get(url)
    },
    create: (credentials) => {
        const url = `/api/packages`
        return axiosClient.post(url, credentials)
    },
    update: (id, credentials) => {
        const url = `/api/packages/${id}`
        return axiosClient.patch(url, credentials)
    },
    delete: (id, credentials) => {
        const url = `/api/packages/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default packageApi
