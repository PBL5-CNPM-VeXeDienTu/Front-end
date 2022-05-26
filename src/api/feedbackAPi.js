import axiosClient from './axiosClient'

const feedbackApi = {
    getAll: (params) => {
        const url = `/api/feedbacks?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    create: (credentials) => {
        const url = '/api/feedbacks'
        return axiosClient.post(url, credentials)
    },
}

export default feedbackApi
