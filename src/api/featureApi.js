import axiosClient from './axiosClient'

const featureApi = {
    getAll: (params) => {
        let url = '/api/features?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
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
