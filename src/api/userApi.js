import axiosClient from './axiosClient'

const userApi = {
    getListByParams: (params) => {
        const url = `/api/users?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.get(url)
    },
    updateById: (id, credentials) => {
        const url = `/api/users/${id}`
        return axiosClient.patch(url, credentials)
    },
}

export default userApi
