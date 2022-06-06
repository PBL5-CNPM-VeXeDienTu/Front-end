import axiosClient from './axiosClient'

const feedbackApi = {
    getListByParams: (params) => {
        const url = `/api/feedbacks?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    getListByUserId: (id, params) => {
        const url = `api/feedbacks/get-by-user/${id}?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = '/api/feedbacks'
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/feedbacks/${id}`
        return axiosClient.patch(url, credentials)
    },
}

export default feedbackApi
