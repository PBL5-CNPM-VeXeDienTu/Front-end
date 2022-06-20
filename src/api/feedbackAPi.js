import axiosClient from './axiosClient'

const feedbackApi = {
    getListByParams: (params) => {
        let url = `/api/feedbacks?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListByUserId: (id, params) => {
        let url = `api/feedbacks/get-by-user/${id}?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
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
