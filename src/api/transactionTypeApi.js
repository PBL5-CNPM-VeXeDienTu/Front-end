import axiosClient from './axiosClient'

const transactionTypeApi = {
    getAll: () => {
        const url = '/api/transaction-types'
        return axiosClient.get(url)
    },
    getTransationTypeById: (id) => {
        const url = `/api/transaction-types/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/transaction-types`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/transaction-types/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/transaction-types/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default transactionTypeApi
