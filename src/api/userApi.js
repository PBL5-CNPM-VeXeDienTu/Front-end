import axiosClient from './axiosClient'

const userApi = {
    getListByParams: (params) => {
        const url = `/api/users?limit=${params.limit}&page=${params.page}&role=${params.role}`
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = 'api/users'
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/users/${id}`
        return axiosClient.patch(url, credentials)
    },
    softDeleteById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.delete(url)
    },
}

export default userApi
