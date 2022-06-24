import axiosClient from './axiosClient'

const featureApi = {
    getAll: () => {
        const url = '/api/features'
        return axiosClient.get(url)
    },
    getFeatureById: (id) => {
        const url = `/api/features/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/features`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/features/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id) => {
        const url = `/api/features/${id}`
        return axiosClient.delete(url)
    },
}

export default featureApi
