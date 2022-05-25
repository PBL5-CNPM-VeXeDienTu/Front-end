import axiosClient from './axiosClient'

const feedbackApi = {
    create: (credentials) => {
        const url = '/api/feedbacks'
        return axiosClient.post(url, credentials)
    },
}

export default feedbackApi;
