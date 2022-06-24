import axiosClient from './axiosClient'

const packageTypeApi = {
    getAll: () => {
        const url = '/api/package-types'
        return axiosClient.get(url)
    },
    getPackageTypeById: (id) => {
        const url = `/api/package-types/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/package-types`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/package-types/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id) => {
        const url = `/api/package-types/${id}`
        return axiosClient.delete(url)
    },
}

export default packageTypeApi
