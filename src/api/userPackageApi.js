import axiosClient from './axiosClient'

const userPackageApi = {
    getListByParams: (params) => {
        const url = '/api/user-packages'
        return axiosClient.get(url, { params })
    },
    getPackageByOwner: (id) => {
        const url = `/api/user-packages/get-by-owner/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/user-packages`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/user-packages/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/user-packages/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default userPackageApi
