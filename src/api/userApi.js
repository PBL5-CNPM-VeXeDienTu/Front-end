import axiosClient from './axiosClient'

const userApi = {
    getAll: (params) => {
        const url = '/users'
        return axiosClient.get(url, { params })
    },
    get: (id) => {
        const url = `/users/${id}`
        return axiosClient.get(url)
    },
    update: (id, credentials) => {
        const url = `/api/users/${id}`
        return axiosClient.patch(url, credentials)
    },
}

export default userApi
