import axiosClient from './axiosClient'

const feedbackTypeApi = {
    getAll: () => {
        const url = '/api/feedback-types'
        return axiosClient.get(url)
    },
    getFeedbackTypeById: (id) => {
        const url = `/api/feedback-types/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/feedback-types`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/feedback-types/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/feedback-types/${id}`
        return axiosClient.delete(url, credentials)
    },
}

export default feedbackTypeApi
