import axiosClient from './axiosClient'

const packageApi = {
    getListByParams: (params) => {
        let url = '/api/packages?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListByParkinglotId: (id, params) => {
        let url = `/api/packages/get-by-parking-lot/${id}?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListByOwnerId: (id, params) => {
        let url = `/api/packages/get-by-owner/${id}?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `/api/packages/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/packages`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/packages/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/packages/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default packageApi
