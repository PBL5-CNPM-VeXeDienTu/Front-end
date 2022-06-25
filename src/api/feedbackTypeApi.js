import axiosClient from './axiosClient'

const feedbackTypeApi = {
    getAll: (params) => {
        let url = '/api/feedback-types?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
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
    deleteById: (id) => {
        const url = `/api/feedback-types/${id}`
        return axiosClient.delete(url)
    },
}

export default feedbackTypeApi
