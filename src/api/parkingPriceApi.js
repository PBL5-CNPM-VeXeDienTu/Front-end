import axiosClient from './axiosClient'

const parkingPriceApi = {
    createNew: (credentials) => {
        const url = `/api/parking-prices`
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/parking-prices/${id}`
        return axiosClient.patch(url, credentials)
    },
    deleteById: (id, credentials) => {
        const url = `/api/parking-prices/${id}`
        return axiosClient.delete(url, credentials)
    },
}
export default parkingPriceApi
