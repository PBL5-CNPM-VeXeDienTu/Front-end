import axiosClient from './axiosClient'

const packageApi = {
    getListByParams: (params) => {
        const url = `/api/packages?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getListByParkinglotId: (id, params) => {
        const url = `/api/packages/get-by-parking-lot/${id}?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getListByOwnerId: (id, params) => {
        const url = `/api/packages/get-by-owner/${id}?limit=${params.limit}&page=${params.page}`
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
